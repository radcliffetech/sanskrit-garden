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
      className="group border rounded-lg shadow-md text-black text-center flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] hover:bg-gray-50 active:bg-gray-100 h-50"
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <img src="/images/sanskrit-card-header.png" alt="Header" className="w-full h-8 object-cover rounded-t-lg opacity-30 group-hover:opacity-100 transition" />
        <div className="px-3 sm:px-4 py-4 sm:py-6 flex-1 flex flex-col items-center justify-center space-y-2 text-center text-sm sm:text-base">
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