import { buildSnapshot } from '$lib/execRemote';

export const GET = async () => {
  try {
    const path = await buildSnapshot();
    return new Response(JSON.stringify({ path }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Snapshot failed: ' + err }), { status: 500 });
  }
};
