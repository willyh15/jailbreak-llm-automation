<script lang="ts">
  let input = '';
  let history: { user: string; ai: string }[] = [];
  let loading = false;

  async function sendPrompt() {
    if (!input.trim()) return;
    loading = true;
    const user = input;
    input = '';

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify({ prompt: user }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      history = [...history, { user, ai: data.reply || 'No response' }];
    } catch (e) {
      history = [...history, { user, ai: 'Error getting response.' }];
    }

    loading = false;
  }
</script>

<div class="min-h-screen bg-midnight text-electric font-mono p-6">
  <h1 class="text-2xl mb-4">🧠 Ghost Agent Terminal</h1>

  <div class="bg-black text-white p-4 rounded-lg shadow-inner max-w-3xl mx-auto space-y-4 h-[60vh] overflow-y-auto border border-electric">
    {#each history as line}
      <div>
        <span class="text-pinknoise">$ {line.user}</span>
        <pre class="text-white whitespace-pre-wrap mt-1 ml-4">{line.ai}</pre>
      </div>
    {/each}
    {#if loading}
      <p class="text-gray-500 animate-pulse">GhostAgent is thinking...</p>
    {/if}
  </div>

  <form on:submit|preventDefault={sendPrompt} class="mt-4 max-w-3xl mx-auto flex gap-2">
    <input
      class="flex-1 bg-black text-white px-4 py-2 border border-electric rounded-lg"
      bind:value={input}
      placeholder="Ask a jailbreak question, LLM command, or spoof trick..."
    />
    <button type="submit" class="bg-electric text-black font-bold px-4 py-2 rounded-lg hover:scale-105 transition">
      Send
    </button>
  </form>
</div>
