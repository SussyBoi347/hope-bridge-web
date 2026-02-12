import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { title, author_name, content, topic, media_urls, audio_url } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate AI metadata using InvokeLLM
    const aiMetadata = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Analyze this story and provide a summary and relevant tags.

Title: ${title}
Content: ${content}
Topic: ${topic}

Generate:
1. A concise 2-3 sentence summary
2. 3-5 relevant tags (single words or short phrases)`,
      response_json_schema: {
        type: "object",
        properties: {
          summary: { type: "string" },
          tags: { type: "array", items: { type: "string" } }
        }
      }
    });

    const story = await base44.asServiceRole.entities.Story.create({
      title,
      author_name,
      content,
      topic,
      media_urls: media_urls || [],
      audio_url: audio_url || null,
      summary: aiMetadata.summary || '',
      tags: aiMetadata.tags || [],
      status: 'pending'
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});