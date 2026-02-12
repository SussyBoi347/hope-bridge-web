import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { title, author_name, content, topic, media_urls, audio_url } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate AI metadata
    const aiResponse = await base44.asServiceRole.functions.invoke('generateStoryAIMetadata', {
      title,
      content,
      topic
    });

    const story = await base44.asServiceRole.entities.Story.create({
      title,
      author_name,
      content,
      topic,
      media_urls: media_urls || [],
      audio_url: audio_url || null,
      summary: aiResponse.data.summary || '',
      tags: aiResponse.data.tags || [],
      status: 'pending'
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});