import React from "react";

interface Props {
  id: string;
  name: string;
  description: string;
}

export default function DisplayGroupMetadata({ id, name, description }: Props) {
  return (
    <div className="text-center md:text-left mx-auto mb-6">
      <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  );
}