export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8 mx-auto">{children}</div>
  );
}
