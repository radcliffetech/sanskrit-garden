import { FeatureCard } from "./FeatureCard";
import { StarIcon } from "@heroicons/react/24/solid";

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <FeatureCard to="/storyteller" label="AI Storyteller" icon={<StarIcon className="h-6 w-6 text-indigo-500" />} description="Generate stories based on your input." />
      <FeatureCard to="/explain-concept" label="AI Explainer" icon={<StarIcon className="h-6 w-6 text-indigo-500" />} description="Get explanations of Sanskrit concepts." />
      <FeatureCard to="/alphabet" label="Sanskrit Alphabet" description="Learn the basics of the Sanskrit alphabet." />
      <FeatureCard to="/articles" label="Sanskrit Articles" description="Explore articles on various Sanskrit topics." />
      <FeatureCard to="/quiz" label="Quiz Yourself" description="Test your knowledge of Sanskrit (and this site)." />
      <FeatureCard to="/texts" label="Sanskrit Texts" description="Explore a selection Sanskrit texts." />
    </div>
  );
}
