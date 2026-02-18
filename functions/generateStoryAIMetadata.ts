import { inferTags, summarize } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const { story_id, title, content } = payload;

    if (!story_id || !content) {
      return Response.json({ error: 'Story ID and content are required' }, { status: 400 });
    }

    return Response.json({
      success: true,
      summary: summarize(`${title ? `${title}. ` : ''}${content}`),
      tags: inferTags(content)
    });
  } catch (error) {
    console.error('Error generating AI metadata:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
