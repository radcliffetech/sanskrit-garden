export function SystemNavbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 mb-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="#" className="text-xl font-semibold">Sanskrit Garden</a>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/about" className="hover:text-gray-300">About</a>
        </div>
      </div>
    </nav>
  );
}