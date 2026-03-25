import { HomeContainer } from "~/components/Home/HomeContainer";
import type { MetaFunction } from "react-router";
import { PageFrame } from "~/ui/layout/PageFrame";

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
