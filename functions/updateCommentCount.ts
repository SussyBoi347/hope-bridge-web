type StoryRecord = {
  id: string;
  comments_count?: number;
};

type Base44StoryEntity = {
  filter: (query: Record<string, unknown>) => Promise<StoryRecord[]>;
  update: (id: string, payload: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

const getStoryEntity = (): Base44StoryEntity | null => {
  const base44 = (globalThis as { base44?: { entities?: { Story?: Base44StoryEntity } } }).base44;
  return base44?.entities?.Story ?? null;
};

Deno.serve(async (req) => {
  try {
    const { storyId, increment } = await req.json();

    if (!storyId || increment === undefined) {
      return Response.json({ error: 'Missing storyId or increment' }, { status: 400 });
    }

    if (typeof increment !== 'number' || !Number.isFinite(increment)) {
      return Response.json({ error: 'Increment must be a finite number' }, { status: 400 });
    }

    const storyEntity = getStoryEntity();
    if (!storyEntity) {
      return Response.json({ error: 'Story persistence backend is unavailable' }, { status: 500 });
    }

    const stories = await storyEntity.filter({ id: storyId });
    const story = stories?.[0];

    if (!story) {
      return Response.json({ error: 'Story not found' }, { status: 404 });
    }

    const newCount = Math.max(0, (story.comments_count || 0) + increment);
    await storyEntity.update(story.id, { comments_count: newCount });

    return Response.json({ success: true, newCount });
  } catch (error) {
    console.error('Error updating comment count:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
