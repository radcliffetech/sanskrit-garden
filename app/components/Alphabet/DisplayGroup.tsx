import { useEffect, useState } from "react";

import { AlphabetGrid } from "./AlphabetGrid";
import { AlphabetItem } from "~/types";
import classificationData from "~/data/sanskrit-phoneme-groupings.json";

function SubgroupCategorySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-2">
        {["vowels", "consonants"].map((group) => (
          <button
            key={group}
            onClick={() => onChange(group)}
            className={`pill-lg border text-sm font-semibold transition ${
              value === group
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

type ClassificationKey = keyof typeof classificationData;

export function DisplayGroup({
  mode,
  alphabetData,
}: {
  mode: ClassificationKey;
  alphabetData: AlphabetItem[];
}) {
  const [topGroup, setTopGroup] = useState<string>("vowels");
  const [subGroup, setSubGroup] = useState<string | null>(null);
  const [highlightedSet, setHighlightedSet] = useState<Set<string>>(new Set());
  const [activeSet, setActiveSet] = useState<Set<string>>(new Set());

  const groupData = classificationData.phonetic_classification[
    topGroup as keyof typeof classificationData.phonetic_classification
  ] as Record<string, string[]>;

  const subGroupOptions = Object.keys(groupData).map((key) => ({
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: key,
  }));
  useEffect(() => {
    const level1Chars = Object.values(groupData).flat();
    setActiveSet(new Set(level1Chars));
  }, [groupData, topGroup]);
  
  useEffect(() => {
    if (!subGroup && subGroupOptions.length > 0) {
      const firstKey = subGroupOptions[0].value;
      setSubGroup(firstKey);
      setHighlightedSet(new Set(groupData[firstKey]));
    }
  }, [subGroup, subGroupOptions, groupData]);

  function handleSetPrimaryGroup(group: string) {
    setTopGroup(group);

    const nextGroup = classificationData.phonetic_classification[
      group as keyof typeof classificationData.phonetic_classification
    ] as Record<string, string[]>;

    const firstSubGroupKey = Object.keys(nextGroup)[0];
    setSubGroup(firstSubGroupKey);
    setHighlightedSet(new Set(nextGroup[firstSubGroupKey] ?? []));
  }

  function handleSetSubGroup(group: string) {
    setSubGroup(group);

    const subChars = groupData[group] ?? [];
    setHighlightedSet(new Set(subChars));
  }

  return (
    <>
      <SubgroupCategorySelect
        value={topGroup}
        onChange={handleSetPrimaryGroup}
      />
      {subGroupOptions.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            {subGroupOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSetSubGroup(option.value)}
                className={`pill-lg border text-sm font-semibold transition ${
                  subGroup === option.value
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <AlphabetGrid
        data={alphabetData}
        highlightLevel1={activeSet}
        highlightLevel2={highlightedSet}
      />
    </>
  );
}

