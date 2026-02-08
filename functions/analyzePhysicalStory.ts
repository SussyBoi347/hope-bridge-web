import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Parse FormData
    let formData;
    try {
      formData = await req.formData();
    } catch (e) {
      console.error('FormData parsing error:', e);
      return Response.json({ error: 'Invalid form data' }, { status: 400 });
    }
    
    const imageFile = formData.get('image');

    if (!imageFile) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Upload image to get URL
    const buffer = await imageFile.arrayBuffer();
    const uploadResponse = await base44.integrations.Core.UploadFile({
      file: new File([buffer], imageFile.name, { type: imageFile.type })
    });

    const imageUrl = uploadResponse.file_url;

    // Use AI to analyze the image
    const aiResponse = await base44.integrations.Core.InvokeLLM({
      prompt: `You are analyzing a photo of a handwritten or printed story shared as part of a community storytelling project. Extract the following information from the image:
1. Story Title
2. Author Name (if visible, otherwise write "Anonymous")
3. Story Content (the main text)
4. Topic (categorize as one of: cultural_identity, academic_stress, family_pressures)
5. QR Code Detected (true if there's a QR code visible, false otherwise)
6. QR Code URL (if QR code is detected, try to read what URL it might link to)

If the image doesn't contain readable story content, return an error.

Return the data as JSON.`,
      file_urls: [imageUrl],
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          author_name: { type: 'string' },
          content: { type: 'string' },
          topic: { type: 'string', enum: ['cultural_identity', 'academic_stress', 'family_pressures'] },
          qr_code_detected: { type: 'boolean' },
          qr_code_url: { type: 'string' },
          success: { type: 'boolean' }
        }
      }
    });

    if (!aiResponse.success || !aiResponse.title || !aiResponse.content) {
      return Response.json({ 
        error: 'Could not detect story content in image. Please ensure the image contains clear, readable text.' 
      }, { status: 400 });
    }

    // Create story with approved status and attached image
    const storyData = {
      title: aiResponse.title,
      author_name: aiResponse.author_name || 'Anonymous',
      content: aiResponse.content,
      topic: aiResponse.topic,
      status: 'approved',
      media_urls: [imageUrl]
    };

    const story = await base44.asServiceRole.entities.Story.create(storyData);

    return Response.json({ 
      success: true, 
      message: 'Physical story added successfully!',
      story: story,
      qr_detected: aiResponse.qr_code_detected,
      qr_url: aiResponse.qr_code_url
    });
  } catch (error) {
    console.error('Error analyzing physical story:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});