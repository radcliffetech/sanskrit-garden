import groupingMetadata from "~/data/sanskrit-grouping-data.json";

interface Props {
  options: typeof groupingMetadata;
  selected: string;
  onChange: (value: string) => void;
}

export default function GroupingSelectForm({
  options,
  selected,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 w-full mx-auto text-sm">
      <h2 className="text-xl font-light text-gray-500 whitespace-nowrap">
        Grouping:
      </h2>
      <div>
        <select
          className="appearance-none border border-gray-300 rounded-lg bg-white px-4 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
