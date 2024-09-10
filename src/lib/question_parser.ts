// import { readFileSync } from "fs";
// import { Buffer } from "buffer";
// import mammoth from "mammoth";
// import fetch from "node-fetch";

// Ensure the Word document is shared publicly, and obtain the shareable link.
// export async function downloadAndExtractText(fileUrl: string): Promise<string> {
//   try {
//     // Step 1: Download the file using fetch
//     const response = await fetch(fileUrl);

//     if (!response.ok) {
//       throw new Error(`Failed to download file: ${response.statusText}`);
//     }

//     // Step 2: Convert the response to an array buffer
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Step 3: Extract text from the file using mammoth
//     const result = await mammoth.extractRawText({ buffer });
//     console.log("Extracted Text:", result.value);
//     return result.value as string;
//   } catch (error) {
//     console.error("Error:", error);
//   }
//   throw new Error("Failed to extract text from the Word document");
// }

// no imports needed
export function questionToJSON(text: string) {
  // console.log("text", text);
  // Use a regex to split questions, allowing for multiple newlines
  // look to split before "This question assesses"
  const questions = text
    .split(/(?=This question assesses)/)
    .filter((q) => q.trim() !== "");
  console.log("questions", questions.length);

  return questions.map((question: string) => {
    const lines = question
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    const result = {
      type: "clinicalVignette",
      category: "Basic Science Concepts",
      subcategory: "",
      difficulty: "moderate",
      clinicalScenario: "",
      question: "",
      options: [] as { id: string; text: string }[],
      correctAnswer: "",
      rationale: {} as Record<string, string>,
      nextSteps: [] as string[],
    };

    let currentSection = "";

    const sectionHeaders: Record<string, string> = {
      "Clinical Scenario:": "clinicalScenario",
      "Question:": "question",
      "Options:": "options",
      "Rationale:": "rationale",
      "Next Steps:": "nextSteps",
    };

    lines.forEach((line) => {
      if (line.includes("Clinical Vignette Question:")) {
        result.subcategory = line.split(":")[1].trim();
      } else if (sectionHeaders[line]) {
        currentSection = sectionHeaders[line];
      } else if (line.startsWith("Correct Answer:")) {
        result.correctAnswer = line.split(":")[1].trim();
      } else {
        switch (currentSection) {
          case "clinicalScenario":
            result.clinicalScenario += line + " ";
            break;
          case "question":
            result.question += line + " ";
            break;
          case "options":
            const [id, ...textParts] = line.split(". ");
            result.options.push({ id, text: textParts.join(". ").trim() });
            break;
          case "rationale":
            if (line.match(/^[A-E]:/)) {
              const [id, ...textParts] = line.split(": ");
              result.rationale[id] = textParts.join(": ").trim();
            } else if (Object.keys(result.rationale).length > 0) {
              const lastKey = Object.keys(result.rationale).pop()!;
              result.rationale[lastKey] += " " + line;
            }
            break;
          case "nextSteps":
            result.nextSteps.push(line.replace(/^- /, ""));
            break;
        }
      }
    });

    result.clinicalScenario = result.clinicalScenario.trim();
    result.question = result.question.trim();

    return result;
  });
}

const QUESTIONS = [
  {
    type: "clinicalVignette",
    category: "Basic Science Concepts",
    subcategory: "Ischemic Heart Disease",
    difficulty: "moderate",
    clinicalScenario:
      "A 58-year-old man with a history of hypertension, hyperlipidemia, and type 2 diabetes presents to the clinic with a 6-month history of exertional chest pain. He describes the pain as a pressure-like sensation that occurs with moderate physical activity and is relieved by rest. He also reports occasional shortness of breath and fatigue. On physical examination, his blood pressure is 145/90 mmHg, heart rate is 85 bpm, and he appears overweight with a BMI of 30. Laboratory studies show elevated LDL cholesterol and HbA1c levels.",
    question:
      "Based on your understanding of the basic science concepts underlying ischemic heart disease, which of the following pathophysiological mechanisms is most likely contributing to this patient's symptoms?",
    options: [
      {
        id: "A",
        text: "Coronary artery spasm leading to transient myocardial ischemia",
      },
      {
        id: "B",
        text: "Plaque rupture and subsequent thrombus formation",
      },
      {
        id: "C",
        text: "Progressive atherosclerotic plaque formation leading to stable angina",
      },
      {
        id: "D",
        text: "Coronary artery embolism from a distant source",
      },
      {
        id: "E",
        text: "Myocardial inflammation and fibrosis",
      },
    ],
    correctAnswer: "C",
    rationale: {
      A: "Coronary artery spasm can cause ischemia but is more characteristic of Prinzmetal angina, which presents with chest pain at rest rather than exertional pain.",
      B: "Plaque rupture and subsequent thrombus formation are mechanisms underlying acute coronary syndromes, such as unstable angina or myocardial infarction, rather than stable angina.",
      C: "This is the correct answer. Progressive atherosclerotic plaque formation results in narrowing of the coronary arteries, reducing blood flow during periods of increased demand, and leading to stable angina with exertion.",
      D: "Coronary artery embolism is less common and typically presents with sudden onset of symptoms rather than a chronic, exertional pattern.",
      E: "Myocardial inflammation and fibrosis are associated with cardiomyopathies rather than ischemic heart disease.",
    },
    nextSteps: [
      "Diagnostic tests: Exercise stress test or coronary angiography to assess the severity and extent of coronary artery disease.",
      "Medical management: Antiplatelet therapy (aspirin), statins, beta-blockers, nitrates, and ACE inhibitors.",
      "Lifestyle modification: Smoking cessation, weight loss, diet, and exercise.",
      "Referral: Consider referral to cardiology for further evaluation and possible revascularization if indicated.",
    ],
  },
  // Add more questions here
];
