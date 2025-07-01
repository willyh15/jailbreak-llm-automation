import { readRemoteJSON } from '$lib/execRemote';

export const GET = async () => {
  const spoof = await readRemoteJSON('/var/jb/ghosttrigger/spoof.json');
  const mock = {
    jailbreak: '/var/jb exists',
    ios: '15.4.1',
    model: 'iPhone13,3',
    spoof: {
      model: !!spoof.model,
      carrier: !!spoof.carrier,
      serial: !!spoof.serial
    },
    rsim: 'Last trigger sent successfully (mock)'
  };

  return new Response(JSON.stringify(mock));
};
