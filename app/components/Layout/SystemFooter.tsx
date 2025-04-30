export function SystemFooter() {
  return (
    <footer className="text-center text-gray-400 text-xs mt-8 mb-4">
      Sanskrit Garden © {new Date().getFullYear()} - Coded with reverence by{" "}
      <a
        href="http://jeffreyradcliffe.com"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        Jeffrey Radcliffe
      </a>
    </footer>
  );
}
