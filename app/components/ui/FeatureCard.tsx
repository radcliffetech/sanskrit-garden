import { Link } from "@remix-run/react";

export function FeatureCard({
  to,
  label,
  description,
  icon,
}: {
  to: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group border rounded-lg shadow-md text-black text-lg text-center flex items-center justify-center transition-all hover:shadow-md active:scale-95 hover:no-underline"
    >
      <div className="w-full flex flex-col items-center">
        <img src="/images/sanskrit-card-header.png" alt="Header" className="w-full h-8 object-cover rounded-t-lg opacity-30 group-hover:opacity-100 transition" />
        <div className="px-4 py-6 flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span>{label}</span>
            {icon}
          </div>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
    </Link>
  );
}