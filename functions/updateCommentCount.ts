import { updateStory } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const { storyId, increment } = await req.json();

    if (!storyId || increment === undefined) {
      return Response.json({ error: 'Missing storyId or increment' }, { status: 400 });
    }

    const current = updateStory(storyId, {});
    if (!current) {
      return Response.json({ success: true, newCount: 0, note: 'Story not found in local function store' });
    }

    const newCount = Math.max(0, (current.comments_count || 0) + increment);
    updateStory(storyId, { comments_count: newCount });

    return Response.json({ success: true, newCount });
  } catch (error) {
    console.error('Error updating comment count:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
