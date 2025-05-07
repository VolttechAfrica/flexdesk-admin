import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { apiService } from "@services/api/apiService";

import { GenAIResponse } from "@type/genAI";
import { createSubjectMany } from "@hooks/useSubject"

export const useQuestionGenerators = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchQuestions = (params: object) =>
    apiService.post("http://localhost:3000", "/api/genai", params);

  const generateQuestions = async (
    subject: string,
    examSession: string,
    difficultyLevel: string,
    numberOfQuestions: string,
    prompt: string,
    model: string
  ) => {
    setLoading(true);
    try {
      const cookieKey = `genAi-${subject}-${examSession}-${difficultyLevel}-${numberOfQuestions}-${model}`;
      let questionData: GenAIResponse | null = null;
      const cached = Cookies.get(cookieKey);

      if (cached) {
        questionData = JSON.parse(cached);
      } else {

        const question = await fetchQuestions({
          subject,
          difficultyLevel,
          numberOfQuestions,
          prompt,
          model,
        });

        if (!question) throw new Error('Internal error, unable to generate Questions')

        questionData = question?.data?.questions

        console.log(questionData);

        Cookies.set(cookieKey, JSON.stringify(questionData), { expires: 1 });


        const created = await createSubjectMany(subject, examSession, questionData);
        if (!created) throw new Error("Unable to insert new questions, please try again.");

        Swal.fire({
          title: "Questions Generated!",
          text: "Your questions have been generated and saved.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          Cookies.remove(cookieKey);
          //router.push(`/subject/questions/${subject}/${examSession}`);
        });


      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }

  };

  return { generateQuestions, loading };
};
