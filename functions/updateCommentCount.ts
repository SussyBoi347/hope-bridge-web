import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { storyId, increment } = await req.json();

    if (!storyId || increment === undefined) {
      return Response.json({ error: 'Missing storyId or increment' }, { status: 400 });
    }

    const story = await base44.asServiceRole.entities.Story.get(storyId);
    const newCount = Math.max(0, (story.comments_count || 0) + increment);

    await base44.asServiceRole.entities.Story.update(storyId, {
      comments_count: newCount
    });

    return Response.json({ success: true, newCount });
  } catch (error) {
    console.error('Error updating comment count:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});