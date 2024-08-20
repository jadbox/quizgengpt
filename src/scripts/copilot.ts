import Anthropic from "@anthropic-ai/sdk";

export async function prompt(query: string) {
  console.log("prompt");
  const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [{ role: "user", content: query }],
  });

  const content = msg.content[0];
  if (!content.hasOwnProperty("text")) return null;
  const resp = msg.content[0].text;
  console.log(resp);

  return resp;
}