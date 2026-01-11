import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      if (contacts.length > 0) setRefreshing(true);
      else setLoading(true);

      setError(null);
      // Endpoint sesuai api.php lu
      const response = await axios.get("http://localhost:8000/api/contacts");
      setContacts(response.data);

      // Simulasi delay biar efek terminal-nya kerasa
      setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (err) {
      setError(">> ERROR: UPLINK_FAILURE_UNABLE_TO_REACH_DATABASE");
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-emerald-500 font-mono p-4 md:p-8 relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10 animate-[scan_4s_linear_infinite]"></div>
      </div>

      <style>{`
                @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                .flicker { animation: blink 0.1s infinite; }
            `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-emerald-500/30 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic uppercase text-white">
              ADMIN<span className="text-emerald-500">_DASHBOARD</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] mt-2 opacity-70">
              [ STATUS: <span className="animate-pulse text-emerald-400">ENCRYPTED_LINK_ACTIVE</span> ]
            </p>
          </div>

          <button
            onClick={fetchContacts}
            disabled={refreshing}
            className={`mt-4 md:mt-0 px-6 py-3 border-2 border-emerald-500 font-black uppercase text-xs tracking-widest transition-all hover:bg-emerald-500 hover:text-black ${
              refreshing ? "opacity-50 cursor-wait" : "hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            }`}
          >
            {refreshing ? ">> SYNCING..." : "REFRESH_DATABASE()"}
          </button>
        </div>

        {/* Progress Bar pas Refresh */}
        {refreshing && (
          <div className="w-full h-1 bg-emerald-900/30 mb-6 overflow-hidden">
            <div className="h-full bg-emerald-500 animate-[loading_1s_ease-in-out_infinite]"></div>
          </div>
        )}

        {error && <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-500 text-xs font-bold tracking-widest animate-pulse">{error}</div>}

        {/* Main Table Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 border border-emerald-500/20 bg-black/40">
            <div className="text-4xl animate-spin mb-4">⌛</div>
            <p className="text-xs tracking-[0.5em] animate-pulse">FETCHING_INCOMING_MESSAGES...</p>
          </div>
        ) : (
          <div className="border border-emerald-500/20 bg-black/40 backdrop-blur-md overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-500/30 text-[10px] uppercase tracking-widest bg-emerald-500/5">
                  <th className="p-4 font-black">ID</th>
                  <th className="p-4 font-black">Identity_Name</th>
                  <th className="p-4 font-black">Email_Addr</th>
                  <th className="p-4 font-black">Message_Payload</th>
                  <th className="p-4 font-black">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {contacts.length > 0 ? (
                  contacts.map((contact, idx) => (
                    <tr key={contact.id} className="border-b border-white/5 hover:bg-emerald-500/5 transition-colors group">
                      <td className="p-4 opacity-50 group-hover:opacity-100">{idx + 1}</td>
                      <td className="p-4 text-white font-bold italic tracking-tight">{contact.name}</td>
                      <td className="p-4 text-emerald-400/80">{contact.email}</td>
                      <td className="p-4 text-gray-400 max-w-xs truncate group-hover:whitespace-normal transition-all">{contact.message}</td>
                      <td className="p-4 text-[10px] opacity-60">{new Date(contact.created_at).toLocaleString("id-ID")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center opacity-30 italic tracking-[0.3em]">
                      // NO_INCOMING_DATA_DETECTED
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer System Info */}
        <div className="mt-6 flex justify-between text-[8px] uppercase tracking-widest opacity-40 italic">
          <p>Logged as: ROOT_ADMIN</p>
          <p>System v2026.gacor // Terminal_Access_Authorized</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
