export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}