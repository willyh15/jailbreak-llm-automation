import type { RequestHandler } from '@sveltejs/kit';
import { runRemoteCommand } from '$lib/execRemote';

export const GET: RequestHandler = async ({ url }) => {
  const path = url.searchParams.get('path');
  if (!path) return new Response('No path given', { status: 400 });

  try {
    const base64 = await runRemoteCommand(`base64 < ${path}`);
    const binary = Buffer.from(base64, 'base64');
    return new Response(binary, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${path.split('/').pop()}`
      }
    });
  } catch (err) {
    return new Response('Failed to fetch zip: ' + err, { status: 500 });
  }
};
