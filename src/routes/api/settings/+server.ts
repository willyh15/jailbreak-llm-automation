import type { RequestHandler } from '@sveltejs/kit';
import { setSSHConfig } from '$lib/session';

export const POST: RequestHandler = async ({ request }) => {
  const { host, user, pass } = await request.json();
  if (!host || !user || !pass) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  setSSHConfig({ host, user, pass });
  return new Response(JSON.stringify({ success: true }));
};
