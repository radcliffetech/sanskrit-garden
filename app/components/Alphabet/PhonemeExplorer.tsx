import React, { useState } from "react";

import { AlphabetItem } from "~/types";
import DisplayGroupMetadata from "./DisplayGroupMetadata";
import GroupDisplay from "./DisplayGroup";
import GroupingSelectForm from "./GroupingSelectForm";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";
import groupingMetadata from "~/data/sanskrit-grouping-data.json";

interface Props {
  data: AlphabetItem[];
}
type ClassificationKey = keyof typeof classificationData;

export default function PhonemeExplorer({ data }: Props) {
  const [selectedMode, setSelectedMode] = useState<ClassificationKey>(
    "phonetic_classification"
  );

  const modes: ClassificationKey[] = Object.keys(
    classificationData
  ) as ClassificationKey[];

  return (
    <div>
      <GroupingSelectForm
        options={groupingMetadata}
        selected={selectedMode}
        onChange={(val) => setSelectedMode(val as ClassificationKey)}
      />

      {(() => {
        const meta = groupingMetadata.find((m) => m.id === selectedMode);
        return meta ? (
          <div className="py-6">
            <DisplayGroupMetadata
              id={meta.id}
              name={meta.name}
              description={meta.description}
            />
          </div>
        ) : null;
      })()}
      <GroupDisplay mode={selectedMode} alphabetData={data} />
    </div>
  );
}
