import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Signing up...", { name, email, password });

    try {
      const res = await signup( email, password );
      localStorage.setItem("token", res.access_token);
      navigate("/login"); // or login page
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url(/auth-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-xl bg-card/60 backdrop-blur-5xl p-12 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Create your <span className="text-primary">AtheLeanX</span> account
        </h2>

        <form className="space-y-6" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-lg bg-bg text-white text-xl outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-lg bg-bg text-white text-xl outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-lg bg-bg text-white text-xl outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full mt-10 py-4 rounded-lg bg-primary text-black text-2xl font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-xl text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
