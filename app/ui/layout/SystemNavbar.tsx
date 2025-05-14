import { useEffect, useRef, useState } from "react";

import { DesktopDropdownMenu } from "./DesktopDropdownMenu";
import { Link } from "~/ui/remix";
import { navigationConfig } from "~/core/config/navigation";
import nexusConfig from "~/core/config/nexus.config";

export function SystemNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleGlobalEvents(event: MouseEvent | KeyboardEvent) {
      if (event instanceof MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      } else if (event instanceof KeyboardEvent && event.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleGlobalEvents);
    document.addEventListener("keydown", handleGlobalEvents);
    return () => {
      document.removeEventListener("mousedown", handleGlobalEvents);
      document.removeEventListener("keydown", handleGlobalEvents);
    };
  }, []);

  return (
    <nav className="relative bg-surface-dark text-on-dark px-4 py-3">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-on-dark no-underline">
          {nexusConfig.siteTitle}
        </Link>
        {/* Mobile Hamburger */}
        <button
          className="sm:hidden block text-on-dark focus:outline-none"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div
          className="sm:flex hidden gap-4 sm:gap-6 items-center"
          ref={dropdownRef}
        >
          {navigationConfig.map((item, idx) => {
            if ("dropdown" in item) {
              return (
                <DesktopDropdownMenu
                  key={idx}
                  label={item.label}
                  dropdown={item.dropdown}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  idx={idx}
                />
              );
            } else {
              return (
                <Link key={idx} to={item.href} className="nav-link">
                  {item.label}
                </Link>
              );
            }
          })}
          {/* <AdminOnlyGate>
            <AdminDropdownMenu />
          </AdminOnlyGate> */}
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-overlay-dark"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-surface-dark text-on-dark w-64 h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-light">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-on-dark text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navigationConfig.map((item, idx) =>
                "dropdown" in item ? (
                  <div key={idx}>
                    <span className="font-semibold">{item.label}</span>
                    <div className="ml-2 flex flex-col">
                      {item.dropdown.map((dropItem, subidx) =>
                        dropItem.separator ? (
                          <hr key={subidx} className="my-2 border-divider" />
                        ) : (
                          <Link
                            key={subidx}
                            to={dropItem.href || "#"}
                            className="py-1 px-2 rounded hover:bg-hover-dark active:bg-active-dark transition-colors text-on-dark no-underline"
                            onClick={() => setMobileOpen(false)}
                          >
                            {dropItem.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    to={item.href}
                    className="py-1 px-2 rounded hover:bg-hover-dark active:bg-active-dark transition-colors text-on-dark no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
