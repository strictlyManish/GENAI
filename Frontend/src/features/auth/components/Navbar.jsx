import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const auth = useAuth(); // get context safely
  const user = auth?.user;
  const handleLogout = auth?.handleLogout;

  const logout = () => {
    if (handleLogout) {
      handleLogout();
    }
  };

  return (
    <div className="text-sm text-white w-full fixed top-0 z-50">
      <nav className="relative h-17.5 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-transparent backdrop-blur-3xl text-gray-100 transition-all shadow-lg border-b border-white/5">
        {/* Logo */}
        <a href="/home" className="text-lg font-bold tracking-tighter">
          GUIDANCE <span className="text-pink-500">AI</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <a href="/home" className="hover:text-pink-500 transition-colors">
              Home
            </a>
          </li>

          <li>
            <a href="/resume" className="hover:text-pink-500 transition-colors">
              AI Resume
            </a>
          </li>
          {user ? (
            <>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-pink-500 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/interview"
                  className="hover:text-pink-500 transition-colors"
                >
                  Mock Interview
                </a>
              </li>
            </>
          ) : null}
        </ul>

        {/* CTA Button */}
        <button
          onClick={logout}
          className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 cursor-pointer px-8 py-2.5 rounded-full active:scale-95 transition-all font-medium"
        >
          {user ? "Logout" : <a href="/register">Get start</a>}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="menu-btn"
          type="button"
          className="inline-block md:hidden active:scale-90 transition text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-[70px] left-0 w-full bg-[#0f0e0e]/95 backdrop-blur-2xl p-8 border-b border-white/10 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          } md:hidden`}
        >
          <ul className="flex flex-col space-y-6">
            <li>
              <a href="/home" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/interview" onClick={() => setIsMenuOpen(false)}>
                Mock Interview
              </a>
            </li>
            <li>
              <a href="/resume" onClick={() => setIsMenuOpen(false)}>
                AI Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
