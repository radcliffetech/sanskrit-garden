import { Link } from "~/ui/remix";

export function DesktopDropdownMenu({
  label,
  dropdown,
  openDropdown,
  setOpenDropdown,
  idx,
}: {
  label: string;
  dropdown: { label?: string; href?: string; separator?: boolean }[];
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
  idx: number;
}) {
  const dropdownLabel = label || `dropdown-${idx}`;
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => {
          setOpenDropdown(
            openDropdown === dropdownLabel ? null : dropdownLabel
          );
        }}
        className="nav-link inline-flex items-center gap-1"
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <svg
            className="h-4 w-4 text-gray-400 align-middle"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {openDropdown === dropdownLabel && (
        <div className="dropdown-dark absolute z-10 mt-2 w-64 origin-top-left rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {dropdown.map((dropItem, subidx) =>
              dropItem.separator ? (
                <hr key={subidx} className="my-2 border-gray-600" />
              ) : (
                <Link
                  key={subidx}
                  to={dropItem.href || "#"}
                  className="dropdown-link block w-full text-left no-underline"
                  onClick={() => setOpenDropdown(null)}
                >
                  {dropItem.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
