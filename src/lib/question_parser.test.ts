import { questionToJSON } from "./question_parser";
import { test, expect, describe, it } from "bun:test";

describe("questionToJSON", () => {
  it("should parse a single question correctly", () => {
    const text = `
            This question assesses your understanding of ischemic heart disease.
            Clinical Vignette Question: Ischemic Heart Disease
            Clinical Scenario:
            A 58-year-old man with a history of hypertension, hyperlipidemia, and type 2 diabetes presents to the clinic with a 6-month history of exertional chest pain. He describes the pain as a pressure-like sensation that occurs with moderate physical activity and is relieved by rest. He also reports occasional shortness of breath and fatigue. On physical examination, his blood pressure is 145/90 mmHg, heart rate is 85 bpm, and he appears overweight with a BMI of 30. Laboratory studies show elevated LDL cholesterol and HbA1c levels.
            Question:
            Based on your understanding of the basic science concepts underlying ischemic heart disease, which of the following pathophysiological mechanisms is most likely contributing to this patient's symptoms?
            Options:
            A. Coronary artery spasm leading to transient myocardial ischemia
            B. Plaque rupture and subsequent thrombus formation
            C. Progressive atherosclerotic plaque formation leading to stable angina
            D. Coronary artery embolism from a distant source
            E. Myocardial inflammation and fibrosis
            Correct Answer: C
            Rationale:
            A: Coronary artery spasm can cause ischemia but is more characteristic of Prinzmetal angina, which presents with chest pain at rest rather than exertional pain.
            B: Plaque rupture and subsequent thrombus formation are mechanisms underlying acute coronary syndromes, such as unstable angina or myocardial infarction, rather than stable angina.
            C: This is the correct answer. Progressive atherosclerotic plaque formation results in narrowing of the coronary arteries, reducing blood flow during periods of increased demand, and leading to stable angina with exertion.
            D: Coronary artery embolism is less common and typically presents with sudden onset of symptoms rather than a chronic, exertional pattern.
            E: Myocardial inflammation and fibrosis are associated with cardiomyopathies rather than ischemic heart disease.
            Next Steps:
            - Diagnostic tests: Exercise stress test or coronary angiography to assess the severity and extent of coronary artery disease.
            - Medical management: Antiplatelet therapy (aspirin), statins, beta-blockers, nitrates, and ACE inhibitors.
            - Lifestyle modification: Smoking cessation, weight loss, diet, and exercise.
            - Referral: Consider referral to cardiology for further evaluation and possible revascularization if indicated.
        `;

    const result = questionToJSON(text);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
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
        { id: "B", text: "Plaque rupture and subsequent thrombus formation" },
        {
          id: "C",
          text: "Progressive atherosclerotic plaque formation leading to stable angina",
        },
        { id: "D", text: "Coronary artery embolism from a distant source" },
        { id: "E", text: "Myocardial inflammation and fibrosis" },
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
    });
  });

  it("should handle multiple questions", () => {
    const text = `
            This question assesses your understanding of ischemic heart disease.
            Clinical Vignette Question: Ischemic Heart Disease
            Clinical Scenario:
            A 58-year-old man with a history of hypertension, hyperlipidemia, and type 2 diabetes presents to the clinic with a 6-month history of exertional chest pain. He describes the pain as a pressure-like sensation that occurs with moderate physical activity and is relieved by rest. He also reports occasional shortness of breath and fatigue. On physical examination, his blood pressure is 145/90 mmHg, heart rate is 85 bpm, and he appears overweight with a BMI of 30. Laboratory studies show elevated LDL cholesterol and HbA1c levels.
            Question:
            Based on your understanding of the basic science concepts underlying ischemic heart disease, which of the following pathophysiological mechanisms is most likely contributing to this patient's symptoms?
            Options:
            A. Coronary artery spasm leading to transient myocardial ischemia
            B. Plaque rupture and subsequent thrombus formation
            C. Progressive atherosclerotic plaque formation leading to stable angina
            D. Coronary artery embolism from a distant source
            E. Myocardial inflammation and fibrosis
            Correct Answer: C
            Rationale:
            A: Coronary artery spasm can cause ischemia but is more characteristic of Prinzmetal angina, which presents with chest pain at rest rather than exertional pain.
            B: Plaque rupture and subsequent thrombus formation are mechanisms underlying acute coronary syndromes, such as unstable angina or myocardial infarction, rather than stable angina.
            C: This is the correct answer. Progressive atherosclerotic plaque formation results in narrowing of the coronary arteries, reducing blood flow during periods of increased demand, and leading to stable angina with exertion.
            D: Coronary artery embolism is less common and typically presents with sudden onset of symptoms rather than a chronic, exertional pattern.
            E: Myocardial inflammation and fibrosis are associated with cardiomyopathies rather than ischemic heart disease.
            Next Steps:
            - Diagnostic tests: Exercise stress test or coronary angiography to assess the severity and extent of coronary artery disease.
            - Medical management: Antiplatelet therapy (aspirin), statins, beta-blockers, nitrates, and ACE inhibitors.
            - Lifestyle modification: Smoking cessation, weight loss, diet, and exercise.
            - Referral: Consider referral to cardiology for further evaluation and possible revascularization if indicated.

            This question assesses your understanding of diabetes management.
            Clinical Vignette Question: Diabetes Management
            Clinical Scenario:
            A 45-year-old woman with a history of type 2 diabetes presents to the clinic for a routine follow-up. She reports good adherence to her medication regimen but has noticed occasional episodes of hypoglycemia. On physical examination, her blood pressure is 130/80 mmHg, heart rate is 75 bpm, and her BMI is 28. Laboratory studies show an HbA1c level of 7.2%.
            Question:
            Which of the following changes to her diabetes management plan is most appropriate?
            Options:
            A. Increase the dose of her current medication
            B. Add a new medication to her regimen
            C. Recommend dietary changes to reduce carbohydrate intake
            D. Suggest more frequent blood glucose monitoring
            E. Refer her to a diabetes education program
            Correct Answer: C
            Rationale:
            A: Increasing the dose of her current medication may increase the risk of hypoglycemia.
            B: Adding a new medication may not be necessary if dietary changes can help control her blood glucose levels.
            C: This is the correct answer. Dietary changes, such as reducing carbohydrate intake, can help manage blood glucose levels and reduce the risk of hypoglycemia.
            D: More frequent blood glucose monitoring is important but does not address the underlying issue of hypoglycemia.
            E: Referral to a diabetes education program is beneficial but may not be the most immediate solution.
            Next Steps:
            - Review her current medication regimen and adjust as needed.
            - Provide dietary counseling to help her make appropriate changes to her diet.
            - Schedule a follow-up appointment to monitor her progress.
        `;

    const result = questionToJSON(text);
    expect(result).toHaveLength(2);
    expect(result[0].subcategory).toBe("Ischemic Heart Disease");
    expect(result[1].subcategory).toBe("Diabetes Management");
  });

  it("should return an empty array for empty input", () => {
    const text = "";
    const result = questionToJSON(text);
    expect(result).toHaveLength(0);
  });
});
