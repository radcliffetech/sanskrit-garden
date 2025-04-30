
export function FadeIn({ children }: { children: React.ReactNode }) {
    return (
      <div className="animate-softFadeIn">
        {children}
      </div>
    );
  }