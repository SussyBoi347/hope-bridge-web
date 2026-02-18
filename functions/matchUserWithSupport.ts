import { mentors, supportGroups } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const { userProfile } = await req.json();

    if (!userProfile) {
      return Response.json({ error: 'User profile is required' }, { status: 400 });
    }

    const challenges = new Set(userProfile.challenges || []);

    const matchedMentors = mentors
      .filter((m) => m.status === 'active')
      .map((m) => {
        const overlap = (m.expertise || []).filter((e) => challenges.has(e)).length;
        return {
          ...m,
          match_score: 65 + overlap * 10,
          match_reason: overlap ? 'Strong overlap with your challenge areas.' : 'General supportive mentor fit.'
        };
      })
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 3);

    const matchedGroups = supportGroups
      .filter((g) => g.status === 'open')
      .map((g) => {
        const overlap = (g.focus_areas || []).filter((f) => challenges.has(f)).length;
        return {
          ...g,
          match_score: 65 + overlap * 10,
          match_reason: overlap ? 'Group focus areas align with your needs.' : 'Broad peer support option.'
        };
      })
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 3);

    return Response.json({ mentors: matchedMentors, supportGroups: matchedGroups });
  } catch (error) {
    console.error('Matching error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
