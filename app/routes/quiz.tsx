import { LoaderFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout";
import QuizContainer from "~/components/Quiz/QuizContainer";
import { getQuizQuestions } from "~/loader/quiz";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = ({ request }) => {
  return getQuizQuestions();
};

export default function QuizRoute() {
  const { questions } = useLoaderData<typeof loader>();

  return (
    <PageFrame>
      <PageHeader>Quiz</PageHeader>
      <QuizContainer questions={questions} />
    </PageFrame>
  );
}
