import classificationData from "~/data/sanskrit-phoneme-groupings.json";

const allowedModes = ["phonetic_classification", "functional_classification"];
const classificationKeys = Object.keys(classificationData).filter((key) =>
  allowedModes.includes(key)
);
// const classificationKeys = Object.keys(classificationData)


interface Props {
  selected: string;
  onChange: (value: string) => void;
}

export function GroupingSelectForm({ selected, onChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 w-full mx-auto text-sm">
      <div>
        <select
          className="appearance-none border border-gray-300 rounded-lg bg-white px-4 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {classificationKeys.map((key) => (
            <option key={key} value={key}>
              {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
