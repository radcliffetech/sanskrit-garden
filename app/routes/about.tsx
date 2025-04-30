import AboutContainer from "~/components/Home/AboutContainer";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "About!" },
  ];
};

export default function About() {
  return (
    <PageFrame>
      <PageHeader>About (विवरणम्)</PageHeader>
      <AboutContainer />
    </PageFrame>
  );
}
