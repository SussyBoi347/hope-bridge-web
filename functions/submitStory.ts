import { inferTags, summarize } from './_localBackend.ts';

type Base44StoryEntity = {
  create: (payload: Record<string, unknown>) => Promise<Record<string, unknown>>;
};

const getStoryEntity = (): Base44StoryEntity | null => {
  const base44 = (globalThis as { base44?: { entities?: { Story?: Base44StoryEntity } } }).base44;
  return base44?.entities?.Story ?? null;
};

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { title, author_name, content, topic, media_urls, audio_url } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const storyEntity = getStoryEntity();
    if (!storyEntity) {
      return Response.json({ error: 'Story persistence backend is unavailable' }, { status: 500 });
    }

    const story = await storyEntity.create({
      title,
      author_name,
      content,
      topic,
      media_urls: media_urls || [],
      audio_url: audio_url || null,
      summary: summarize(content),
      tags: inferTags(content, topic),
      status: 'pending',
      comments_count: 0,
      likes: 0
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
