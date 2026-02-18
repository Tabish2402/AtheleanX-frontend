import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl md:text-4xl font-bold tracking-wide text-white"
        >
          Athe<span className="text-primary">LeanX</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="px-5 py-3 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-3 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile placeholder (future hamburger) */}
        <div className="md:hidden text-white text-sm">
          Menu
        </div>
      </nav>
    </header>
  );
}
