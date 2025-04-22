import { useState } from "react";

export function SystemNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-semibold">Sanskrit Garden</a>

        <div className="flex space-x-6 items-center">
          <a href="/alphabet" className="hover:text-gray-300">Alphabet</a>
          <a href="/quiz" className="hover:text-gray-300">Quiz</a>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:text-gray-300"
                id="menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Texts
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
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
              </button>
            </div>

            {dropdownOpen && (
              <div
                className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <a
                    href="/texts/ribhu-gita/chapter-26"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Ribhu Gita – Chapter 26
                  </a>
                  <a
                    href="/texts/nirvana-shaktam"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Nirvana Shaktam
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="/articles" className="hover:text-gray-300">Articles</a>
          <a href="/about" className="hover:text-gray-300">About</a>
        </div>
      </div>
    </nav>
  );
}