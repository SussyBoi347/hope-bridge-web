import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { title, author_name, content, topic } = body;

    if (!title || !author_name || !content || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const story = await base44.asServiceRole.entities.Story.create({
      title,
      author_name,
      content,
      topic,
      status: 'pending'
    });

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});