export async function onRequestGet() {
  return new Response(JSON.stringify({ count: 0 }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestPost() {
  return new Response(JSON.stringify({ count: 0 }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
