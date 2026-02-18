import { createStory, inferTags, summarize } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const payload = await req.json().catch(() => ({}));
    const imageUrl = payload.image_url;

    if (!imageUrl) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    const content = 'Story submitted via uploaded photo. In non-Base44 mode this endpoint stores a placeholder extraction.';
    const topic = 'cultural_identity';

    const story = createStory({
      title: 'Photo Story Submission',
      author_name: 'Anonymous',
      content,
      topic,
      status: 'approved',
      media_urls: [imageUrl],
      summary: summarize(content),
      tags: inferTags(content, topic),
      comments_count: 0,
      likes: 0
    });

    return Response.json({
      success: true,
      message: 'Physical story added successfully!',
      story,
      qr_detected: false,
      qr_url: null
    });
  } catch (error) {
    console.error('Error analyzing physical story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
