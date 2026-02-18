import { resources } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const { userProfile } = await req.json();

    if (!userProfile) {
      return Response.json({ error: 'User profile is required' }, { status: 400 });
    }

    const challenges = new Set(userProfile.challenges || []);

    const recommendations = resources
      .map((resource) => {
        const overlap = (resource.categories || []).filter((c) => challenges.has(c));
        const relevance_score = 60 + overlap.length * 15;
        return {
          ...resource,
          relevance_score,
          recommendation_reason: overlap.length
            ? 'Aligned with your stated challenges.'
            : 'General well-being resource to support your goals.',
          addresses_challenges: overlap
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 10);

    return Response.json({
      recommendations,
      strategy: 'Local recommendation strategy based on challenge/category overlap.',
      total_recommendations: recommendations.length
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
