import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About Sanskrit" },
    { name: "description", content: "Sanskrit" },
  ];
};



export default function Alphabet() {

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Sanskrit</h1>
      <div className="space-y-6 text-gray-800">
        <section>
          <h2 className="text-2xl font-semibold mb-2">History</h2>
          <p>
            Sanskrit is an ancient Indo-Aryan language that originated in the Indian subcontinent. 
            It is one of the oldest known languages in the world and forms the foundation of many modern Indian languages. 
            Historically used in religious and philosophical texts, Sanskrit was formalized in Panini’s grammar around the 4th century BCE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Linguistic Features</h2>
          <p>
            Sanskrit has a highly systematic and complex grammar, with features such as inflectional morphology, 
            extensive use of compounds, and a rich system of verb conjugations. 
            Its phonetics and precision have influenced linguistic studies worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Famous Works</h2>
          <p>
            Renowned texts in Sanskrit include the Vedas, Upanishads, Mahabharata, Ramayana, and classical works like 
            Kalidasa’s plays and poetry. These texts span a wide range of themes from mythology and philosophy to 
            science and art.
          </p>
        </section>
      </div>

    </div>
  );
}
