let lastCommand = 'echo No Command';

export const GET = async ({ url }) => {
  const device = url.searchParams.get('device') || 'unknown';
  console.log(`[Daemon] Poll from ${device}`);
  return new Response(JSON.stringify({ cmd: lastCommand }));
};

export const POST = async ({ request }) => {
  const { device, output } = await request.json();
  console.log(`[Daemon] ${device} ➜ ${output}`);
  return new Response(JSON.stringify({ success: true }));
};

// Temporary: Use this to change the command manually
export const PUT = async ({ request }) => {
  const { cmd } = await request.json();
  lastCommand = cmd;
  return new Response(JSON.stringify({ success: true }));
};
