import openai from "openai";
import fs from "fs";

const MODEL = process.env.MODEL || "gpt-4o";

// load objectives.txt text file as string
// const objectives = fs.readFileSync("objectives.txt", "utf-8");

// export function getPrompt(objective: string) {
//   return objectives.replace("[[INSERT]]", objective);
// }

export const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "ollama", // process.env["GROQ_API_KEY"], // process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_HOST || undefined,
});

// export async function getObjPrompt(objective: string) {
//   return await getCompletion(getPrompt(objective));
// }

// get the completion from the OpenAI API
export async function getCompletion(prompt: string, system: string = "") {
  return (
    await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            system ||
            "You are a professional self-help trainer and wellness coach. You are helping a client with their personal development goals.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })
  ).choices[0].message.content;
}

function runTools(query: string, functions: any) {
  return openaiClient.beta.chat.completions.runTools({
    tool_choice: "auto",
    tools: functions,
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    parallel_tool_calls: true,
    model: MODEL,
    temperature: 0.4,
  });
}

// const FUNCTIONS = [];
