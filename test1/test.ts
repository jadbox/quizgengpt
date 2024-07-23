import fs from "fs";
import { getCompletion } from "../copilot";

const textCommand = fs.readFileSync("prompt_text.txt", "utf-8");

// Format the table below into a JS list of strings
// use as props: System,	Global Disease Process,	Specific Disease Process
// already ordered by frequency
const Categories = [
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Congestive heart failure",
    SpecificDiseaseProcess: "",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Peripheral vascular disease",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Infectious heart disease",
    SpecificDiseaseProcess:
      "Rheumatic fever/myocardial tissue- and valve-related",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Ischemic heart disease",
    SpecificDiseaseProcess: "Angina pectoris",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Ischemic heart disease",
    SpecificDiseaseProcess: "Myocardial infarction",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Ischemic heart disease",
    SpecificDiseaseProcess: "Other ischemic heart disease",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Cardiomyopathy",
    SpecificDiseaseProcess: "",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Hypertension",
    SpecificDiseaseProcess: "Essential",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Hypertension",
    SpecificDiseaseProcess: "Malignant",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Hypertension",
    SpecificDiseaseProcess: "Secondary",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Varicose veins",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Arrhythmias/conduction disorders",
    SpecificDiseaseProcess: "",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Congenital heart disease",
    SpecificDiseaseProcess: "",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "III-defined presentations",
    SpecificDiseaseProcess: "Chest pain",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "III-defined presentations",
    SpecificDiseaseProcess: "Edema",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "III-defined presentations",
    SpecificDiseaseProcess: "Dyspnea",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Infectious heart disease",
    SpecificDiseaseProcess: "Endocarditis/viral myocarditis",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Pericarditis",
    SpecificDiseaseProcess: "",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Symptoms referable to the cardiovascular system",
    SpecificDiseaseProcess: "Murmurs",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Aortic aneurysm",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Arterial embolism",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Atherosclerosis",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Vascular disease",
    SpecificDiseaseProcess: "Venous embolism/thrombosis",
  },
  {
    System: "Cardiovascular",
    GlobalDiseaseProcess: "Bacterial infections",
    SpecificDiseaseProcess: "",
  },
  // {
  //   System: "Cardiovascular",
  //   GlobalDiseaseProcess: "Symptoms referable to the cardiovascular system",
  //   SpecificDiseaseProcess: "Palpitations",
  // },
  // {
  //   System: "Cardiovascular",
  //   GlobalDiseaseProcess: "Vascular disease",
  //   SpecificDiseaseProcess: "Phlebitis/thrombophlebitis",
  // },
];

async function TEST1(
  questions: number = 0,
  i: number = 0,
  prev: string = ""
): Promise<string> {
  // new var thats i mod length of Categories
  const ri = i % Categories.length; // rotatingIdx

  let diseaseCategory =
    "Please write a question SPECIFIC on Disease " +
    !Categories[ri].SpecificDiseaseProcess
      ? Categories[ri].GlobalDiseaseProcess
      : `${Categories[ri].SpecificDiseaseProcess} in area of ${Categories[ri].GlobalDiseaseProcess}`;

  if (i > 0 && prev)
    diseaseCategory +=
      "\n\nDo not exactly reuse these past question scenarios:\n" + prev;

  i++;
  if (i <= questions) {
    console.log("\ngetCompletion:", diseaseCategory);
    const completion = await getCompletion(diseaseCategory, textCommand);
    if (!completion) throw new Error("No completion");

    const scenario = completion
      .split("Clinical Scenario:")[1]
      .split("Question:")[0]
      // * and new lines
      .replace(/[\*|\n]/g, "");

    // console.log("Scenario:", scenario);
    const prevs = prev + "\n\n" + scenario.split(".").slice(0, 1);
    // console.log("prevs: ", prevs);

    // append to file output_test.txt
    fs.appendFileSync("output_test.txt", completion + `\n\n-- question --\n`);

    return completion + "\n---\n" + TEST1(questions, i, prevs);
  }

  return "";
}

TEST1(
  23,
  0,
  `A 6-month-old infant is brought to the emergency department by her parents due to concerns about poor feeding and labored breathing over the last week

An 8-year-old boy presents to the pediatric clinic with a complaint of leg pain and swelling`
); // .then((r) => console.log(r));
