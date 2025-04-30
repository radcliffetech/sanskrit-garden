export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="container p-6 mx-auto">{children}</div>
  );
}
