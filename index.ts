import { getObjPrompt } from "./copilot";

const fs = require("fs");
const xlsx = require("xlsx");

// ChatGPT generation
async function generateQuestion(area: string = "Rheumatic fever") {
  if (!area) throw new Error("Area is required");

  console.log("Generating question for:", area);
  // Global Disease Process
  // Specific Disease Process
  const r = await getObjPrompt(area);

  // create output folder if not exists
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }

  // convert area in a file name with no spaces and no special characters and lowercase
  const fileName = area
    .replace(/[^a-zA-Z0-9]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();

  // save or append to file output.txt
  fs.appendFileSync(`output/${fileName}.txt`, r + "\n---\n");

  console.log("Done. Generated:");
  console.log(r);
  console.log("---");
}

// Load the primary Master_PACKRAT_2024.xlsx file for directives
function loadExcelSheet(filePath: string) {
  // Read the Excel file
  const workbook = xlsx.readFile(filePath);

  // Get the specific sheet
  const sheet = workbook.Sheets["PACKRAT_BluePrint"];

  // Convert the sheet to JSON
  const jsonSheet = xlsx.utils.sheet_to_json(sheet, {
    defval: null,
  });

  const Sheet_PACKRAT_Content = xlsx.utils.sheet_to_json(
    workbook.Sheets["PACKRAT_Content"],
    {
      defval: null,
    }
  );

  // console.log(Sheet_PACKRAT_Content);

  // trim each key in JSON
  jsonSheet.forEach((row: any) => {
    Object.keys(row).forEach((key) => {
      const trimmedKey = key.trim();
      if (trimmedKey !== key) {
        row[trimmedKey] = row[key];
        delete row[key];
      }
    });
  });

  // remove __EMPTY_X columns
  // trim System column
  Sheet_PACKRAT_Content.forEach((row: any) => {
    Object.keys(row).forEach((key) => {
      row["System"] = row["System"]?.trim();

      if (key.includes("__EMPTY")) {
        delete row[key];
        delete row["Frequency_1"];
      }
    });
  });

  // Format the JSON object
  const formattedJson = jsonSheet.map((row: any) => {
    const System = row["System"]?.trim();
    return {
      System: System,
      Blueprint: Sheet_PACKRAT_Content.filter(
        (x: any) => x["System"] === System
      ),
      Content: row["Content"],
      "History & Physical": row["History & Physical"],
      "Diagnostic Studies": row["Diagnostic Studies"],
      Diagnosis: row["Diagnosis"],
      "Clinical Intervention": row["Clinical Intervention"],
      "Clinical Therapeutics": row["Clinical Therapeutics"],
      "Health Maintenance": row["Health Maintenance"],
      "Scientific Concepts": row["Scientific Concepts"],
      Total: row["__EMPTY_9"], // Adjust column name as per the data
    };
  });

  // sort Data by its element's key Frequency
  formattedJson.forEach((row: any) => {
    row.Blueprint.forEach((x: any) => {
      delete x["System"];
    }); // already have System in the parent object
    row.Blueprint.sort((a: any, b: any) => {
      return b.Frequency - a.Frequency;
    });
  });

  // for each jsonResult System parameter into a key for the object
  // const jsonResultObject: any = {};
  // formattedJson.forEach((row: any) => {
  //   if (!row["System"]) return;
  //   // jsonResultObject[row["System"]] = row;
  //   delete row["System"];
  // });

  return formattedJson;
}

// Example usage

const SYSTEMS_OPT = [
  "Cardiovascular",
  "Pulmonology",
  "Gastrointestinal/Nutrition",
  "Orthopedics/Rheumatology",
  "ENT/Ophthalmology",
  "Obstetrics/Gynecology",
  "Endocrinology",
  "Neurology/Neurosurgery",
  "Psychiatry/Behavioral Medicine",
  "Urology/Renal",
  "Dermatology",
  "Hematology",
  "Infectious Diseases",
];

const FIELDS_OPT = [
  "History & Physical",
  "Diagnostic Studies",
  "Diagnosis",
  "Clinical Intervention",
  "Clinical Therapeutics",
  "Health Maintenance",
  "Scientific Concepts",
];

function loadQuestionSchema(field: string = "Cardiovascular") {
  if (!field) throw new Error("Field is required");

  const filePath = "./Master_PACKRAT_2024.xlsx";
  const jsonResult = loadExcelSheet(filePath).filter((x: any) => {
    if (!x || !x["System"]) return false;
    return x["System"].toLowerCase().trim() === field.trim().toLowerCase();
  })[0];

  if (!jsonResult) throw new Error("Field not found " + field);

  // call formatBluePrintProcess and set property BlueprintSections
  jsonResult["BlueprintSections"] = formatBluePrintProcess(jsonResult);

  return jsonResult;
}

function formatBluePrintProcess(jsonResult: any) {
  const pickSections = [];

  // sample from the jsonResult.Blueprint for the field "Specific Disease Process" at the frequency of the Frequency field
  for (let i = 0; i < jsonResult["Blueprint"].length; i++) {
    let f =
      jsonResult["Blueprint"][i]["Specific Disease Process"]?.trim() || "";
    if (f) f += " under ";
    f += jsonResult["Blueprint"][i]["Global Disease Process"]?.trim() || "";

    pickSections.push(f);
  }

  return pickSections;
}

// CLI prompt the user to pick a SYSTEM to generate a question and how many questions to generate
function promptUser() {
  const { prompt } = require("enquirer");

  const questions = [
    {
      type: "select",
      name: "system",
      message: "Pick a system to generate questions for:",
      choices: SYSTEMS_OPT,
    },
    {
      type: "input",
      name: "count",
      message: "How many questions to generate?",
      initial: "1",
    },
  ];

  prompt(questions).then((answers: any) => {
    const system = answers.system;
    const count = parseInt(answers.count);

    const jsonResult = loadQuestionSchema(system);
    // console.log("loadQuestionSchema", jsonResult, system);

    const sections = jsonResult["BlueprintSections"];
    const sectionsLen = sections.length;

    for (let i = 0; i < count; i++) {
      generateQuestion(sections[i % sectionsLen]);
    }
  });
}

promptUser();
