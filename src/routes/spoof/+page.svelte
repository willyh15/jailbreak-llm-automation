<script lang="ts">
  let spoofState = {
    model: false,
    carrier: false,
    serial: false
  };

  async function toggleSpoof(key: keyof typeof spoofState) {
    spoofState[key] = !spoofState[key];

    await fetch('/api/spoof-toggle', {
      method: 'POST',
      body: JSON.stringify({ key, value: spoofState[key] }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
</script>

<div class="min-h-screen bg-midnight text-white flex flex-col items-center justify-center px-4">
  <h1 class="text-3xl font-bold mb-6">🛠 Spoof Toggle Panel</h1>
  <p class="text-sm text-gray-400 mb-8 text-center max-w-md">
    Toggle system-level spoof overrides. Changes reflect in System Scanner and Dashboard.
  </p>

  <div class="grid gap-6 w-full max-w-sm">
    {#each Object.entries(spoofState) as [key, value]}
      <div class="flex items-center justify-between bg-black/50 border border-electric p-4 rounded-xl">
        <span class="capitalize">{key}</span>
        <button
          on:click={() => toggleSpoof(key)}
          class={`px-4 py-2 rounded-lg font-bold transition ${
            value ? 'bg-electric text-black' : 'bg-gray-700 text-white'
          }`}
        >
          {value ? 'ON' : 'OFF'}
        </button>
      </div>
    {/each}
  </div>
</div>
