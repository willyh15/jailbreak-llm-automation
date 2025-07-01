import { readRemoteJSON, writeRemoteJSON } from '$lib/execRemote';

const SPOOF_PATH = '/var/jb/ghosttrigger/spoof.json';

export const POST = async ({ request }) => {
  const { key, value } = await request.json();

  try {
    const current = await readRemoteJSON(SPOOF_PATH);
    current[key] = value;
    await writeRemoteJSON(SPOOF_PATH, current);
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Write failed: ' + err }), { status: 500 });
  }
};
