export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/valuation' && request.method === 'POST') {
      const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
      if (!ANTHROPIC_API_KEY) {
        return new Response(JSON.stringify({ error: 'API key not configured.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      try {
        const body = await request.json();
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-beta': 'web-search-2025-03-05'
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    if (url.pathname === '/api/valuation' && request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    if (url.pathname === '/api/counter') {
      return new Response(JSON.stringify({ count: 0 }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
