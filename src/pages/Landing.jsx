import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
  <Navbar />

    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Hero image */}
      <img
        src="/hero.jpg"
        alt="Athlete training"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-bg/65" />

      {/* Brand */}
      <div className="absolute top-12 w-full text-center z-10">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-widest text-white">
          Athe<span className="text-primary">LeanX</span>
        </h2>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <h1 className="text-6xl md:text-5xl font-bold text-white">
          Train with <span className="text-primary">Intelligence</span>
        </h1>

        <p className="mt-6 text-3xl text-gray-300">
          AI-powered workout and nutrition planning for serious athletes.
         <span className="text-primary"> GET LEAN, GET STRONG.</span>
        </p>

        <button
  onClick={() => navigate("/login")}
  className="mt-8 px-5 py-5 rounded-md bg-primary text-bg text-xl font-semibold hover:opacity-90 transition"
>
  Get Started
</button>

      </div>
    </div>
    </div>
  );
}
