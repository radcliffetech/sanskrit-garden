import { HomeContainer } from "~/components/Home/HomeContainer";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";

export const meta: MetaFunction = () => {
  return [
    { title: "Sanskrit Garden" },
    { name: "description", content: "Welcome to the Sanskrit Garden!" },
  ];
};

export default function Index() {
  return (
    <PageFrame>
        <HomeContainer />
      </PageFrame>
    );
} 
