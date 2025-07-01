import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const mockData = {
    'Jailbreak Status': '/var/jb exists',
    'iOS Version': '15.4.1',
    'Device Model': 'iPhone13,3',
    'Jailbreak Tool': 'Dopamine',
    'MGCopyAnswer Spoof': 'Enabled (mock)',
    'R-SIM Detected': 'Yes (mock)'
  };

  return new Response(JSON.stringify(mockData), {
    headers: { 'Content-Type': 'application/json' }
  });
};
