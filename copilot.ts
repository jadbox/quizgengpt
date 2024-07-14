import openai from "openai";
import fs from "fs";

// load objectives.txt text file as string
const objectives = fs.readFileSync("objectives.txt", "utf-8");

export function getPrompt(objective: string) {
  return objectives.replace("[[INSERT]]", objective);
}

const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY, // process.env["GROQ_API_KEY"], // process.env.OPENAI_API_KEY,
};

export const openaiClient = new openai.OpenAI(openaiConfig);

export async function getObjPrompt(objective: string) {
  return await getCompletion(getPrompt(objective));
}

// get the completion from the OpenAI API
export async function getCompletion(prompt: string) {
  return (
    await openaiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professor preparing questions for medical students and wish to teach students as best as possible through quizzing.",
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
    model: "gpt-4o",
    temperature: 0.4,
  });
}

// const FUNCTIONS = [];
