<script lang="ts">
  let host = '';
  let user = 'root';
  let pass = '';

  async function submitSettings() {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host, user, pass })
    });

    alert('SSH settings saved for session.');
  }
</script>

<div class="min-h-screen bg-midnight text-white p-6 flex flex-col items-center justify-center">
  <h1 class="text-2xl font-bold mb-6">🔧 SSH Settings</h1>

  <div class="space-y-4 w-full max-w-md">
    <input bind:value={host} placeholder="Host (e.g. 192.168.1.137)"
      class="w-full p-2 rounded bg-black text-white border border-electric" />
    <input bind:value={user} placeholder="User (e.g. root)"
      class="w-full p-2 rounded bg-black text-white border border-electric" />
    <input bind:value={pass} placeholder="Password (e.g. alpine)" type="password"
      class="w-full p-2 rounded bg-black text-white border border-electric" />

    <button
      class="bg-electric text-black font-bold px-4 py-2 rounded hover:scale-105 transition"
      on:click={submitSettings}
    >
      Save SSH Config
    </button>
  </div>
</div>
