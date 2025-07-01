<script lang="ts">
  let scanning = false;
  let systemInfo: Record<string, string> = {};
  let error = '';

  async function runScan() {
    scanning = true;
    error = '';
    systemInfo = {};

    try {
      const res = await fetch('/api/scan');
      const data = await res.json();
      if (data.error) {
        error = data.error;
      } else {
        systemInfo = data;
      }
    } catch (e) {
      error = 'Failed to scan system.';
    }

    scanning = false;
  }

  runScan(); // auto-scan on load
</script>

<div class="min-h-screen bg-midnight text-white p-6 flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-4">System Scanner</h1>
  <p class="text-sm text-gray-400 mb-8 text-center max-w-md">
    This scans your device’s system state including jailbreak status and spoof files.
  </p>

  {#if scanning}
    <p class="text-electric">Scanning system...</p>
  {:else if error}
    <p class="text-pinknoise">{error}</p>
  {:else}
    <div class="w-full max-w-lg text-left text-sm space-y-2">
      {#each Object.entries(systemInfo) as [key, value]}
        <div class="flex justify-between border-b border-gray-700 py-1">
          <span class="text-gray-400">{key}</span>
          <span class="text-white font-mono">{value}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
