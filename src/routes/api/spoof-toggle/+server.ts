import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { key, value } = await request.json();

  console.log(`Spoofing ${key} set to ${value}`);
  // TODO: Write value to local jailbreak path or .plist file

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
