<script lang="ts">
  let triggering = false;
  let status = '';

  async function triggerRSIMMenu() {
    triggering = true;
    status = 'Sending trigger...';

    try {
      const res = await fetch('/api/rsim-trigger', { method: 'POST' });
      const data = await res.json();
      status = data.message || 'Done';
    } catch (e) {
      status = 'Failed to send trigger.';
    }

    triggering = false;
  }
</script>

<div class="min-h-screen bg-midnight text-white flex flex-col items-center justify-center px-4">
  <h1 class="text-3xl font-bold mb-4">R-SIM Trigger</h1>
  <p class="text-sm mb-8 text-gray-400 text-center max-w-md">
    Tap the button below to attempt to trigger the R-SIM/MKSD ICCID popup on your jailbroken device.
  </p>

  <button
    on:click={triggerRSIMMenu}
    class="bg-electric text-black font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
    disabled={triggering}
  >
    {triggering ? 'Triggering...' : 'Trigger R-SIM Menu'}
  </button>

  {#if status}
    <p class="mt-6 text-sm text-pinknoise">{status}</p>
  {/if}
</div>
