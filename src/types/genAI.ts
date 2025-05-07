

export interface GenAIRequest {
    subject: string,
    difficultyLevel: string
    prompt?: string
    numberOfQuestions: string
    model?: string
}

interface answer {
  A: string,
  B: string,
  C: string,
  D: string
}

export interface GenAIQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: answer;
}

export interface GenAIResponse {
  questions: GenAIQuestion[];
}