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
        <img src="images/om.png" alt="Om" className="mx-auto w-2/5 opacity-50" /> 
    </div>
  );
}
