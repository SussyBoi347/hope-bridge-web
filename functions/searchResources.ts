import { resources } from './_localBackend.ts';

Deno.serve(async (req) => {
  try {
    const { query, filters } = await req.json();

    if (!query || query.trim().length === 0) {
      return Response.json({ error: 'Search query is required' }, { status: 400 });
    }

    const q = query.toLowerCase();

    const results = resources
      .filter((r) => !filters?.type || r.type === filters.type)
      .filter((r) => !filters?.categories?.length || filters.categories.some((c) => (r.categories || []).includes(c)))
      .map((resource) => {
        const haystack = [resource.title, resource.description, ...(resource.tags || []), ...(resource.categories || [])]
          .join(' ')
          .toLowerCase();
        const relevance_score = haystack.includes(q) ? 90 : 55;
        return {
          ...resource,
          relevance_score,
          match_reason: haystack.includes(q) ? 'Matched your query terms and themes.' : 'Related support topic match.'
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 10);

    return Response.json({
      results,
      search_interpretation: `Local keyword search for: ${query}`,
      total_results: results.length
    });
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
