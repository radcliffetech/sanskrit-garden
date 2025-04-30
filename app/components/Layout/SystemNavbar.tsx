import { useEffect, useRef, useState } from "react";

import { navigationConfig } from "~/config/navigation";

export function SystemNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleGlobalEvents(event: MouseEvent | KeyboardEvent) {
      if (event instanceof MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <nav className="relative bg-gray-900 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-light">Sanskrit Garden</a>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden block text-white focus:outline-none"
          onClick={() => setMobileOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="sm:flex hidden gap-4 sm:gap-6 items-center" ref={dropdownRef}>
          {navigationConfig.map((item, idx) => {
            if (item.dropdown) {
              return (
                <div key={idx} className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="nav-link flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="py-1">
                        {item.dropdown.map((dropItem, subidx) => (
                          dropItem.separator ? (
                            <hr key={subidx} className="my-2 border-gray-600" />
                          ) : (
                            <a
                              key={subidx}
                              href={dropItem.href}
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                              {dropItem.label}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              );
            }
          })}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileOpen(false)}>
          <div
            className="bg-gray-800 text-white w-64 h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-light">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="text-white text-2xl">&times;</button>
            </div>
            <div className="flex flex-col gap-2">
              {navigationConfig.map((item, idx) => (
                item.dropdown ? (
                  <div key={idx}>
                    <span className="font-semibold">{item.label}</span>
                    <div className="ml-2 flex flex-col">
                      {item.dropdown.map((dropItem, subidx) =>
                        dropItem.separator ? (
                          <hr key={subidx} className="my-2 border-gray-600" />
                        ) : (
                          <a
                            key={subidx}
                            href={dropItem.href}
                            className="py-1 px-2 rounded hover:bg-gray-700 active:bg-gray-600 transition-colors"
                          >
                            {dropItem.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={item.href}
                    className="py-1 px-2 rounded hover:bg-gray-700 active:bg-gray-600 transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}