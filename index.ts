const fs = require("fs");
const xlsx = require("xlsx");
const copilot = require("./copilot");

async function test() {
  // Global Disease Process
  // Specific Disease Process
  const r = await copilot.getObjPrompt("Rheumatic fever");

  console.log(r);
}
test();

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

  return formattedJson;
}

// Example usage
const filePath = "./Master_PACKRAT_2024.xlsx";

const jsonResult = loadExcelSheet(filePath);

// for each jsonResult System parameter into a key for the object
const jsonResultObject: any = {};
jsonResult.forEach((row: any) => {
  if (!row["System"]) return;
  jsonResultObject[row["System"]] = row;
  delete row["System"];
});

// console.log(JSON.stringify(jsonResultObject, null, 2));

// console.log(JSON.stringify(jsonResult, null, 2));

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
