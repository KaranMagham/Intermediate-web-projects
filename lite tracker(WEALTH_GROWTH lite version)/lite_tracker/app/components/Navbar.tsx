import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="text-xl font-bold text-teal-700">
          Lite Tracker
        </Link>

        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link href="/" className="transition hover:text-teal-700">
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className="rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700"
          >
            Transactions
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
