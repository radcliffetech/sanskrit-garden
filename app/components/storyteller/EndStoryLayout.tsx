import React from "react";

export function EndStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose max-w-none mb-8 prose-p:mb-6 text-center">
      {children}
    </div>
  );
}