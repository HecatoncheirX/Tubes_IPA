import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code = "404", message = "PAGE_NOT_FOUND" }) => {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);

  // Efek flicker/glitch otomatis tiap beberapa detik
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center font-mono p-4 overflow-hidden relative text-emerald-500">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500/10 animate-[scan_2s_linear_infinite]"></div>
      </div>

      <style>{`
                @keyframes scan { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
                @keyframes noise {
                    0% { clip-path: inset(40% 0 61% 0); }
                    20% { clip-path: inset(92% 0 1% 0); }
                    40% { clip-path: inset(43% 0 1% 0); }
                    60% { clip-path: inset(25% 0 58% 0); }
                    80% { clip-path: inset(54% 0 7% 0); }
                    100% { clip-path: inset(58% 0 43% 0); }
                }
                .animate-noise { animation: noise 0.2s infinite linear alternate-reverse; }
            `}</style>

      <div className={`relative z-10 text-center ${glitch ? "skew-x-12 opacity-80" : ""}`}>
        {/* Error Code Big Display */}
        <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter italic text-transparent" style={{ WebkitTextStroke: "2px #10b981" }}>
          {code}
        </h1>

        {/* Overlay Text Glitch */}
        {glitch && <h1 className="absolute inset-0 text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter italic text-red-500 opacity-50 animate-noise">{code}</h1>}

        <div className="mt-8 space-y-4">
          <p className="text-xl md:text-2xl font-bold uppercase tracking-[0.5em] animate-pulse">[ FATAL_SYSTEM_ERROR ]</p>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-2 inline-block">
            <span className="text-white">STATUS:</span> {message}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <p className="max-w-md mx-auto text-xs text-gray-500 uppercase leading-relaxed">Koneksi terputus atau enkripsi tidak dikenali. Protokol keamanan telah memblokir akses ke sektor ini.</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate("/")} className="px-8 py-4 bg-emerald-500 text-black font-black uppercase text-xs tracking-widest hover:bg-white hover:-translate-y-1 transition-all shadow-[8px_8px_0px_0px_rgba(16,185,129,0.3)]">
              RETURN_TO_HOME
            </button>
            <button onClick={() => window.location.reload()} className="px-8 py-4 border-2 border-emerald-500 text-emerald-500 font-black uppercase text-xs tracking-widest hover:bg-emerald-500/10 transition-all">
              REBOOT_SYSTEM()
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Log Footer */}
      <div className="absolute bottom-8 left-8 text-[10px] opacity-30 hidden md:block">
        <p>LOCATION: {window.location.pathname}</p>
        <p>TIMESTAMP: {new Date().toISOString()}</p>
        <p>REASON: {code === "404" ? "OBJECT_NOT_FOUND" : "INTERNAL_SERVER_CRASH"}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
