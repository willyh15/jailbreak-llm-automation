import { runRemoteCommand } from '$lib/execRemote';

export const POST = async () => {
  try {
    const result = await runRemoteCommand('killall CommCenter');
    return new Response(JSON.stringify({ message: 'R-SIM trigger sent: ' + result }));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Trigger failed: ' + err }), { status: 500 });
  }
};
