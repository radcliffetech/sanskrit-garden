import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/ui/PageFrame";
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
        <p className="text-lg text-gray-600">Learn and explore the beauty of Sanskrit.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link to="/alphabet" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Sanskrit Alphabet
          </Link>
          <Link to="/articles" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Sanskrit Articles
          </Link>
          <Link to="/quiz" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Quiz Yourself
          </Link>
          <Link to="/explain-concept" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Concept Explainer (AI)
          </Link>
          <Link to="/texts/nirvana-shaktam" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Texts - Nirvana Shaktam
          </Link>
          <Link to="/texts/ribhu-gita/chapter-26" className="block border rounded-lg shadow-md p-6 text-black hover:underline text-lg text-center">
            Texts - Ribhu Gita (Chapter 26, selections)
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
