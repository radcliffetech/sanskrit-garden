import React from "react";
import groupingMetadata from "~/data/sanskrit-grouping-data.json";

interface Props {
  id: string;
}



export default function DisplayGroupMetadata({ id }: Props) {
  const metadata = groupingMetadata.find((group) => group.id === id);

  if (!metadata) return null;

  return (
    <div className="mb-6">
      {/* <h2 className="text-2xl font-semibold text-gray-700">{metadata.name}</h2> */}
      {/* <p className="text-gray-500 mt-1">{metadata.description}</p> */}
    </div>
  );
}