import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const mock = {
    jailbreak: '/var/jb exists',
    ios: '15.4.1',
    model: 'iPhone13,3',
    spoof: {
      model: true,
      carrier: false,
      serial: true
    },
    rsim: 'Last trigger sent successfully (mock)'
  };

  return new Response(JSON.stringify(mock), {
    headers: { 'Content-Type': 'application/json' }
  });
};
