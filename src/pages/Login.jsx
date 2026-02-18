import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate("/app/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
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
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-xl bg-card/80 backdrop-blur-5xl p-12 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Login to <span className="text-primary">AtheLeanX</span>
        </h2>

        <div className="space-y-6">
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
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-10 py-4 rounded-lg bg-primary text-black text-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-8 text-center text-xl text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
