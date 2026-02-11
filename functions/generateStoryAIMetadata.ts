import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    
    const { story_id, title, content } = payload;
    
    if (!story_id || !content) {
      return Response.json({ error: 'Story ID and content are required' }, { status: 400 });
    }

    // Use AI to generate summary and tags
    const aiResponse = await base44.integrations.Core.InvokeLLM({
      prompt: `You are analyzing a story shared by an Asian teen about their personal experiences. Based on the story content, generate:

1. A brief, empathetic summary (2-3 sentences) that captures the essence of the story
2. 3-5 relevant tags that describe the themes, emotions, and topics (use lowercase, underscore format like "family_expectations", "cultural_identity", "mental_health", "school_pressure", "belonging", "identity_crisis", etc.)

Story Title: ${title}
Story Content: ${content}

Return the data as JSON.`,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          tags: { 
            type: 'array', 
            items: { type: 'string' } 
          }
        }
      }
    });

    // Update the story with AI-generated metadata
    await base44.asServiceRole.entities.Story.update(story_id, {
      summary: aiResponse.summary,
      tags: aiResponse.tags
    });

    return Response.json({ 
      success: true, 
      summary: aiResponse.summary,
      tags: aiResponse.tags
    });
  } catch (error) {
    console.error('Error generating AI metadata:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});