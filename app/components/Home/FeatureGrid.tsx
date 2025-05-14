import { FeatureCard } from "./FeatureCard";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

type Feature = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  description: string;
  category: "learning" | "ai" | "explore";
};

const features: Feature[] = [
  {
    to: "/learn/phonetic-groupings",
    label: "Phonetic Groupings",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description:
      "Explore the phonetic structure of Sanskrit through various categorical lenses.",
    category: "explore",
  },
  {
    to: "/learn/nouns",
    label: "Nouns",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Explore the concept of śabda (word) in Sanskrit.",
    category: "learning",
  },
  {
    to: "/learn/verbs",
    label: "Verbs",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Explore the concept of śabda (word) in Sanskrit.",
    category: "learning",
  },
  {
    to: "/learn/alphabet",
    label: "Sanskrit Alphabet",
    description: "Learn the basics of the Sanskrit alphabet.",
    category: "learning",
  },
  {
    to: "/learn/quiz",
    label: "Quiz Yourself",
    description: "Test your knowledge of Sanskrit (and this site).",
    category: "learning",
  },
  {
    to: "/gen/storyteller",
    label: "AI Storyteller",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Generate stories based on your input.",
    category: "ai",
  },
  {
    to: "/gen/explain-concept",
    label: "AI Explainer",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Get explanations of Sanskrit concepts.",
    category: "ai",
  },
  {
    to: "/learn/dhatu-tree",
    label: "Dhatu Evolution",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Explore the evolution of dhatus (roots) in Sanskrit.",
    category: "explore",
  },
  {
    to: "/learn/dhatu-categories",
    label: "Dhatu Categories",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Explore the categories of verbs in Sanskrit.",
    category: "explore",
  },
  {
    to: "/texts",
    label: "Sanskrit Texts",
    icon: <StarIcon className="h-6 w-6 text-highlight" />,
    description: "Explore a selection of Sanskrit texts.",
    category: "explore",
  },
  {
    to: "/articles",
    label: "Sanskrit Articles",
    description: "Explore articles on various Sanskrit topics.",
    category: "explore",
  },
];

type FeatureGridProps = {
  category: "learning" | "ai" | "explore";
};

export function FeatureGrid({ category }: FeatureGridProps) {
  const filtered = features.filter((f) => f.category === category);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {filtered.map((feature) => (
        <FeatureCard
          key={feature.to}
          to={feature.to}
          label={feature.label}
          icon={feature.icon}
          description={feature.description}
        />
      ))}
    </div>
  );
}
