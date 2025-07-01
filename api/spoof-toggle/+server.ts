import {
  readRemoteJSON,
  writeRemoteJSON,
  patchMGCopyAnswer,
  clearMGCopyAnswerPatch
} from '$lib/execRemote';

const SPOOF_JSON_PATH = '/var/jb/ghosttrigger/spoof.json';

const SPOOF_KEYS: Record<string, string> = {
  model: 'hw-model',
  carrier: 'CarrierName',
  serial: 'SerialNumber'
};

export const POST = async ({ request }) => {
  const { key, value } = await request.json();

  try {
    const current = await readRemoteJSON(SPOOF_JSON_PATH);
    current[key] = value;
    await writeRemoteJSON(SPOOF_JSON_PATH, current);

    const spoofKey = SPOOF_KEYS[key];
    if (value) {
      await patchMGCopyAnswer(spoofKey, `Spoofed${key.toUpperCase()}`);
      await appendToSpoofLog(`✅ Spoof ENABLED: ${spoofKey} -> "Spoofed${key.toUpperCase()}"`);
    } else {
      await clearMGCopyAnswerPatch(spoofKey);
      await appendToSpoofLog(`❌ Spoof DISABLED: ${spoofKey} removed`);
    }


    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Patch failed: ' + err }), { status: 500 });
  }
};
