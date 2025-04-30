export default function AboutContainer() {
  return (
    <>
      <div className="prose prose-sm max-w-none text-gray-700 mb-12">
        <p>
          This project is coded and maintained with respect by Jeffrey Radcliffe.
        </p>
        <p>
          Sanskrit Garden is a love poem offered to the Sanskrit language, and and opportunity to explore and test the relation of technology to topics of depth and intensity. Technology can clearly lead us away from the truth, but it can also be a tool to help us find it. This project is an exploration of that idea.
        </p>
        <p>
          The intention is to highlight the magical things Jeffrey has found in his exploration of the Sanskrit language, and to share them with the world. Any errors maade are totally his.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">About Sanskrit</h2>
        <div className="prose prose-sm max-w-none text-gray-800">
          <section>
            <h3 className="text-xl font-light mb-2">History</h3>
            <p>
              Sanskrit is an ancient Indo-Aryan language that originated in the Indian subcontinent.
              It is one of the oldest known languages in the world and forms the foundation of many modern Indian languages.
              Historically used in religious and philosophical texts, Sanskrit was formalized in Panini’s grammar around the 4th century BCE.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-light mb-2">Linguistic Features</h3>
            <p>
              Sanskrit has a highly systematic and complex grammar, with features such as inflectional morphology,
              extensive use of compounds, and a rich system of verb conjugations.
              Its phonetics and precision have influenced linguistic studies worldwide.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-light mb-2">Famous Works</h3>
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
        <div className="prose prose-sm max-w-none text-gray-800">
          <section>
            <h3 className="text-xl font-light mb-2">Background</h3>
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
    </>
  );
}
