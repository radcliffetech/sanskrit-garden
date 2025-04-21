import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sanskrit Garden" },
    { name: "description", content: "Welcome to the Sanskrit Garden!" },
  ];
};

export default function Index() {
  return (
    <div>
        <h1 className="h1">Sanskrit Garden</h1>
        <img src="images/om.png" alt="Om" className="w-50 opacity-50" /> 
    </div>
  );
}
