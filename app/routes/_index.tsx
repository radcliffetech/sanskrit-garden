import { FeatureCard } from "~/components/Shared/FeatureCard";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { StarIcon } from "@heroicons/react/24/solid";

export const meta: MetaFunction = () => {
  return [
    { title: "Sanskrit Garden" },
    { name: "description", content: "Welcome to the Sanskrit Garden!" },
  ];
};

export default function Index() {
  return (
    <PageFrame>
      <Shloka />
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
    </PageFrame>
  );
}

function Shloka() {
  return <div className="text-center mb-16">
    <img src="/images/om.png" alt="Sanskrit Garden" className="mx-auto mb-4 h-14" />
    <p className="text-xl text-gray-700 mb-2">सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।</p>
    <p className="text-xl text-gray-700 mb-2">तेजस्विनावधीतमस्तु मा विद्विषावहै। ॐ शान्तिः शान्तिः शान्तिः॥</p>
    <p className="text-xs text-gray-500 italic">May we be protected together, may we be nourished together, may we work together with great energy</p>
    <p className="text-xs text-gray-500 italic">May our studies be enlightening. Let us not hate each other. Om, peace, peace, peace.</p>
  </div>;
}
