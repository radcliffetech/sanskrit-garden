import { AlphabetGridCompact } from "./AlphabetGridCompact";
import { AlphabetItem } from "~/types";
import DisplayGroupMetadata from "./DisplayGroupMetadata";
import GroupingSelectForm from "./GroupingSelectForm";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";
import { useState } from "react";

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
      <DisplayGroup mode={selectedMode} alphabetData={data} />
    </div>
  );
}

function DisplayGroup({
  mode,
  alphabetData,
}: {
  mode: ClassificationKey;
  alphabetData: AlphabetItem[];
}) {
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(
    null
  );
  const [highlightLevel1, setHighlightLevel1] = useState<Set<string>>(
    new Set()
  );
  const [highlightLevel2, setHighlightLevel2] = useState<Set<string>>(
    new Set()
  );

  const groupData = selectedPrimary
    ? (classificationData.phonetic_classification[
        selectedPrimary as keyof typeof classificationData.phonetic_classification
      ] as Record<string, string[]>)
    : {};

  function handleSetPrimaryGroup(group: string) {
    if (group === selectedPrimary) {
      setSelectedPrimary(null);
      setSelectedSecondary(null);
      setHighlightLevel1(new Set());
      setHighlightLevel2(new Set());
      return;
    }

    setSelectedPrimary(group);
    setSelectedSecondary(null);
    const allChars = Object.values(
      classificationData.phonetic_classification[
        group as keyof typeof classificationData.phonetic_classification
      ] ?? {}
    ).flat();
    setHighlightLevel1(new Set(allChars));
    setHighlightLevel2(new Set());
  }

  function handleSetSubGroup(sub: string) {
    if (sub === selectedSecondary) {
      setSelectedSecondary(null);
      setHighlightLevel2(new Set());
      return;
    }

    setSelectedSecondary(sub);
    setHighlightLevel2(new Set(groupData[sub] ?? []));
  }

  return (
    <>
      <DisplayGroupMetadata id={mode} />
      <div className="mb-10">
        <div className="min-h-[3rem] flex items-center gap-4 mb-0">
          <div className="flex gap-2">
            {Object.keys(classificationData.phonetic_classification).map(
              (group) => (
                <button
                  key={group}
                  onClick={() => handleSetPrimaryGroup(group)}
                  className={`pill-lg border text-sm font-semibold transition ${
                    selectedPrimary === group
                      ? "highlight-1"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
        <div className="min-h-[3rem] max-h-[5rem] overflow-hidden flex items-center gap-4 mb-4">
          <div className="flex gap-2 flex-wrap">
            {selectedPrimary &&
              Object.keys(
                classificationData.phonetic_classification[
                  selectedPrimary as keyof typeof classificationData.phonetic_classification
                ] as Record<string, string[]>
              ).map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSetSubGroup(sub)}
                  className={`pill-lg border text-sm font-semibold transition ${
                    selectedSecondary === sub
                      ? "highlight-2"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {sub
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
          </div>
        </div>
      </div>

      <AlphabetGridCompact
        data={alphabetData}
        highlightLevel1={highlightLevel1}
        highlightLevel2={highlightLevel2}
      />
    </>
  );
}
