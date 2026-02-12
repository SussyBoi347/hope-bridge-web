import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { userProfile } = await req.json();

    if (!userProfile) {
      return Response.json({ error: 'User profile is required' }, { status: 400 });
    }

    // Fetch all active mentors and open support groups
    const [mentors, supportGroups] = await Promise.all([
      base44.asServiceRole.entities.Mentor.filter({ status: 'active' }),
      base44.asServiceRole.entities.SupportGroup.filter({ status: 'open' })
    ]);

    // Use AI to analyze and match
    const matchingPrompt = `
You are a peer support matching expert for Asian teens dealing with mental health challenges.

User Profile:
- Age: ${userProfile.age}
- Challenges: ${userProfile.challenges.join(', ')}
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Preferences: ${userProfile.preferences || 'Not specified'}
- Availability: ${userProfile.availability || 'Not specified'}

Available Mentors:
${mentors.map((m, i) => `
${i + 1}. ${m.name} (Age ${m.age})
   - Expertise: ${m.expertise.join(', ')}
   - Interests: ${m.interests?.join(', ') || 'Not specified'}
   - Availability: ${m.availability || 'Not specified'}
   - Bio: ${m.bio}
`).join('\n')}

Available Support Groups:
${supportGroups.map((g, i) => `
${i + 1}. ${g.name}
   - Focus: ${g.focus_areas.join(', ')}
   - Age Range: ${g.age_range || 'All ages'}
   - Meeting: ${g.meeting_schedule} (${g.meeting_format})
   - Members: ${g.current_members}/${g.max_members || '∞'}
   - Description: ${g.description}
`).join('\n')}

Based on the user's profile, select the TOP 3 most compatible mentors and TOP 3 most compatible support groups. Consider:
1. Age compatibility
2. Matching challenges/expertise
3. Shared interests
4. Availability alignment
5. Cultural understanding

For each recommendation, provide a brief explanation of why it's a good match.
`;

    const aiResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: matchingPrompt,
      response_json_schema: {
        type: "object",
        properties: {
          recommended_mentors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mentor_id: { type: "string" },
                match_score: { type: "number" },
                reason: { type: "string" }
              }
            }
          },
          recommended_groups: {
            type: "array",
            items: {
              type: "object",
              properties: {
                group_id: { type: "string" },
                match_score: { type: "number" },
                reason: { type: "string" }
              }
            }
          }
        }
      }
    });

    // Map IDs to full objects
    const recommendedMentors = aiResponse.recommended_mentors.map(rec => ({
      ...mentors.find(m => m.id === rec.mentor_id),
      match_score: rec.match_score,
      match_reason: rec.reason
    })).filter(m => m.id);

    const recommendedGroups = aiResponse.recommended_groups.map(rec => ({
      ...supportGroups.find(g => g.id === rec.group_id),
      match_score: rec.match_score,
      match_reason: rec.reason
    })).filter(g => g.id);

    return Response.json({
      mentors: recommendedMentors,
      supportGroups: recommendedGroups
    });

  } catch (error) {
    console.error('Matching error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});