import { GenAIRequest } from "@type/genAI";

export const buildPromptForGemini = (params: GenAIRequest): string => {
  const { subject, difficultyLevel, numberOfQuestions, prompt: additional } = params;

  return `
You are an intelligent exam generator AI trained to produce clear, structured multiple-choice questions (MCQs) for exams.

Your task is to create exactly ${numberOfQuestions} MCQs on the subject of "${subject}", with a difficulty level of "${difficultyLevel}". 

Each question must include:
- A "question" string (use HTML for bold, italics, etc.)
- Four options: "optionA", "optionB", "optionC", "optionD"
- A correct answer field: "answer" with one of ["A", "B", "C", "D"]

Important Formatting Rules:
- Return only a single valid JSON object with no markdown or prose.
- Do **not** explain or wrap the JSON — no code fences, no headings.
- Ensure the output starts with "{" and ends with "}".
- Use HTML tags for formatting (e.g., <b>, <i>, <br>), especially for math.
- Use MathML if a formula is present — avoid LaTeX.

JSON output structure:

{
  "questions": [
    {
      "question": "string",
      "optionA": "string",
      "optionB": "string",
      "optionC": "string",
      "optionD": "string",
      "answer": "A"
    }
  ]
}

Additional context or instructions:
${additional || "None"}
`.trim();
};


export const buildPromptForDeepSeek = (params: GenAIRequest): string => {
  const { subject, difficultyLevel, numberOfQuestions, prompt: additional } = params;

  return `
You are an AI specializing in generating structured exam content. Generate ${numberOfQuestions} high-quality multiple-choice questions on "${subject}" at a "${difficultyLevel}" difficulty level.

Each question should follow this format:
{
  "question": "string (use <b>, <i>, <br>, or MathML for formatting)",
  "optionA": "string",
  "optionB": "string",
  "optionC": "string",
  "optionD": "string",
  "answer": "A"
}

Output Instructions:
- Your response must be **only** one valid JSON object. Do not include markdown (like triple backticks), extra commentary, or explanations.
- The object must start with \`{\` and end with \`}\`.
- Ensure the JSON is parseable and clean.
- Use HTML or MathML for math formatting (avoid LaTeX).
- Do not add text outside the JSON block.

Structure of the output:

{
  "questions": [
    {
      "question": "string",
      "optionA": "string",
      "optionB": "string",
      "optionC": "string",
      "optionD": "string",
      "answer": "A"
    }
  ]
}

Additional instructions: ${additional || "None"}
`.trim();
};

export const basePrompt = ({ subject, difficultyLevel, numberOfQuestions, prompt: additionalPrompt }: GenAIRequest): string => `
You are an exam generator AI. Based on the subject "${subject}" and difficulty level "${difficultyLevel}", generate ${numberOfQuestions} multiple-choice questions.

Each question must include:
- A "question" string
- Options: "optionA", "optionB", "optionC", and "optionD"
- A correct "answer" (must be one of A, B, C, or D)

Requirements:
- Return the result as a single, valid JSON object only (no explanations or extra text).
- The JSON must start with "{" and end with "}" — do not include markdown, comments, or preambles.
- Format the "question" and options using HTML tags where necessary (e.g., <b>, <i>, <br>).
- If a question includes a mathematical formula, use HTML or MathML.

Use the structure:

{
  "questions": [
    {
      "question": "string",
      "optionA": "string",
      "optionB": "string",
      "optionC": "string",
      "optionD": "string",
      "answer": "A"
    }
  ]
}

Additional instructions: ${additionalPrompt}`.trim();