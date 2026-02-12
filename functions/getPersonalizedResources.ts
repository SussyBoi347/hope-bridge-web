import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { userProfile } = await req.json();

    if (!userProfile) {
      return Response.json({ error: 'User profile is required' }, { status: 400 });
    }

    // Fetch all resources
    const allResources = await base44.asServiceRole.entities.Resource.list();

    if (allResources.length === 0) {
      return Response.json({ 
        recommendations: [],
        message: 'No resources available yet'
      });
    }

    // Use AI to generate personalized recommendations
    const recommendationPrompt = `
You are a mental health resource curator for Asian teens.

User Profile:
- Name: ${userProfile.name}
- Age: ${userProfile.age}
- Challenges: ${userProfile.challenges?.join(', ') || 'Not specified'}
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Preferences: ${userProfile.preferences || 'Not specified'}

Available Resources:
${allResources.map((r, i) => `
${i + 1}. ${r.title} (${r.type})
   - Categories: ${r.categories.join(', ')}
   - Tags: ${r.tags?.join(', ') || 'None'}
   - Difficulty: ${r.difficulty_level}
   - Reading time: ${r.reading_time || 'N/A'} minutes
   - Description: ${r.description}
`).join('\n')}

Based on the user's profile, recommend the TOP 8-10 most relevant resources. Consider:
1. Direct alignment with their stated challenges
2. Age-appropriateness and difficulty level
3. Practical applicability to their situation
4. Variety in resource types (mix of articles, guides, tools)
5. Progressive learning path (start with basics, build complexity)

For each recommendation, provide:
- A relevance score (0-100)
- Why this resource is specifically helpful for this user
- Which of their challenges it addresses
`;

    const aiResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: recommendationPrompt,
      response_json_schema: {
        type: "object",
        properties: {
          recommendations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                resource_id: { type: "string" },
                relevance_score: { type: "number" },
                recommendation_reason: { type: "string" },
                addresses_challenges: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            }
          },
          overall_strategy: {
            type: "string",
            description: "Brief explanation of the recommendation strategy for this user"
          }
        }
      }
    });

    // Map IDs to full resource objects with recommendation info
    const recommendations = aiResponse.recommendations
      .map(rec => {
        const resource = allResources.find(r => r.id === rec.resource_id);
        return resource ? {
          ...resource,
          relevance_score: rec.relevance_score,
          recommendation_reason: rec.recommendation_reason,
          addresses_challenges: rec.addresses_challenges
        } : null;
      })
      .filter(r => r !== null)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    return Response.json({
      recommendations,
      strategy: aiResponse.overall_strategy,
      total_recommendations: recommendations.length
    });

  } catch (error) {
    console.error('Recommendation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});