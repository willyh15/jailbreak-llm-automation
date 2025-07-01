<script lang="ts">
  let data = {
    jailbreak: 'Loading...',
    ios: 'Loading...',
    model: 'Loading...',
    spoof: {
      model: false,
      carrier: false,
      serial: false
    },
    rsim: 'Loading...'
  };

  async function loadDashboard() {
    try {
      const res = await fetch('/api/dashboard');
      data = await res.json();
    } catch (e) {
      data.rsim = 'Error loading data.';
    }
  }

  // Initial load
  loadDashboard();

  // 🔁 Poll every 5 seconds
  const interval = setInterval(loadDashboard, 5000);

  // Cleanup if user leaves page
  import { onDestroy } from 'svelte';
  onDestroy(() => clearInterval(interval));
</script>


<div class="min-h-screen bg-midnight text-white p-6">
  <h1 class="text-3xl font-bold mb-4">📊 GhostTrigger Dashboard</h1>
  <p class="text-sm text-gray-400 mb-6">Your device state and controls in one place.</p>

  <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    <div class="bg-black/60 border border-electric rounded-xl p-4">
      <h2 class="text-xl font-bold mb-2">📱 Device Info</h2>
      <ul class="text-sm space-y-1">
        <li><strong>Jailbreak:</strong> {data.jailbreak}</li>
        <li><strong>iOS Version:</strong> {data.ios}</li>
        <li><strong>Model:</strong> {data.model}</li>
      </ul>
    </div>

    <div class="bg-black/60 border border-electric rounded-xl p-4">
      <h2 class="text-xl font-bold mb-2">🛠 Spoof Status</h2>
      <ul class="text-sm space-y-1">
        <li>Model Spoof: {data.spoof.model ? '✅' : '❌'}</li>
        <li>Carrier Spoof: {data.spoof.carrier ? '✅' : '❌'}</li>
        <li>Serial Spoof: {data.spoof.serial ? '✅' : '❌'}</li>
      </ul>
    </div>

    <div class="bg-black/60 border border-electric rounded-xl p-4">
      <h2 class="text-xl font-bold mb-2">🔘 R-SIM Status</h2>
      <p class="text-sm">{data.rsim}</p>
    </div>

    <div class="bg-black/60 border border-electric rounded-xl p-4">
      <h2 class="text-xl font-bold mb-2">🚀 Quick Navigation</h2>
      <ul class="space-y-2 text-electric underline text-sm">
        <li><a href="/rsim">▶ Trigger R-SIM</a></li>
        <li><a href="/scanner">▶ Scan System</a></li>
        <li><a href="/agent">▶ GhostAgent Terminal</a></li>
        <li><a href="/spoof">▶ Spoof Toggles</a></li>
      </ul>
    </div>
  </div>
</div>
