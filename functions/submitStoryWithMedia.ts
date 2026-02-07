import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const formData = await req.formData();

    const title = formData.get('title');
    const author_name = formData.get('author_name');
    const content = formData.get('content');
    const topic = formData.get('topic');
    const mediaFiles = formData.getAll('media');
    const audioFile = formData.get('audio');

    if (!title?.trim() || !author_name?.trim() || !content?.trim() || !topic) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const media_urls = [];

    // Upload media files
    if (mediaFiles && mediaFiles.length > 0) {
      for (const file of mediaFiles) {
        if (file instanceof File) {
          const uploadResponse = await base44.integrations.Core.UploadFile({
            file: file
          });
          media_urls.push(uploadResponse.file_url);
        }
      }
    }

    let audio_url = null;

    // Upload audio file
    if (audioFile instanceof File) {
      const uploadResponse = await base44.integrations.Core.UploadFile({
        file: audioFile
      });
      audio_url = uploadResponse.file_url;
    }

    const storyData = {
      title: title.trim(),
      author_name: author_name.trim(),
      content: content.trim(),
      topic: topic,
      status: 'pending'
    };

    if (media_urls.length > 0) {
      storyData.media_urls = media_urls;
    }

    if (audio_url) {
      storyData.audio_url = audio_url;
    }

    const story = await base44.asServiceRole.entities.Story.create(storyData);

    return Response.json({ success: true, story });
  } catch (error) {
    console.error('Error submitting story with media:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});