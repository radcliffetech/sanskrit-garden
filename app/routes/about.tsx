import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "About!" },
  ];
};

export default function About() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-lg mb-4">
        Sanskrit Garden is a project dedicated to the exploration and learning of the Sanskrit language, and Computer Science.
        </p>
      <p className="text-lg mb-4">
      This project is coded with respect by Jeffrey Radcliffe.
        </p>
    </div>
  );
}
