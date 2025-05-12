import { useEffect, useRef, useState } from "react";

import { CogIcon } from "@heroicons/react/24/outline";
import { Link } from "~/ui/remix";

export function AdminDropdownMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        className="block p-2 text-white hover:bg-gray-700 rounded-full"
        title="Admin Panel"
        onClick={() => setOpen(!open)}
      >
        <CogIcon className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-56 right-0 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 no-underline"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
          <div className="border-t border-gray-700"></div>
          <div className="py-1">
            <a
              href="/auth/logout"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 no-underline"
              onClick={() => setOpen(false)}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
