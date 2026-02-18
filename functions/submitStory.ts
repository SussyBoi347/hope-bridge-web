import { createStory, inferTags, summarize } from './_localBackend.ts';
import { moderateStoryText } from './_contentModeration.ts';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { title, author_name, content, topic, media_urls, audio_url } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const moderation = await moderateStoryText(`${title}\n\n${content}`);
    if (!moderation.isClean) {
      return Response.json({
        error: 'Your story could not be posted because it contains inappropriate language.',
        moderation: { reason: moderation.reason, source: moderation.source }
      }, { status: 400 });
    }

    const story = createStory({
      title,
      author_name,
      content,
      topic,
      media_urls: media_urls || [],
      audio_url: audio_url || null,
      summary: summarize(content),
      tags: inferTags(content, topic),
      status: 'approved',
      comments_count: 0,
      likes: 0
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
