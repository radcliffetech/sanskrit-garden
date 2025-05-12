import AboutContainer from "~/components/About/AboutContainer";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";

export const meta: MetaFunction = () => {
  return [{ title: "About" }, { name: "description", content: "About!" }];
};

export default function About() {
  return (
    <PageFrame>
      <PageHeader>About (विवरणम्)</PageHeader>
      <AboutContainer />
    </PageFrame>
  );
}
