import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bootText, setBootText] = useState([]);

  const navigate = useNavigate();

  // Efek Terminal Booting
  useEffect(() => {
    const lines = ["> INITIALIZING_AUTH_PROTOCOL...", "> LOADING_ENCRYPTION_KEYS...", "> SECURE_CONNECTION_ESTABLISHED", "> WAITING_FOR_ADMIN_CREDENTIALS..."];
    lines.forEach((line, i) => {
      setTimeout(() => {
        setBootText((prev) => [...prev, line]);
      }, i * 400);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        setShowSuccess(true);
        // Delay bentar biar user liat popup berhasilnya yang kece
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError(">> ACCESS_DENIED: INVALID_IDENTITY_DETECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center font-mono p-4 overflow-hidden relative">
      {/* Animasi Background Scanline & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10 animate-[scan_3s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
      </div>

      <style>{`
                @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
                @keyframes glitch-p { 
                    0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 
                    40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 
                    80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } 
                }
                .glitch-box { animation: glitch-p 0.2s ease-in-out infinite; }
            `}</style>

      {/* Box Login Utama */}
      <div className="max-w-md w-full border border-emerald-500/30 bg-black/80 backdrop-blur-md p-8 relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500"></div>

        {/* Header Terminal */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <h2 className="text-white text-2xl font-black italic tracking-tighter uppercase italic">
            AUTH<span className="text-emerald-500">_PORTAL</span>
          </h2>
          <div className="mt-4 space-y-1">
            {bootText.map((txt, i) => (
              <p key={i} className="text-[10px] text-emerald-500/70">
                {txt}
              </p>
            ))}
          </div>
        </div>

        {error && <div className="mb-6 p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-xs animate-pulse">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] text-emerald-500 uppercase font-black mb-2 tracking-widest">Admin_Identity</label>
            <input
              type="email"
              className="w-full bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-900/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL_ADDRESS"
              required
            />
          </div>

          <div className="group">
            <label className="block text-[10px] text-emerald-500 uppercase font-black mb-2 tracking-widest">Security_Key</label>
            <input
              type="password"
              className="w-full bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-900/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${loading ? "bg-emerald-900 text-emerald-500" : "bg-emerald-500 text-black hover:bg-white hover:-translate-y-1"}`}
          >
            <span className="relative z-10">{loading ? "AUTH_IN_PROGRESS..." : "EXECUTE_LOGIN()"}</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
          </button>
        </form>
      </div>

      {/* Popup Berhasil (Success Modal) */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="glitch-box border-4 border-emerald-500 bg-black p-10 text-center shadow-[0_0_100px_rgba(16,185,129,0.4)]">
            <h3 className="text-4xl font-black text-emerald-500 italic mb-4 tracking-tighter">ACCESS_GRANTED</h3>
            <div className="w-full h-1 bg-emerald-900 mb-4">
              <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out]"></div>
            </div>
            <p className="text-white text-xs tracking-[0.5em] uppercase animate-pulse">Redirecting to Secure Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
