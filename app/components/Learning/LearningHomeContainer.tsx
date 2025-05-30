import React from "react";

export default function LearningHomeContainer() {
  return (
    <>
      <p className="text-gray-600 text-center mb-8 text-lg">
        अत्र संस्कृताध्ययनाय साधकानां कृते विविधाः साधनानि समुपस्थितानि।
      </p>
      <p className="text-gray-500 text-center">
        स्वागतम्! संस्कृतं पठित्वा सुखम् अनुभवामः।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
        <a
          href="/learn/vocabulary"
          className="block border border-indigo-400 rounded-lg shadow-md p-6 text-center text-lg font-light text-indigo-700 hover:bg-indigo-50 transition"
        >
          शब्दसंग्रहः (Vocabulary)
        </a>
        <a
          href="/learn/verbs"
          className="block border border-indigo-400 rounded-lg shadow-md p-6 text-center text-lg font-light text-indigo-700 hover:bg-indigo-50 transition"
        >
          धातवः (Verbs)
        </a>
        <a
          href="/learn/nouns"
          className="block border border-indigo-400 rounded-lg shadow-md p-6 text-center text-lg font-light text-indigo-700 hover:bg-indigo-50 transition"
        >
          नामानि (Nouns)
        </a>
      </div>
    </>
  );
}
