import Anthropic from "@anthropic-ai/sdk";
import { OpenAI } from "openai";

export async function promptClaude(query: string) {
  console.log("prompt");
  const anthropic = new Anthropic({
    defaultHeaders: {
      "anthropic-beta": "prompt-caching-2024-07-31",
      "content-type": "application/json",
    },
    apiKey: process.env.CLAUDE_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [
      { role: "user", content: query },
      {
        role: "assistant",
        content:
          "You are a modern internet directory 2.0. Use elegant, modern, and concise formatting appropriate to the request.",
      },
    ],
  });

  const content = msg.content[0];
  // console.log("content", content);
  if (!content.hasOwnProperty("text")) return null;
  const resp = (content as any).text;
  // console.log(resp);

  return resp as string;
}

export async function promptOpenAI(query: string) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const resp = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a modern internet directory 2.0. Use elegant, modern, and concise formatting appropriate to the request.",
      },
      {
        role: "user",
        content: query,
      },
    ],
  });

  console.log("resp", resp.choices[0].message);
  let r = resp.choices[0].message.content as string;
  r = r.replace("```json", "").replace("```", "");

  return r;
}

export async function prompt(query: string) {
  return await promptOpenAI(query);
}
