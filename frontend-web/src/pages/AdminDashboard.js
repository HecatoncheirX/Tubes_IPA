import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      if (contacts.length > 0) setRefreshing(true);
      else setLoading(true);

      setError(null);

      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data);

      setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(">> ERROR: ACCESS_DENIED_EXPIRED_TOKEN");
        localStorage.removeItem("admin_token");
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setError(">> ERROR: UPLINK_FAILURE_DATABASE_UNREACHABLE");
      }
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-emerald-500 font-mono p-4 md:p-8 relative overflow-hidden">
      {/* Animasi Background Scanline & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10 animate-[scan_4s_linear_infinite]"></div>
      </div>

      <style>{`
                @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
                @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                .animate-loading { animation: loading-bar 1.5s infinite linear; }
            `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-emerald-500/30 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic uppercase text-white hover:text-emerald-500 transition-colors cursor-default">
              ADMIN<span className="text-emerald-500">_DASHBOARD</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] mt-2 opacity-70">
              [ SESSION_ACTIVE: <span className="animate-pulse text-emerald-400 font-bold">ROOT_AUTHORIZED</span> ]
            </p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={fetchContacts} disabled={refreshing} className="px-6 py-2 border border-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
              {refreshing ? ">> SYNCING..." : "REFRESH_DB()"}
            </button>
            <button onClick={handleLogout} className="px-6 py-2 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
              LOGOUT_SYSTEM
            </button>
          </div>
        </div>

        {/* Loading Bar pas Refresh */}
        {refreshing && (
          <div className="w-full h-0.5 bg-emerald-900/30 mb-6 overflow-hidden">
            <div className="h-full bg-emerald-500 animate-loading w-1/3"></div>
          </div>
        )}

        {error && <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-xs font-bold tracking-widest animate-pulse">{error}</div>}

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 border border-emerald-500/10 bg-black/40">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] tracking-[0.5em] animate-pulse">ESTABLISHING_DATA_LINK...</p>
          </div>
        ) : (
          <div className="border border-emerald-500/20 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-500/30 text-[10px] uppercase tracking-[0.2em] bg-emerald-500/5 text-emerald-300">
                    <th className="p-4 font-black">#ID</th>
                    <th className="p-4 font-black">IDENTITY</th>
                    <th className="p-4 font-black">ENDPOINT_ADDR</th>
                    <th className="p-4 font-black">PAYLOAD_MESSAGE</th>
                    <th className="p-4 font-black">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {contacts.length > 0 ? (
                    contacts.map((contact, idx) => (
                      <tr key={contact.id} className="border-b border-white/5 hover:bg-emerald-500/5 transition-colors group">
                        <td className="p-4 opacity-40 group-hover:opacity-100">{idx + 1}</td>
                        <td className="p-4 text-white font-bold italic">{contact.name}</td>
                        <td className="p-4 text-emerald-400/80">{contact.email}</td>
                        <td className="p-4 text-gray-400 max-w-xs group-hover:text-gray-200 transition-colors">
                          <div className="truncate group-hover:whitespace-normal">{contact.message}</div>
                        </td>
                        <td className="p-4 text-[10px] opacity-50 font-bold">{new Date(contact.created_at).toLocaleString("id-ID")}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-20 text-center opacity-30 italic tracking-[0.5em]">
                        // NO_INCOMING_TRANSMISSIONS_DETECTED
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System Footer Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-between text-[9px] uppercase tracking-[0.2em] opacity-40 italic gap-2">
          <p>{`>> LOCAL_ADDR: ${window.location.hostname}`}</p>
          <p>Kalyn_Academy_OS v2026.gacor // Secure_Admin_Panel</p>
          <p>{`>> UPTIME: ${Math.floor(performance.now() / 1000)}s`}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
