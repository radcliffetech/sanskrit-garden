import groupingMetadata from "~/data/sanskrit-grouping-data.json";

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
          {groupingMetadata.map(({ id, name, translation }) => (
            <option key={id} value={id}>
              {name} ({translation})  
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
