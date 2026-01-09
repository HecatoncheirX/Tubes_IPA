import React, { useEffect, useState } from "react";

function App() {
  // --- STATE ANIMASI TERMINAL ---
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

  // --- STATE FORM (Koneksi Backend Laravel) ---
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: ">> ENCRYPTING_DATA..." });
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
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
      {/* CSS KHUSUS ANIMASI */}
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
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#layanan" className="hover:text-emerald-500 transition-all relative group">
            /Services
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#program" className="hover:text-emerald-500 transition-all relative group">
            /Programs
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="bg-emerald-500 text-black px-6 py-2 font-black hover:skew-x-6 transition-all hover:shadow-lg hover:shadow-emerald-500/50 relative overflow-hidden group">
            <span className="relative z-10">EXEC_CONTACT</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
        </div>
      </nav>

      {/* 2. BANNER UTAMA (HERO) */}
      <section className="relative pt-64 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-40 w-full h-[400px] bg-emerald-500/10 blur-[150px] rounded-full -z-10 float-animation"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-emerald-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 border border-emerald-500/30 rounded-full" style={{ animation: "rotate-slow 20s linear infinite" }}></div>
        </div>
        <div className="text-emerald-500 font-bold text-xs tracking-[0.5em] mb-6 animate-pulse pulse-glow px-4 py-2 border border-emerald-500/30 bg-emerald-500/5">[ INITIATING_ACADEMIC_REVOLUTION ]</div>
        <h1 className="relative text-6xl md:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase mb-12 italic hover:scale-105 transition-transform duration-500">
          BEYOND <br />
          <span className="text-transparent relative inline-block" style={{ WebkitTextStroke: "2px #10b981" }}>
            LIMITS
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent scan-line"></div>
          </span>
        </h1>
        <div className="bg-gradient-to-r from-white/5 to-white/10 border-l-4 border-emerald-500 px-6 py-3 font-bold text-sm mb-12 relative overflow-hidden group hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative">
            kalyn@academy:~$ <span className="text-white">{text}</span>
            <span className="animate-pulse">_</span>
          </span>
        </div>
        <p className="max-w-xl text-gray-500 text-lg mb-12 uppercase font-black tracking-tight leading-tight relative">Penyelenggara event akademik paling tech-noir di Indonesia. Kami tidak hanya membuat acara, kami membangun standar.</p>
        <div className="flex gap-4 mt-8">
          <div className="px-8 py-4 bg-emerald-500 text-black font-black uppercase text-xs tracking-wider hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer">Explore Now →</div>
          <div className="px-8 py-4 border-2 border-emerald-500 text-emerald-500 font-black uppercase text-xs tracking-wider hover:bg-emerald-500 hover:text-black transition-all duration-300 cursor-pointer">Watch Showreel</div>
        </div>
      </section>

      {/* 3. TENTANG KAMI (VISI, MISI, TIM, SEJARAH) */}
      <section id="about" className="relative py-32 px-6 bg-gradient-to-b from-white/[0.01] to-transparent border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-4xl font-black text-white mb-20 uppercase italic tracking-tighter border-b-4 border-emerald-500 inline-block hover:skew-x-3 transition-transform">System_Profiles.log</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-500"></div>
                <h3 className="text-emerald-500 font-black mb-4 tracking-widest text-xs">// VISI_&_MISI</h3>
                <p className="text-sm border-l-2 border-white/20 pl-6 group-hover:border-emerald-500 group-hover:pl-8 transition-all duration-300 leading-relaxed">
                  Menjadi katalisator utama pendidikan tinggi melalui integrasi teknologi manajemen event yang tak tertandingi. Memastikan setiap seminar, workshop, dan lomba memiliki dampak akademik nyata.
                </p>
              </div>
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-500"></div>
                <h3 className="text-emerald-500 font-black mb-4 tracking-widest text-xs">// THE_CREW</h3>
                <p className="text-sm border-l-2 border-white/20 pl-6 group-hover:border-emerald-500 group-hover:pl-8 transition-all duration-300 leading-relaxed">
                  Kombinasi antara Akademisi senior, Software Engineer, dan Creative Strategist. Kami bekerja di balik layar untuk memastikan sistem pendaftaran hingga eksekusi panggung berjalan sempurna.
                </p>
              </div>
            </div>
            <div className="relative bg-emerald-500 p-10 flex flex-col justify-center transform hover:scale-105 transition-all duration-500 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="relative z-10 text-black font-black mb-4 text-xs uppercase tracking-widest underline underline-offset-4">Sejarah & Latar Belakang</h3>
              <p className="relative z-10 text-black font-bold text-lg leading-tight italic">
                "Kalyn Academy lahir dari keresahan akan kaku-nya event akademik konvensional. Sejak 2020, kami telah mendisrupsi cara kampus merayakan ilmu pengetahuan."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN & HARGA (LAYANAN) */}
      <section id="layanan" className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-20 uppercase tracking-tighter text-right italic">./Services_Pricing</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "SEMINAR & WEBINAR", d: "High-end tech production & global reach.", p: "Mulai 5jt", i: "⚡" },
            { t: "WORKSHOP / PELATIHAN", d: "Hands-on curriculum & certification.", p: "Mulai 8jt", i: "🛠️" },
            { t: "TALKSHOW KAMPUS", d: "Inspiring VIP guests & media coverage.", p: "Mulai 7jt", i: "🎤" },
            { t: "BOOTCAMP EDUKASI", d: "Intensive 4-week career acceleration.", p: "Mulai 12jt", i: "🚀" },
          ].map((item, i) => (
            <div key={i} className="group p-8 border border-white/5 bg-[#0a0c10] hover:bg-emerald-500 transition-all duration-700 cursor-crosshair relative overflow-hidden hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="text-4xl mb-6 group-hover:invert transition-all group-hover:scale-110 transform duration-300">{item.i}</div>
              <h3 className="relative z-10 text-xl font-black text-white group-hover:text-black mb-4 uppercase tracking-tight">{item.t}</h3>
              <p className="relative z-10 text-xs text-gray-500 group-hover:text-black/70 mb-8 leading-relaxed">{item.d}</p>
              <div className="relative z-10 text-emerald-500 group-hover:text-black font-black text-sm border-t border-white/10 group-hover:border-black/20 pt-4 uppercase tracking-tighter">{item.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROGRAM EVENT (MENDATANG & TERDAHULU) */}
      <section id="program" className="relative py-32 px-6 bg-emerald-500 text-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 border-4 border-black rounded-full" style={{ animation: "rotate-slow 30s linear infinite" }}></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 border-4 border-black rounded-full" style={{ animation: "rotate-slow 25s linear infinite reverse" }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter border-b-8 border-black inline-block skew-x-6 italic hover:skew-x-0 transition-transform">Program_Schedules_2026</h2>
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="font-black text-xs uppercase mb-8 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-black animate-pulse"></span>[ EVENT_MENDATANG ]
              </h3>
              <div className="space-y-6">
                <div className="bg-black p-6 text-white border-l-8 border-white hover:translate-x-4 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-[10px] text-emerald-500 font-black mb-2 uppercase tracking-widest relative z-10">FEBRUARI 2026</div>
                  <div className="text-xl font-black uppercase tracking-tighter relative z-10">Cyber Security Hackathon</div>
                </div>
                <div className="bg-black/80 p-6 text-white border-l-8 border-white hover:translate-x-4 transition-all duration-300 group relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-[10px] text-emerald-500 font-black mb-2 uppercase tracking-widest relative z-10">MEI 2026</div>
                  <div className="text-xl font-black uppercase tracking-tighter relative z-10">AI for Education Conference</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-black text-xs uppercase mb-8 tracking-widest opacity-60 flex items-center gap-2">
                <span className="w-2 h-2 bg-black/50"></span>[ EVENT_TERDAHULU ]
              </h3>
              <ul className="space-y-4 font-bold italic opacity-70">
                <li className="border-b border-black/20 pb-2 hover:opacity-100 hover:translate-x-2 transition-all cursor-pointer">✓ Global Debating Championship 2025</li>
                <li className="border-b border-black/20 pb-2 hover:opacity-100 hover:translate-x-2 transition-all cursor-pointer">✓ University Career Fair 2025</li>
                <li className="border-b border-black/20 pb-2 hover:opacity-100 hover:translate-x-2 transition-all cursor-pointer">✓ Tech-Talk Alumni Summit 2024</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI (ANIMASI MARQUEE GACOR) */}
      <section className="py-40 bg-black overflow-hidden border-y border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-emerald-500/5 to-black"></div>
        <div className="animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex">
              <div className="mx-8 bg-white/5 p-10 border border-emerald-500/30 w-[450px] hover:bg-white/10 hover:border-emerald-500/50 transition-all hover:scale-105 duration-300">
                <p className="text-xl text-white italic font-bold mb-6 whitespace-normal leading-relaxed">"Kalyn Academy sukses bikin acara kampus kami jadi lebih modern dan berkelas. Sistem pendaftarannya mantap banget!"</p>
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-px bg-emerald-500"></span>
                  REZA — KETUA BEM UNAS
                </div>
              </div>
              <div className="mx-8 bg-white/5 p-10 border border-emerald-500/30 w-[450px] hover:bg-white/10 hover:border-emerald-500/50 transition-all hover:scale-105 duration-300">
                <p className="text-xl text-white italic font-bold mb-6 whitespace-normal leading-relaxed">"Baru kali ini ada EO yang ngerti kebutuhan akademik tapi tetep bawa vibe teknologi yang kece."</p>
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-px bg-emerald-500"></span>
                  DR. LIANA — DOSEN IT
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HUBUNGI KAMI (FORM KONTAK) */}
      <section id="contact" className="relative py-40 px-6 max-w-4xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] float-animation"></div>
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none hover:text-emerald-500 transition-colors">
              START_ <br /> CONNECTION
            </h2>
            <div className="space-y-6 text-xs font-bold uppercase tracking-widest">
              <p className="text-emerald-500 flex items-center gap-3 hover:gap-4 transition-all cursor-pointer">
                <span className="text-xl">📍</span> Jakarta Selatan, Indonesia
              </p>
              <p className="text-gray-500 flex items-center gap-3 hover:gap-4 hover:text-emerald-500 transition-all cursor-pointer">
                <span className="text-xl">📞</span> +62 812 3456 7890
              </p>
              <p className="text-gray-500 flex items-center gap-3 hover:gap-4 hover:text-emerald-500 transition-all cursor-pointer">
                <span className="text-xl">📷</span> @kalyn.academy
              </p>
              <p className="text-emerald-500 underline underline-offset-4 cursor-pointer hover:text-white transition flex items-center gap-3 hover:gap-4">
                <span className="text-xl">📧</span> hi@kalynacademy.io
              </p>
            </div>
          </div>
          <div className="space-y-8 font-black uppercase text-[10px] relative">
            <div className="absolute -top-10 -right-10 w-20 h-20 border border-emerald-500/20 rounded-full" style={{ animation: "rotate-slow 15s linear infinite" }}></div>
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
              className="w-full bg-emerald-500 text-black py-6 font-black uppercase tracking-[0.4em] hover:bg-white hover:-translate-y-2 transition-all shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[15px_15px_0px_0px_rgba(16,185,129,0.3)] relative overflow-hidden group"
            >
              <span className="relative z-10">{status.type === "loading" ? "UPLOADING..." : "EXECUTE_MESSAGE()"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            {status.msg && <div className="mt-4 p-4 border border-emerald-500 text-emerald-500 text-center animate-pulse bg-emerald-500/5">{status.msg}</div>}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
        <div className="text-[8px] font-black uppercase tracking-[1em] text-gray-800 relative z-10 hover:text-emerald-500/50 transition-colors">© 2026 KALYN ACADEMY // HIGH-RESOLUTION EO SYSTEMS</div>
      </footer>
    </div>
  );
}

export default App;
