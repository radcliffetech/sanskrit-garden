import { LoaderFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout";
import {QuizContainer} from "~/components/Quiz/QuizContainer";
import { getQuizQuestions } from "~/loader/quiz";

export const loader: LoaderFunction = ({ request }) => {
  return getQuizQuestions();
};

export default function QuizRoute() {
  return (
    <PageFrame>
      <PageHeader>Quiz (प्रश्नमाला)</PageHeader>
      <QuizContainer />
    </PageFrame>
  );
}
