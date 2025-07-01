import { runRemoteCommand } from '$lib/execRemote';

export const GET = async () => {
  try {
    const jbCheck = await runRemoteCommand('ls /var/jb || echo "No JB"');
    const ios = await runRemoteCommand('sw_vers || echo "Unknown"');
    const model = await runRemoteCommand('uname -m || echo "Unknown"');

    const mock = {
      'Jailbreak Status': jbCheck.includes('/var/jb') ? '✅ Present' : '❌ Missing',
      'iOS Version': ios,
      'Device Model': model,
      'Jailbreak Tool': 'Dopamine',
      'MGCopyAnswer Spoof': 'TODO: Check plist',
      'R-SIM Detected': 'TODO: check MKSD kernel extension'
    };

    return new Response(JSON.stringify(mock));
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Scan failed: ' + e }), { status: 500 });
  }
};
