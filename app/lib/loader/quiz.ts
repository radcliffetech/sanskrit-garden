import type { QuizQuestion } from "~/types";
import { getQuizQuestions as loaderGetQuizQuestions } from "~/lib/repositories/quizRepository";

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const questions = loaderGetQuizQuestions();
    return questions;

}