import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Bot,
} from "lucide-react";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-[#0E1628] text-white">
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0B1220] border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold mb-12">
          Athe<span className="text-primary">LeanX</span>
        </h1>

        <nav className="flex flex-col gap-3">
          {[
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "AI Coach", icon: Bot },
            { name: "Workout Plan", icon: Dumbbell },
            { name: "Diet Plan", icon: Utensils },
          ].map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition"
            >
              <Icon size={20} />
              <span className="text-lg">{name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-[#365492]">
        <Outlet />
      </main>
    </div>
  );
}
