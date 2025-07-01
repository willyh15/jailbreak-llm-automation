import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  // Simulate LLM response
  const fakeReply = `LLM: Here's a mock response to "${prompt}"`;

  return new Response(JSON.stringify({ reply: fakeReply }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
