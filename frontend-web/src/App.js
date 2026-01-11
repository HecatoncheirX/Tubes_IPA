import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";

// --- INI KOMPONEN LANDING PAGE (DESAIN ASLI LU YANG GOKIL) ---
const LandingPage = () => {
  const [text, setText] = useState("");
  const fullText = "system_init --client='Kalyn Academy' --v=2026.gacor";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(intervalId);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: ">> ENCRYPTING_DATA..." });
    try {
      const response = await fetch("http://localhost:8082/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: "-" }),
      });
      if (response.ok) {
        setStatus({ type: "success", msg: ">> DONE: DATA_TRANSMITTED!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", msg: ">> ERROR: UPLINK_REJECTED." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: ">> FATAL: SERVER_OFFLINE." });
    }
  };

  return (
    <div className="bg-[#05070a] text-gray-400 min-h-screen font-mono selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* CSS KHUSUS ANIMASI - SEMUA GUA BALIKIN */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        .glitch:hover { text-shadow: 2px 0 #10b981, -2px 0 #ff00c1; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); } 50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3); } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .scan-line { position: absolute; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #10b981, transparent); animation: scan 3s linear infinite; }
      `}</style>

      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#05070a]/95 backdrop-blur-xl border-b border-emerald-500/20 px-8 py-5 flex justify-between items-center shadow-lg shadow-emerald-500/5">
        <div className="text-white font-black text-2xl tracking-tighter italic glitch cursor-pointer relative group">
          KALYN<span className="text-emerald-500 underline decoration-white underline-offset-4">ACADEMY</span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-500"></div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] items-center">
          <a href="#about" className="hover:text-emerald-500 transition-all relative group">
            /About
          </a>
          <a href="#layanan" className="hover:text-emerald-500 transition-all relative group">
            /Services
          </a>
          <a href="#program" className="hover:text-emerald-500 transition-all relative group">
            /Programs
          </a>
          <a href="#contact" className="bg-emerald-500 text-black px-6 py-2 font-black hover:skew-x-6 transition-all hover:shadow-lg hover:shadow-emerald-500/50 relative overflow-hidden group">
            <span className="relative z-10">EXEC_CONTACT</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-64 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-40 w-full h-[400px] bg-emerald-500/10 blur-[150px] rounded-full -z-10 float-animation"></div>
        <div className="text-emerald-500 font-bold text-xs tracking-[0.5em] mb-6 animate-pulse pulse-glow px-4 py-2 border border-emerald-500/30 bg-emerald-500/5">[ INITIATING_ACADEMIC_REVOLUTION ]</div>
        <h1 className="relative text-6xl md:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase mb-12 italic hover:scale-105 transition-transform duration-500">
          BEYOND <br />
          <span className="text-transparent relative inline-block" style={{ WebkitTextStroke: "2px #10b981" }}>
            LIMITS
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent scan-line"></div>
          </span>
        </h1>
        <div className="bg-gradient-to-r from-white/5 to-white/10 border-l-4 border-emerald-500 px-6 py-3 font-bold text-sm mb-12 relative overflow-hidden group">
          <span className="relative">
            kalyn@academy:~$ <span className="text-white">{text}</span>
            <span className="animate-pulse">_</span>
          </span>
        </div>
        <p className="max-w-xl text-gray-500 text-lg mb-12 uppercase font-black tracking-tight leading-tight">Penyelenggara event akademik paling tech-noir di Indonesia.Kalyn Adalah Rektor yg Kultivator</p>
        <div className="flex gap-4">
          <div className="px-8 py-4 bg-emerald-500 text-black font-black uppercase text-xs hover:-translate-y-2 transition-all cursor-pointer">Explore Now →</div>
          <div className="px-8 py-4 border-2 border-emerald-500 text-emerald-500 font-black uppercase text-xs hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">Watch Showreel</div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative py-32 px-6 bg-gradient-to-b from-white/[0.01] to-transparent border-y border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-20 uppercase italic tracking-tighter border-b-4 border-emerald-500 inline-block hover:skew-x-3 transition-transform">System_Profiles.log</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="group relative">
                <h3 className="text-emerald-500 font-black mb-4 tracking-widest text-xs">// VISI_&_MISI</h3>
                <p className="text-sm border-l-2 border-white/20 pl-6 group-hover:border-emerald-500 transition-all leading-relaxed">Menjadi katalisator utama pendidikan tinggi melalui integrasi teknologi manajemen event.</p>
              </div>
              <div className="group relative">
                <h3 className="text-emerald-500 font-black mb-4 tracking-widest text-xs">// THE_CREW</h3>
                <p className="text-sm border-l-2 border-white/20 pl-6 group-hover:border-emerald-500 transition-all leading-relaxed">Kombinasi antara Akademisi senior, Software Engineer, dan Creative Strategist.</p>
              </div>
            </div>
            <div className="relative bg-emerald-500 p-10 flex flex-col justify-center transform hover:scale-105 transition-all duration-500 group cursor-pointer">
              <h3 className="text-black font-black mb-4 text-xs uppercase tracking-widest underline underline-offset-4">Sejarah & Latar Belakang</h3>
              <p className="text-black font-bold text-lg leading-tight italic">"Kalyn Academy lahir dari keresahan akan kaku-nya event akademik konvensional. Sejak 2020, kami telah mendisrupsi cara kampus merayakan ilmu pengetahuan."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN SECTION */}
      <section id="layanan" className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-20 uppercase tracking-tighter text-right italic">./Services_Pricing</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "SEMINAR & WEBINAR", d: "High-end tech production & global reach.", p: "Mulai 5jt", i: "⚡" },
            { t: "WORKSHOP / PELATIHAN", d: "Hands-on curriculum & certification.", p: "Mulai 8jt", i: "🛠️" },
            { t: "TALKSHOW KAMPUS", d: "Inspiring VIP guests & media coverage.", p: "Mulai 7jt", i: "🎤" },
            { t: "BOOTCAMP EDUKASI", d: "Intensive 4-week career acceleration.", p: "Mulai 12jt", i: "🚀" },
          ].map((item, i) => (
            <div key={i} className="group p-8 border border-white/5 bg-[#0a0c10] hover:bg-emerald-500 transition-all duration-700 cursor-crosshair relative overflow-hidden hover:-translate-y-4">
              <div className="text-4xl mb-6 group-hover:invert transition-all">{item.i}</div>
              <h3 className="text-xl font-black text-white group-hover:text-black mb-4 uppercase">{item.t}</h3>
              <p className="text-xs text-gray-500 group-hover:text-black/70 mb-8">{item.d}</p>
              <div className="text-emerald-500 group-hover:text-black font-black text-sm border-t border-white/10 pt-4 uppercase">{item.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROGRAM SECTION */}
      <section id="program" className="relative py-32 px-6 bg-emerald-500 text-black overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter border-b-8 border-black inline-block skew-x-6 italic">Program_Schedules_2026</h2>
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="font-black text-xs uppercase mb-8 tracking-widest flex items-center gap-2">[ EVENT_MENDATANG ]</h3>
              <div className="space-y-6">
                <div className="bg-black p-6 text-white border-l-8 border-white hover:translate-x-4 transition-all duration-300">
                  <div className="text-[10px] text-emerald-500 font-black mb-2 uppercase tracking-widest">FEBRUARI 2026</div>
                  <div className="text-xl font-black uppercase tracking-tighter">Cyber Security Hackathon</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-black text-xs uppercase mb-8 tracking-widest opacity-60 flex items-center gap-2">[ EVENT_TERDAHULU ]</h3>
              <ul className="space-y-4 font-bold italic opacity-70">
                <li>✓ Global Debating Championship 2025</li>
                <li>✓ University Career Fair 2025</li>
                <li>✓ Tech-Talk Alumni Summit 2024</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI SECTION */}
      <section className="py-40 bg-black overflow-hidden border-y border-white/5 relative">
        <div className="animate-marquee whitespace-nowrap">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex">
              <div className="mx-8 bg-white/5 p-10 border border-emerald-500/30 w-[450px] hover:bg-white/10 transition-all">
                <p className="text-xl text-white italic font-bold mb-6 whitespace-normal leading-relaxed">"Kalyn Academy sukses bikin acara kampus kami jadi lebih modern dan berkelas. Sistem pendaftarannya mantap banget!"</p>
                <div className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">REZA — KETUA BEM UNAS</div>
              </div>
              <div className="mx-8 bg-white/5 p-10 border border-emerald-500/30 w-[450px] hover:bg-white/10 transition-all">
                <p className="text-xl text-white italic font-bold mb-6 whitespace-normal leading-relaxed">"Baru kali ini ada EO yang ngerti kebutuhan akademik tapi tetep bawa vibe teknologi yang kece."</p>
                <div className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">DR. LIANA — DOSEN IT</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="relative py-40 px-6 max-w-4xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none hover:text-emerald-500 transition-colors">
              START_ <br /> CONNECTION
            </h2>
            <div className="space-y-6 text-xs font-bold uppercase tracking-widest">
              <p className="text-emerald-500 flex items-center gap-3">📍 Jakarta Selatan, Indonesia</p>
              <p className="text-gray-500 flex items-center gap-3 hover:text-emerald-500 transition-all">📞 +62 812 3456 7890</p>
              <p className="text-emerald-500 underline underline-offset-4 cursor-pointer hover:text-white transition">📧 hi@kalynacademy.io</p>
            </div>
          </div>
          <div className="space-y-8 font-black uppercase text-[10px]">
            <input
              type="text"
              placeholder="VAR_NAME:String"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-emerald-500 outline-none text-white transition-all hover:border-white/30"
            />
            <input
              type="email"
              placeholder="VAR_EMAIL:String"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-emerald-500 outline-none text-white transition-all hover:border-white/30"
            />
            <textarea
              placeholder="VAR_MESSAGE:Text"
              rows="4"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-emerald-500 outline-none text-white transition-all hover:border-white/30 resize-none"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-500 text-black py-6 font-black uppercase tracking-[0.4em] hover:bg-white hover:-translate-y-2 transition-all shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] relative overflow-hidden group"
            >
              <span className="relative z-10">{status.type === "loading" ? "UPLOADING..." : "EXECUTE_MESSAGE()"}</span>
            </button>
            {status.msg && <div className="mt-4 p-4 border border-emerald-500 text-emerald-500 text-center animate-pulse bg-emerald-500/5">{status.msg}</div>}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center relative overflow-hidden">
        <div className="text-[8px] font-black uppercase tracking-[1em] text-gray-800 relative z-10 hover:text-emerald-500/50 transition-colors">© 2026 KALYN ACADEMY // HIGH-RESOLUTION EO SYSTEMS</div>
      </footer>
    </div>
  );
};

// --- INI FUNGSI APP UTAMA (FIX ROUTING & NO ERROR) ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<ErrorPage code="404" message="Halaman Tidak Ditemukan" />} />
      </Routes>
    </Router>
  );
}

export default App;
