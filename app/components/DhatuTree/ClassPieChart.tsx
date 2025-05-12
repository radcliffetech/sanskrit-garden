import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import type { DhatuCatalogEntry } from "~/types";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function ClassPieChart({
  entries,
  selectedClass,
  setClassFilter
}: {
  entries: DhatuCatalogEntry[];
  selectedClass: number | null;
  setClassFilter: (c: number | null) => void;
}) {
  const counts = Array(10).fill(0);
  entries.forEach(e => {
    if (e.class >= 1 && e.class <= 10) counts[e.class - 1]++;
  });

  const data = {
    labels: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#ede9fe", // lightest
          "#ddd6fe",
          "#c4b5fd",
          "#a78bfa", // base: purple-500
          "#8b5cf6",
          "#7c3aed",
          "#6d28d9",
          "#5b21b6",
          "#4c1d95",
          "#3b0764"  // darkest accent
        ],
        offset: counts.map((_, i) => (i + 1 === selectedClass ? 15 : 0)),
      }
    ]
  };

  // Chart options: disable legend, show count values in tooltip, show datalabels, add onClick handler
  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      },
      datalabels: {
        color: (context: any) => {
          const index = context.dataIndex;
          // Use white only for darkest 8 slices (indices 2 to 9), black otherwise
          // Actually, per new instruction: white for last 8 indices (indices 2..9), black for 0,1
          // But also: "unless the slice index is one of the darkest 8 shades (last 8 indices in the color array)"
          return index >= 5 ? "#fff" : "#111";
        },
        font: {
          weight: "bold" as const,
          size: 12
        },
        formatter: (value: number, context: any) =>
          value >= 50 ? String(context.dataIndex + 1) : "",
      }
    },
    onClick: (evt: any, elements: any[], chart: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setClassFilter(index + 1);
      }
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}