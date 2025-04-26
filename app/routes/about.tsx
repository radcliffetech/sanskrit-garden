import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "About!" },
  ];
};

export default function About() {
  return (
    <PageFrame>
      <PageHeader>About</PageHeader>
      <p className="text-lg mb-4">
        This project is coded and maintained with respect by Jeffrey Radcliffe.
      </p>
      <p className="text-lg mb-4">
        Sanskrit Garden is a love poem offered to the Sanskrit language, and and opportunity to explore concepts in Computer Science along the way.
      </p>
      <p className="text-lg mb-4">
        The intention is to highlight the magical things Jeffrey has found in his exploration of the Sanskrit language, and to share them with the world.
      </p>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">About Sanskrit</h2>
        <div className="space-y-6 text-gray-800">
          <section>
            <h3 className="text-xl font-semibold mb-2">History</h3>
            <p>
              Sanskrit is an ancient Indo-Aryan language that originated in the Indian subcontinent.
              It is one of the oldest known languages in the world and forms the foundation of many modern Indian languages.
              Historically used in religious and philosophical texts, Sanskrit was formalized in Panini’s grammar around the 4th century BCE.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Linguistic Features</h3>
            <p>
              Sanskrit has a highly systematic and complex grammar, with features such as inflectional morphology,
              extensive use of compounds, and a rich system of verb conjugations.
              Its phonetics and precision have influenced linguistic studies worldwide.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Famous Works</h3>
            <p>
              Renowned texts in Sanskrit include the Vedas, Upanishads, Mahabharata, Ramayana, and classical works like
              Kalidasa’s plays and poetry. These texts span a wide range of themes from mythology and philosophy to
              science and art.
            </p>
          </section>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">About Jeffrey</h2>
        <div className="space-y-6 text-gray-800">
          <section>
            <h3 className="text-xl font-semibold mb-2">Background</h3>
            <p>
              Jeffrey Radcliffe is a passionate programmer and linguist with a deep interest in the Sanskrit language.
              He has spent years exploring the knowlwedge of the world, and is fascinated with Sanskrit's intricacies and applications in modern life.
            </p>
            <p className="mt-4">
              Learn more at <a href="https://jeffreyradcliffe.com" className="text-blue-600 hover:underline">jeffreyradcliffe.com</a>.
            </p>
          </section>
          
        </div>
      </div>
    </PageFrame>
  );
}
