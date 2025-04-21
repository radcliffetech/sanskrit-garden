import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "More" },
    { name: "description", content: "More!" },
  ];
};

export default function More() {
  return (
    <div>
        <h1 className="h1">More</h1>
        <img src="images/om.png" alt="Om" className="w-50 opacity-50" /> 
    </div>
  );
}
