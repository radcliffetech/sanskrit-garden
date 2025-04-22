export function SystemNavbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 mb-2">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="/" className="text-xl font-semibold">Sanskrit Garden</a>
        <div className="flex space-x-4">
          <a href="/alphabet" className="text-white hover:text-gray-300">Alphabet</a>
          <a href="/quiz" className="text-white hover:text-gray-300">Quiz</a>
          <a href="/articles" className="text-white hover:text-gray-300">Articles</a>
          <a href="/about" className="text-white hover:text-gray-300">About</a>
        </div>
      </div>
    </nav>
  );
}