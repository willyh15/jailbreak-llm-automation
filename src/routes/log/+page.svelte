// src/routes/api/log/+server.ts
export const GET = async () => {
  const raw = await runRemoteCommand('cat /var/jb/ghosttrigger/spoof.log || echo "No log found."');
  return new Response(raw, { headers: { 'Content-Type': 'text/plain' } });
};
