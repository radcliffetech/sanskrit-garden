import { FeatureCard } from "~/components/Home/FeatureCard";
import { HomeShloka } from "./HomeShloka";
import { StarIcon } from "@heroicons/react/24/solid";
export function HomeContainer() {
  return (
    <>
      <HomeShloka />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <FeatureCard to="/storyteller" label="AI Storyteller" icon={<StarIcon className="h-6 w-6 text-indigo-500" />} description="Generate stories based on your input." />
          <FeatureCard to="/explain-concept" label="AI Explainer" icon={<StarIcon className="h-6 w-6 text-indigo-500" />} description="Get explanations of Sanskrit concepts." />
          <FeatureCard to="/alphabet" label="Sanskrit Alphabet" description="Learn the basics of the Sanskrit alphabet." />
          <FeatureCard to="/articles" label="Sanskrit Articles" description="Explore articles on various Sanskrit topics." />
          <FeatureCard to="/quiz" label="Quiz Yourself" description="Test your knowledge of Sanskrit (and this site)." />
          <FeatureCard to="/texts" label="Sanskrit Texts" description="Explore a selection Sanskrit texts." />
        </div>
      </div>
    </>
  );
}

