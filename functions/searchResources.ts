import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { query, filters } = await req.json();

    if (!query || query.trim().length === 0) {
      return Response.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Fetch all resources
    const allResources = await base44.asServiceRole.entities.Resource.list();

    // Use AI to understand the natural language query and match resources
    const searchPrompt = `
You are a mental health resource search expert for Asian teens.

User's search query: "${query}"

${filters?.categories?.length ? `Filter by categories: ${filters.categories.join(', ')}` : ''}
${filters?.type ? `Filter by type: ${filters.type}` : ''}

Available resources:
${allResources.map((r, i) => `
${i + 1}. ${r.title} (${r.type})
   - Categories: ${r.categories.join(', ')}
   - Tags: ${r.tags?.join(', ') || 'None'}
   - Description: ${r.description}
   - Content preview: ${r.content?.substring(0, 200) || 'N/A'}...
`).join('\n')}

Based on the user's natural language query, identify the MOST RELEVANT resources (up to 10). Consider:
1. Direct keyword matches
2. Semantic similarity to the query intent
3. Related topics and themes
4. Practical applicability to the user's needs

For each match, provide a relevance score (0-100) and a brief explanation of why it matches.
`;

    const aiResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: searchPrompt,
      response_json_schema: {
        type: "object",
        properties: {
          matches: {
            type: "array",
            items: {
              type: "object",
              properties: {
                resource_id: { type: "string" },
                relevance_score: { type: "number" },
                match_reason: { type: "string" }
              }
            }
          },
          search_interpretation: {
            type: "string",
            description: "How you interpreted the user's search query"
          }
        }
      }
    });

    // Map IDs to full resource objects with match info
    const results = aiResponse.matches
      .map(match => {
        const resource = allResources.find(r => r.id === match.resource_id);
        return resource ? {
          ...resource,
          relevance_score: match.relevance_score,
          match_reason: match.match_reason
        } : null;
      })
      .filter(r => r !== null)
      .sort((a, b) => b.relevance_score - a.relevance_score);

    return Response.json({
      results,
      search_interpretation: aiResponse.search_interpretation,
      total_results: results.length
    });

  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});