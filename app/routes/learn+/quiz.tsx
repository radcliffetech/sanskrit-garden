import { LoaderFunction } from "@remix-run/node";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { QuizContainer } from "~/components/Quiz/QuizContainer";
import { QuizQuestion } from "~/types";
import { getQuizQuestions } from "~/core/lib/repositories/quizRepository";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = ({ request }) => {
  return getQuizQuestions();
};

export default function QuizRoute() {
  return (
    <PageFrame>
      <PageHeader>Quiz (प्रश्नमाला)</PageHeader>
      <QuizContainer questions={useLoaderData<QuizQuestion[]>()} />
    </PageFrame>
  );
}
