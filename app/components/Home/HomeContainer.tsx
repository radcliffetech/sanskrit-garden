import { FeatureGrid } from "./FeatureGrid";
import { HomeShloka } from "./HomeShloka";

export function HomeContainer() {
  return (
    <>
      <HomeShloka />
      <div className="space-y-12 max-w-6xl mx-auto px-4">
        <section>
          <h2 className="text-2xl font-light mb-6">AI Assistants</h2>
          <FeatureGrid category="ai" />
        </section>
        <section>
          <h2 className="text-2xl font-light mb-6">Learning Tools</h2>
          <FeatureGrid category="learning" />
        </section>
        <section>
          <h2 className="text-2xl font-light mb-6">Exploration</h2>
          <FeatureGrid category="explore" />
        </section>
      </div>
    </>
  );
}
