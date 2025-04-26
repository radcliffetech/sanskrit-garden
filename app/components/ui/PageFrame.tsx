

export function PageFrame({ children }: { children: React.ReactNode })  {
    return (
        <div className="px-4 py-6">
            {children}
        </div>
    );
}