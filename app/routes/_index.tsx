import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/ui/PageFrame";
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
      <div className="text-center mb-8">
        <img src="/images/om.png" alt="Sanskrit Garden" className="mx-auto mb-4 h-14" />
        <p className="text-xl text-gray-700 mb-2">सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।</p>
        <p className="text-xl text-gray-700 mb-2">तेजस्विनावधीतमस्तु मा विद्विषावहै। ॐ शान्तिः शान्तिः शान्तिः॥</p>
        <p className="text-xs text-gray-500 italic">May we be protected together, may we be nourished together, may we work together with great energy</p>
        <p className="text-xs text-gray-500 italic">May our studies be enlightening. Let us not hate each other. Om, peace, peace, peace.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link to="/storyteller" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center flex items-center justify-center space-x-2">
            <span>Sanskrit Storyteller (AI)</span>
            <StarIcon className="h-6 w-6 text-indigo-500" />
          </Link>
          <Link to="/explain-concept" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center flex items-center justify-center space-x-2">
            Concept Explainer (AI)
            <StarIcon className="h-6 w-6 text-indigo-500" />
          </Link>
          <Link to="/alphabet" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Sanskrit Alphabet
          </Link>
          <Link to="/articles" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Sanskrit Articles
          </Link>
          <Link to="/quiz" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Quiz Yourself
          </Link> <Link to="/texts/" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Sanskrit Texts
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
