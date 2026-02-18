import { createStory, inferTags, summarize } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { title, author_name, content, topic, media_urls, audio_url } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
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
