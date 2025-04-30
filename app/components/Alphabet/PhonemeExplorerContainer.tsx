// === Imports ===
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

  const modes: ClassificationKey[] = [
    "phonetic_classification",
    "tattva_evolution_classification",
  ];

  const getRenderedMode = () => {
    switch (selectedMode) {
      case "phonetic_classification":
        return <DisplayGroupPhonetic alphabetData={data} />;
      case "tattva_evolution_classification":
        return <DisplayGroupTattvaEvolution alphabetData={data} />;
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

// === Display Groups ===
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
        <NestedPillControls
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

// === Group View: Tattva Evolution ===
function DisplayGroupTattvaEvolution({
  alphabetData,
}: {
  alphabetData: AlphabetItem[];
}) {
  const mode: ClassificationKey = "tattva_evolution_classification";
  const classification = classificationData[mode] as Record<string, string[]>;
  const [selected, setSelected] = useState<string | null>(null);
  const [highlightLevel1, setHighlightLevel1] = useState<Set<string>>(new Set());

  function handleSelect(group: string) {
    if (group === selected) {
      setSelected(null);
      setHighlightLevel1(new Set());
    } else {
      setSelected(group);
      setHighlightLevel1(new Set(classification[group]));
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <FlatPillControls
        classification={classification}
        selected={selected}
        onSelect={handleSelect}
      />
      <AlphabetLayout
        data={alphabetData}
        highlightLevel1={highlightLevel1}
        highlightLevel2={new Set<string>()}
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

// === UI Controls ===
// === Reusable TreePillControls ===
function TreePillControls({
  classification,
  selectedPrimary,
  selectedSecondary,
  onSelectPrimary,
  onSelectSecondary,
}: {
  classification: Record<string, string[] | Record<string, string[]>>;
  selectedPrimary: string | null;
  selectedSecondary: string | null;
  onSelectPrimary: (key: string, chars: string[]) => void;
  onSelectSecondary: (key: string, chars: string[]) => void;
}) {
  const isNested = (val: any): val is Record<string, string[]> =>
    typeof val === "object" && !Array.isArray(val);

  return (
    <div className="space-y-6">
      <div className="min-h-[3rem] flex items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(classification).map(([key, value]) => {
            const label = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            const selected = selectedPrimary === key;
            return (
              <button
                key={key}
                onClick={() =>
                  onSelectPrimary(
                    key,
                    Array.isArray(value) ? value : Object.values(value).flat()
                  )
                }
                className={`pill-lg border text-sm font-semibold transition ${
                  selected ? "highlight-1" : "pill-inactive"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {selectedPrimary &&
        isNested(classification[selectedPrimary]) && (
          <div className="min-h-[3rem] flex items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {Object.entries(
                classification[selectedPrimary] as Record<string, string[]>
              ).map(([subKey, chars]) => (
                <button
                  key={subKey}
                  onClick={() => onSelectSecondary(subKey, chars)}
                  className={`pill-lg border text-sm font-semibold transition ${
                    selectedSecondary === subKey ? "highlight-2" : "pill-inactive"
                  }`}
                >
                  {subKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        )}
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

function NestedPillControls({
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
