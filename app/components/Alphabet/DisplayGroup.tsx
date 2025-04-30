import React, { useState } from "react";

import { AlphabetGrid } from "./AlphabetGrid";
import { AlphabetItem } from "~/types";
import {SubgroupCategorySelect} from "~/components/Alphabet/SubgroupCartegorySelect";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";

type ClassificationKey = keyof typeof classificationData;

export default function GroupDisplay({
  mode,
  alphabetData,
}: {
  mode: ClassificationKey;
  alphabetData: AlphabetItem[];
}) {
  const [topGroup, setTopGroup] = useState<"vowels" | "consonants">("vowels");

  const groupData = classificationData.phonetic_classification[topGroup];

  return (
    <>
      <SubgroupCategorySelect value={topGroup} onChange={setTopGroup} />

      {Object.entries(groupData).map(([subgroupName, chars]) => {
        const activeSet = new Set(chars);
        return (
          <div key={subgroupName} className="mb-2">
            <h4 className="text-2xl font-semibold text-gray-700 mb-3">
              {subgroupName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </h4>
            <AlphabetGrid data={alphabetData} activeChars={activeSet} />
          </div>
        );
      })}
    </>
  );
}
