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

const FUNCTIONS = [];

//   const r = await openaiClient.beta.chat.completions.runTools({
//     tool_choice: "auto", // "auto",
//     tools: [
//       {
//         type: "function",
//         function: {
//           function: (args: any): Promise<any> | string => {
//             return '';
//           },
//           parse: JSON.parse,
//           name: "save_update_report",
//           description:
//             "Save new reported information or remove. Ensure user provides minimumal coherent information [example: if report is 'its broken', ask 'what is broken?']. Must explicit ask to save, update, or delete info. Ignore for questions, only for information-giving statements.",
//           parameters: {
//             type: "object",
//             properties: {
//               fact: {
//                 type: "string",
//                 description:
//                   "The event fact to save. Fact MUST include any given URLs, images, or files.",
//               },
//               keywords: {
//                 type: "string",
//                 description:
//                   "Use up to 2 unique space-seperated alternative keywords to find existing data to update, include key facts, IDs. Do NOT use requested changes in search terms.",
//               },
//             },
//             required: [
//               "fact",
//               "keywords",
//               "category",
//               "userid",
//               "channelid",
//               "admin",
//               "targetUserId",
//             ],
//           },
//         },
//       },

//       {
//         type: "function",
//         function: {
//           function: (args: { username: string }) => {
//             console.log("::not_a_question_or_fact_or_report", args);
//             return `MUST RESPOND WITH "<SILENCE> if not a question or statement or follow-up requested info" tag`;
//           },
//           parse: JSON.parse,
//           name: "not_a_question_or_fact_or_report",
//           description:
//             "Trigger this function if the user is not asking a question, stating a fact, or reporting. Idle chatter or conversation is ignored.",
//           parameters: {
//             type: "object",
//             properties: {
//               username: {
//                 type: "string",
//                 description: "The username of the unpolite user",
//               },
//             },
//           },
//           required: ["username"],
//         },
//       },
//     ],

//     messages: [
//       {
//         role: "system",
//         content: ``,
//       },
//       {
//         role: "user",
//         content: msg,
//       },
//     ],
//     parallel_tool_calls: true,
//     model: "gpt-4o"
//     temperature: 0.4,
//     // temperature: 0.6,
//   });

//   if (r.errored) {
//     console.error(r);
//   }

//   const res = "" + (await r?.finalContent()); //.choices[0]?.message?.content;

//   // console.log("::copilot", `"${msg}"`, res);
//   return { r: res, saved, fetched };
// }
