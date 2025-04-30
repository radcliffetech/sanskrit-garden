export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-12">{children}</div>
  );
}
