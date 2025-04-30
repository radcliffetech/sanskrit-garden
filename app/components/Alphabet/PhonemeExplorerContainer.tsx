import { useEffect, useState } from "react";

// === Imports ===
import { AlphabetItem } from "~/types";
import { AlphabetLayout } from "./AlphabetLayout";
import DisplayGroupMetadata from "./DisplayGroupMetadata";
import { GroupingSelectForm } from "./GroupingSelectForm";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";

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

  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(null);
  const [highlightLevel1, setHighlightLevel1] = useState<Set<string>>(new Set());
  const [highlightLevel2, setHighlightLevel2] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSelectedPrimary(null);
    setSelectedSecondary(null);
    setHighlightLevel1(new Set());
    setHighlightLevel2(new Set());
  }, [selectedMode]);

  const getRenderedMode = () => {
    return (
      <DisplayGroupGeneric
        classification={classificationData[selectedMode]}
        alphabetData={data}
        selectedPrimary={selectedPrimary}
        selectedSecondary={selectedSecondary}
        highlightLevel1={highlightLevel1}
        highlightLevel2={highlightLevel2}
        setSelectedPrimary={setSelectedPrimary}
        setSelectedSecondary={setSelectedSecondary}
        setHighlightLevel1={setHighlightLevel1}
        setHighlightLevel2={setHighlightLevel2}
      />
    );
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
function DisplayGroupGeneric({
  classification,
  alphabetData,
  selectedPrimary,
  selectedSecondary,
  highlightLevel1,
  highlightLevel2,
  setSelectedPrimary,
  setSelectedSecondary,
  setHighlightLevel1,
  setHighlightLevel2,
}: {
  classification: Record<string, string[] | Record<string, string[]>>;
  alphabetData: AlphabetItem[];
  selectedPrimary: string | null;
  selectedSecondary: string | null;
  highlightLevel1: Set<string>;
  highlightLevel2: Set<string>;
  setSelectedPrimary: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSecondary: React.Dispatch<React.SetStateAction<string | null>>;
  setHighlightLevel1: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHighlightLevel2: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const selectedValue = selectedPrimary
    ? classification[selectedPrimary]
    : null;
  const isNested =
    typeof selectedValue === "object" && !Array.isArray(selectedValue);
  const groupData: Record<string, string[]> = isNested
    ? (selectedValue as Record<string, string[]>)
    : {};

  function handleSetPrimaryGroup(key: string, chars: string[]) {
    if (selectedPrimary === key) {
      setSelectedPrimary(null);
      setSelectedSecondary(null);
      setHighlightLevel1(new Set());
      setHighlightLevel2(new Set());
    } else {
      setSelectedPrimary(key);
      setSelectedSecondary(null);
      setHighlightLevel1(new Set(chars));
      setHighlightLevel2(new Set());
    }
  }

  function handleSetSubGroup(key: string, chars: string[]) {
    if (selectedSecondary === key) {
      setSelectedSecondary(null);
      setHighlightLevel2(new Set());
    } else {
      setSelectedSecondary(key);
      setHighlightLevel2(new Set(chars));
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <TreePillControls
        classification={classification}
        selectedPrimary={selectedPrimary}
        selectedSecondary={selectedSecondary}
        onSelectPrimary={handleSetPrimaryGroup}
        onSelectSecondary={handleSetSubGroup}
      />
      <AlphabetLayout
        data={alphabetData}
        highlightLevel1={highlightLevel1}
        highlightLevel2={highlightLevel2}
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(classification).map(([key, value]) => {
            const label = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
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

      {selectedPrimary && isNested(classification[selectedPrimary]) && (
        <div className="flex items-center gap-4">
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
                {subKey
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
