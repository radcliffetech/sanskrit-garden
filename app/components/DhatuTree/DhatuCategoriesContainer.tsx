import { ClassPieChart } from "./ClassPieChart";
import type { DhatuCatalogEntry } from "~/types";
import { FadeIn } from "~/ui/core/FadeIn";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { isFiltered } from "~/utils/dhatuFilters";
import { useState } from "react";

const dhatuCardOther = `w-20 h-20 rounded border shadow-sm transition cursor-pointer flex items-center justify-center hover:highlight-1 active:scale-95 bg-white hover:shadow-md`;
const dhatuRootDefault = "text-lg";
const dhatuGrid =
  "grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-1 justify-center";

const classGrammar: Record<number, string> = {
  1: "(bhvādi) – root + a",
  2: "(adādi) – root only",
  3: "(juhotyādi) – reduplicated root",
  4: "(divādi) – root + ya",
  5: "(svādi) – root + nu",
  6: "(tudādi) – unchanged root",
  7: "(rudhādi) – root + n",
  8: "(tanādi) – root + o",
  9: "(kryādi) – root + nī",
  10: "(curādi) – root + ay",
};

const classThemes: Record<number, string> = {
  1: "Very common verbs: motion, being, action",
  2: "Basic actions like eating, knowing",
  3: "Sensory/perceptual (see, hear, give)",
  4: "Mostly intransitive: light, air, motion",
  5: "Emotion and internal state (suffer, rejoice)",
  6: "Sharp/direct action (strike, push)",
  7: "Obstruction, resistance, closure",
  8: "Expansion, stretching, continuity",
  9: "Commerce, intention, manipulation",
  10: "Causative-like, broadly productive",
};

// ───────────────────────────────────────────────────────────
// Dhatu Catalog Modal
// ───────────────────────────────────────────────────────────

function DhatuCatalogModal({
  selected,
  onClose,
}: {
  selected: DhatuCatalogEntry;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-8 rounded shadow-lg w-100 space-y-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl font-bold">{selected.root}</div>
        <div className="text-sm text-gray-500 italic">
          {selected.transliteration}
        </div>
        <div className="text-xs text-gray-400">
          Class {selected.class} • Voice: {selected.voice} •{" "}
          {selected.transitivity}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Dhatu Catalog Filter Panel
// ───────────────────────────────────────────────────────────

function DhatuCatalogFilterPanel({
  filters,
  setFilters,
}: {
  filters: {
    class: number | null;
    voice: "P" | "A" | "U" | null;
    transitivity: "transitive" | "intransitive" | "both" | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
}) {
  const filterIndex = `${filters.class}-${filters.voice}-${filters.transitivity}`;
  return (
    <div className="space-y-4 min-h-[12rem]">
      <div>
        <div className="flex items-start gap-2 mb-2">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Class
            <span
              data-tooltip-id="dhatu-filter-tooltip"
              data-tooltip-content="Paninian verb class (gaṇa)"
              className="text-gray-400 cursor-pointer"
            >
              <InformationCircleIcon className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
            <button
              key={c}
              className={`pill-lg ${
                filters.class === c ? "highlight-1" : "pill-inactive"
              }`}
              onClick={() =>
                setFilters((f) => ({ ...f, class: f.class === c ? null : c }))
              }
            >
              {c}
            </button>
          ))}
        </div>

        {filters.class && (
          <FadeIn key={filterIndex}>
            <div className="space-y-3 mt-5">
              <p className="text-xl3 font-semibold">
                {classGrammar[filters.class]}
              </p>
              <p className="text-xl2 text-gray-500">
                {classThemes[filters.class]}
              </p>
            </div>
          </FadeIn>
        )}
      </div>
      <Tooltip id="dhatu-filter-tooltip" place="right" />
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Dhatu Grid All
// ───────────────────────────────────────────────────────────

function DhatuGridAll({
  entries,
  setSelected,
  selected,
}: {
  entries: DhatuCatalogEntry[];
  setSelected: (entry: DhatuCatalogEntry) => void;
  selected?: DhatuCatalogEntry | null;
}) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        Dhātus ({entries.length.toLocaleString("en-IN")})
      </h3>
      <div className={dhatuGrid}>
        {entries.map((dhatu, i) => (
          <div
            key={`${dhatu.root}-${dhatu.class}-all-${i}`}
            onClick={() => setSelected(dhatu)}
            className={
              dhatuCardOther +
              (selected?.root === dhatu.root
                ? " highlight-1 ring-1 ring-purple-400"
                : "")
            }
          >
            <div className={dhatuRootDefault}>{dhatu.root}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Dhatu Grid Filtered
// ───────────────────────────────────────────────────────────

function DhatuGridFiltered({
  filtered,
  setSelected,
  selected,
}: {
  filtered: DhatuCatalogEntry[];
  setSelected: (entry: DhatuCatalogEntry) => void;
  selected?: DhatuCatalogEntry | null;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        Dhātus ({filtered.length.toLocaleString("en-IN")})
      </h3>
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 italic mt-6">
          No dhātus match the selected filters.
        </div>
      )}
      <div className={dhatuGrid}>
        {filtered.map((dhatu, i) => (
          <div
            key={`${dhatu.root}-${dhatu.class}-match-${i}`}
            onClick={() => setSelected(dhatu)}
            className={
              dhatuCardOther +
              (selected?.root === dhatu.root
                ? " highlight-1 ring-1 ring-purple-400"
                : "")
            }
          >
            <div className={dhatuRootDefault}>{dhatu.root}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Dhatu Catalog Container (Main Export)
// ───────────────────────────────────────────────────────────

export function DhatuCatalogContainer({
  entries,
}: {
  entries: DhatuCatalogEntry[];
}) {
  const [selected, setSelected] = useState<DhatuCatalogEntry | null>(null);
  const [filters, setFilters] = useState<{
    class: number | null;
    voice: "P" | "A" | "U" | null;
    transitivity: "transitive" | "intransitive" | "both" | null;
  }>({
    class: null,
    voice: null,
    transitivity: null,
  });

  const filtered = entries.filter((entry) => isFiltered(entry, filters));

  const hasFilters = !!(filters.class || filters.voice || filters.transitivity);

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between max-w-screen-xl mx-auto gap-8">
        <div className="md:w-1/2 text-gray-500 space-y-4">
          <p className="text-xs text-red-500 font-medium uppercase tracking-wide">
            ⚠️ This feature is in alpha. Not all dhātus are complete or fully
            verified.
          </p>
          <p>
            Traditionally, dhātus are classified into 10 classes (gaṇas) based
            on their phonetic and morphological properties.
          </p>
          <p>
            The class of a dhātu can affect its conjugation and usage in
            sentences.
          </p>
        </div>
        <div className="md:w-1/2 h-48">
          <ClassPieChart
            entries={entries}
            selectedClass={filters.class}
            setClassFilter={(c) =>
              setFilters((f) => ({
                ...f,
                class: f.class === c ? null : c,
              }))
            }
          />
        </div>
      </div>

      <DhatuCatalogFilterPanel filters={filters} setFilters={setFilters} />

      {!hasFilters ? (
        <FadeIn key="all">
          <DhatuGridAll
            entries={entries}
            setSelected={setSelected}
            selected={selected}
          />
        </FadeIn>
      ) : (
        <FadeIn key="filtered">
          <DhatuGridFiltered
            filtered={filtered}
            setSelected={setSelected}
            selected={selected}
          />
        </FadeIn>
      )}

      {selected && (
        <DhatuCatalogModal
          selected={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
