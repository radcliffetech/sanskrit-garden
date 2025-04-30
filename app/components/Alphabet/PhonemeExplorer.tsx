import React, { useState } from "react";

import { AlphabetItem } from "~/types";
import DisplayGroupMetadata from "./DisplayGroupMetadata";
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
      <div className="py-6">
        <GroupDisplay mode={selectedMode} />
      </div>
    </div>
  );
}

function GroupDisplay({ mode }: { mode: ClassificationKey }) {
  const group = classificationData[mode];

  //   const renderGroup = (entry: any): React.ReactNode => {
  //     if (Array.isArray(entry)) {
  //       return <div>{entry.join(' ')}</div>;
  //     } else if (typeof entry === 'object') {
  //       return (
  //         <div style={{ paddingLeft: '1rem' }}>
  //           {Object.entries(entry).map(([subKey, subVal]) => (
  //             <div key={subKey} className="mb-6">
  //               <h4 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-2">
  //                 {subKey.replace(/_/g, ' ')}
  //               </h4>
  //               {renderGroup(subVal)}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     } else {
  //       return <div>{String(entry)}</div>;
  //     }
  //   };

  return (
    <div>
      COMING SOON!
      {/* <h3>{mode.replace(/_/g, ' ')}</h3>
      {renderGroup(group)} */}
    </div>
  );
}
