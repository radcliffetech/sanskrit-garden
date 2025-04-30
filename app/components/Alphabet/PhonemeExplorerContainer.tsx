function SubgroupPills({
  groupData,
  selected,
  onSelect,
}: {
  groupData: Record<string, string[]>;
  selected: string | null;
  onSelect: (sub: string) => void;
}) {
  return (
    <div className="min-h-[3rem] max-h-[5rem] flex items-center gap-4 mb-4 transition-opacity duration-300">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(groupData).map((sub) => (
          <button
            key={sub}
            onClick={() => onSelect(sub)}
            className={`pill-lg border text-sm font-semibold transition ${
              selected === sub ? "highlight-2" : "pill-inactive"
            }`}
          >
            {sub.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>
    </div>
  );
}
function FlatPillControls({
  classification,
  selected,
  onSelect,
}: {
  classification: Record<string, string[] | Record<string, string[]>>;
  selected: string | null;
  onSelect: (group: string) => void;
}) {
  return (
    <div className="transition-opacity duration-300 opacity-100">
      <div className="min-h-[3rem] flex items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(classification).map(([group]) => {
            return (
              <button
                key={group}
                onClick={() => onSelect(group === selected ? "" : group)}
                className={`pill-lg border text-sm font-semibold transition ${
                  selected === group ? "highlight-1" : "pill-inactive"
                }`}
              >
                {group
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { AlphabetItem } from "~/types";
import { AlphabetLayout } from "./AlphabetLayout";
import DisplayGroupMetadata from "./DisplayGroupMetadata";
import { GroupingSelectForm } from "./GroupingSelectForm";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";
import { useState } from "react";

// === Type Definitions ===
interface Props {
  data: AlphabetItem[];
}
type ClassificationKey = keyof typeof classificationData;

// === Main Component ===
export default function PhonemeExplorer({ data }: Props) {
  const [selectedMode, setSelectedMode] = useState<ClassificationKey>(
    "phonetic_classification"
  );

  const modes: ClassificationKey[] = Object.keys(
    classificationData
  ) as ClassificationKey[];

  const getRenderedMode = () => {
    switch (selectedMode) {
      case "phonetic_classification":
        return <DisplayGroupPhonetic alphabetData={data} />;
      case "functional_classification":
        return <DisplayGroupFunctional alphabetData={data} />;
      default:
        return <DisplayGroupDefault alphabetData={data} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metadata display for the selected classification mode */}
      <DisplayGroupMetadata id={selectedMode} />

      {/* Selection form to choose classification mode */}
      <GroupingSelectForm
        selected={selectedMode}
        onChange={(value: string) => {
          setSelectedMode(value as ClassificationKey);
        }}
      />

      {/* Render the selected classification view */}
      {getRenderedMode()}
    </div>
  );
}

// === UI: Controls ===
function PhonemeControls({
  selectedPrimary,
  selectedSecondary,
  onSelectPrimary,
  onSelectSecondary,
  classification,
  groupData,
}: {
  selectedPrimary: string | null;
  selectedSecondary: string | null;
  onSelectPrimary: (group: string) => void;
  onSelectSecondary: (sub: string) => void;
  classification?: Record<string, any>;
  groupData?: Record<string, string[]>;
}) {
  if (!classification) return null;

  const groups = classification
    ? Object.keys(classification)
    : Object.keys(classificationData.phonetic_classification);
  return (
    <div
      className={`transition-opacity duration-300 ${
        selectedPrimary === null ? "opacity-50" : "opacity-100"
      } mb-10`}
    >
      <div className="min-h-[3rem] flex items-center gap-4 mb-0">
        <div className="flex gap-2">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => onSelectPrimary(group)}
              className={`pill-lg border text-sm font-semibold transition ${
                selectedPrimary === group
                  ? "highlight-1"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`min-h-[3rem] max-h-[5rem] flex items-center gap-4 mb-4 transition-opacity duration-300 ${
          selectedPrimary ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-2 flex-wrap">
          {selectedPrimary &&
            Object.keys(
              groupData ??
                (classificationData.phonetic_classification[
                  selectedPrimary as keyof typeof classificationData.phonetic_classification
                ] as Record<string, string[]>)
            ).map((sub) => (
              <button
                key={sub}
                onClick={() => onSelectSecondary(sub)}
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
  );
}

// === Group Views ===
function DisplayGroupPhonetic({
  alphabetData,
}: {
  alphabetData: AlphabetItem[];
}) {
  const mode: ClassificationKey = "phonetic_classification";
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
    setHighlightLevel2(new Set((groupData[sub] ?? []) as string[]));
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PhonemeControls
          classification={classificationData.phonetic_classification}
          selectedPrimary={selectedPrimary}
          selectedSecondary={selectedSecondary}
          onSelectPrimary={handleSetPrimaryGroup}
          onSelectSecondary={handleSetSubGroup}
          groupData={groupData}
        />
        <AlphabetLayout
          data={alphabetData}
          highlightLevel1={highlightLevel1}
          highlightLevel2={highlightLevel2}
        />
      </div>
    </>
  );
}

function DisplayGroupFunctional({
  alphabetData,
}: {
  alphabetData: AlphabetItem[];
}) {
  const mode: ClassificationKey = "functional_classification";
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
  const [isNested, setIsNested] = useState(false);

  const classification = classificationData[mode];
  const safeClassification = classification as Record<string, any>;
  let groupData: Record<string, string[]> = {};
  const groupValue = selectedPrimary
    ? safeClassification[selectedPrimary]
    : null;

  if (typeof groupValue === "object" && !Array.isArray(groupValue)) {
    groupData = groupValue as Record<string, string[]>;
  }

  function handleSetPrimaryGroup(group: string) {
    if (group === selectedPrimary) {
      setSelectedPrimary(null);
      setSelectedSecondary(null);
      setHighlightLevel1(new Set());
      setHighlightLevel2(new Set());
      setIsNested(false);
      return;
    }

    setSelectedPrimary(group);
    setSelectedSecondary(null);

    const groupVal = (classification as Record<string, any>)[group];
    const isNowNested =
      typeof groupVal === "object" && !Array.isArray(groupVal);
    setIsNested(isNowNested);

    let allChars: string[] = [];

    if (Array.isArray(groupVal)) {
      allChars = groupVal;
    } else if (isNowNested) {
      allChars = (Object.values(groupVal) as string[][]).flat();
    }

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div>
        <FlatPillControls
          classification={
            classification as Record<
              string,
              string[] | Record<string, string[]>
            >
          }
          selected={selectedPrimary}
          onSelect={handleSetPrimaryGroup}
        />

        {isNested && (
          <SubgroupPills
            groupData={groupData}
            selected={selectedSecondary}
            onSelect={handleSetSubGroup}
          />
        )}
      </div>
      <AlphabetLayout
        data={alphabetData}
        highlightLevel1={highlightLevel1}
        highlightLevel2={highlightLevel2}
      />
    </div>
  );
}

function DisplayGroupDefault({
  alphabetData,
}: {
  alphabetData: AlphabetItem[];
}) {
  const mode: ClassificationKey = "phonetic_classification";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div></div>
      <AlphabetLayout
        data={alphabetData}
        highlightLevel1={new Set<string>()}
        highlightLevel2={new Set<string>()}
      />
    </div>
  );
}
