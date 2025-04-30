import { FeatureGrid } from "./FeatureGrid";
import { HomeShloka } from "./HomeShloka";

export function HomeContainer() {
  return (
      <>
        <HomeShloka />
        <div className="flex justify-center">
          <FeatureGrid />
        </div>
      </>
  );
}
