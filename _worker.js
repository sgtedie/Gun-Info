export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/valuation') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }
      if (request.method === 'POST') {
        const KEY = env.ANTHROPIC_API_KEY;
        if (!KEY) {
          return new Response(JSON.stringify({error:'API key not configured.'}), {
            status: 500,
            headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
          });
        }
        try {
          const body = await request.json();
          const r = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': KEY,
              'anthropic-version': '2023-06-01',
              'anthropic-beta': 'web-search-2025-03-05'
            },
            body: JSON.stringify(body)
          });
          const data = await r.json();
          return new Response(JSON.stringify(data), {
            status: r.status,
            headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
          });
        } catch(err) {
          return new Response(JSON.stringify({error:err.message}), {
            status: 500,
            headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
          });
        }
      }
    }
    if (url.pathname === '/api/counter') {
      return new Response(JSON.stringify({count:0}), {
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
      });
    }
    return env.ASSETS.fetch(request);
  }
};
