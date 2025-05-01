export function FadeIn({
  children,
  variant = "default"
}: {
  children: React.ReactNode;
  variant?: "default" | "still";
}) {
  const className =
    variant === "still" ? "animate-fade-in-still" : "animate-fade-in";

  return <div className={className}>{children}</div>;
}