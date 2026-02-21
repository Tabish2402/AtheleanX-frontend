import { Outlet, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Dumbbell,
  Utensils,
} from "lucide-react";
import { useState } from "react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex text-white relative overflow-hidden bg-bg">

      {/* Background layers (unchanged) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:26px_26px] opacity-30 pointer-events-none" />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20
                      flex items-center justify-between px-5 py-4
                      bg-bg/90 backdrop-blur border-b border-white/10">
        <h1 className="text-xl font-bold">
          Athe<span className="text-primary">LeanX</span>
        </h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 w-72 h-full flex flex-col
          bg-bg transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex`}
      >
        {/* Scrollable sidebar content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">

          {/* Close button (mobile only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden mb-6 text-white/70 text-xl self-end"
          >
            ✕
          </button>

          {/* Logo */}
          <Link to="/" className="mb-8">
            <h1 className="text-5xl font-bold">
              Athe<span className="text-primary">LeanX</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col gap-10">
            {[
              { name: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
              { name: "AI Coach", to: "/app/coach", icon: Bot },
              { name: "Workout Plan", to: "/app/workout", icon: Dumbbell },
              { name: "Diet Plan", to: "/app/diet", icon: Utensils },
            ].map(({ name, to, icon: Icon }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-7 px-8 py-11 rounded-xl transition-all duration-300
                   ${
                     isActive
                       ? "bg-white/20 text-white shadow-lg shadow-primary/10"
                       : "text-white/80 hover:bg-white/10 hover:translate-x-1 hover:shadow-md"
                   }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={22} />
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Focus card */}
          <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm uppercase tracking-wide text-white/60 mb-2">
              Today’s focus
            </p>
            <p className="text-lg font-semibold">
              Show up. Do the work. Repeat.
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
             localStorage.removeItem("token");

              window.location.href = "/login";
            }}
            className="mt-6 w-full px-5 py-4 rounded-xl text-2xl
                       text-red-400 bg-red-500/10 hover:bg-red-500/20 transition"
          >
            Logout
          </button>

        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      {/* Main content */}
      <main
        className="relative z-10 flex-1 p-6 md:p-8
                   bg-bg/10 overflow-y-auto
                   pt-20 md:pt-8"
      >
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
