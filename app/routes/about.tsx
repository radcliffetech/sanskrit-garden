import { Image } from "react-bootstrap";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "About!" },
  ];
};

export default function About() {
  return (
    <div>
        <h1 className="h1">About</h1>
        <img src="images/om.png" alt="Om" className="w-50 opacity-50" /> 
    </div>
  );
}
