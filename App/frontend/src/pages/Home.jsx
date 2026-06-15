import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/clienteService";

function ClienteCard({ cliente, onClick }) {
  const [hovered, setHovered] = useState(false);

  const initials = cliente.nome
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={() => onClick(cliente)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-12px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 60px -10px rgba(245,158,11,0.28), 0 0 0 1px rgba(245,158,11,0.5)"
          : "0 0 0 1px rgba(63,63,70,1)",
        background: hovered
          ? "linear-gradient(160deg, #1c1c1f 0%, #111113 100%)"
          : "linear-gradient(160deg, #18181b 0%, #0d0d0f 100%)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
      }}
      className="relative flex flex-col justify-between h-[280px] rounded-2xl p-8 overflow-hidden"
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: hovered ? 1 : 0,
        background: "radial-gradient(ellipse at top right, rgba(245,158,11,0.1) 0%, transparent 65%)",
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Barra lateral */}
      <div style={{
        position: "absolute", left: 0, top: "24px", bottom: "24px", width: "3px",
        borderRadius: "0 4px 4px 0",
        background: hovered ? "linear-gradient(to bottom, #fbbf24, #d97706)" : "#3f3f46",
        transition: "background 0.35s ease",
      }} />

      <div>
        <div className="flex items-start justify-between mb-6">
          {/* Avatar */}
          <div style={{
            background: hovered ? "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(24,24,27,0.8))" : "#27272a",
            border: hovered ? "1px solid rgba(245,158,11,0.35)" : "1px solid #3f3f46",
            transition: "all 0.35s ease",
          }} className="w-14 h-14 rounded-xl flex items-center justify-center">
            <span style={{ color: hovered ? "#fbbf24" : "#71717a", transition: "color 0.3s ease" }}
              className="text-lg font-black tracking-tight">
              {initials}
            </span>
          </div>

          {/* Badge ativo */}
          <span style={{
            color: hovered ? "#fbbf24" : "#71717a",
            borderColor: hovered ? "rgba(245,158,11,0.3)" : "#3f3f46",
            background: hovered ? "rgba(245,158,11,0.06)" : "#09090b",
            transition: "all 0.3s ease",
          }} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border">
            📱 App
          </span>
        </div>

        {/* Nome */}
        <h3 style={{
          background: hovered ? "linear-gradient(90deg, #fcd34d, #f59e0b)" : "none",
          WebkitBackgroundClip: hovered ? "text" : "unset",
          WebkitTextFillColor: hovered ? "transparent" : "#ffffff",
          transition: "all 0.35s ease",
        }} className="text-xl font-black tracking-tight truncate mb-5" title={cliente.nome}>
          {cliente.nome}
        </h3>

        <div className="space-y-3 text-sm">
          <div className="truncate">
            <span className="text-zinc-600 font-bold text-[10px] uppercase block tracking-widest mb-0.5">E-mail</span>
            <span className="text-zinc-300 font-mono text-xs">{cliente.email}</span>
          </div>
          <div className="truncate">
            <span className="text-zinc-600 font-bold text-[10px] uppercase block tracking-widest mb-0.5">Token</span>
            <span className="text-zinc-500 font-mono text-xs">{cliente.tokenApp}</span>
          </div>
        </div>
      </div>

      {/* Clique para editar */}
      <div style={{
        position: "absolute", bottom: "12px", right: "16px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        color: "#71717a", fontSize: "10px", fontWeight: "700",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        clique para editar →
      </div>
    </div>
  );
}

function Home() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const carregarClientes = async () => {
    try {
      const data = await getAll();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <h2 className="text-zinc-500 font-bold tracking-widest text-xs uppercase animate-pulse">
          Carregando Clientes...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-zinc-950 min-h-screen">

      {/* Header */}
      <header className="bg-zinc-900 text-white shadow-md -mx-6 -mt-12 px-6 py-4 mb-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl"></span>
          <span className="text-xl font-black tracking-wider text-amber-400 uppercase">Acesso Admin</span>
        </div>
        <button
          onClick={() => navigate('/cadastro')}
          className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-bold px-4 py-2 rounded-lg text-sm shadow transition duration-200"
        >
          + Novo Cliente
        </button>
      </header>

      {/* Título */}
      <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">
            <span>⚡</span> Painel de Controle
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Logins{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Cadastrados
            </span>
          </h1>
        </div>
        <div className="text-zinc-400 text-sm font-medium bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          Total: <span className="text-amber-500 font-bold">{clientes.length}</span> clientes
        </div>
      </div>

      {clientes.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border-2 border-zinc-800 border-dashed">
          <p className="text-zinc-400 font-medium text-lg">Nenhum cliente cadastrado.</p>
          <p className="text-zinc-600 text-sm mt-1">Clique em "+ Novo Cliente" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientes.map((cliente) => (
            <ClienteCard
              key={cliente._id}
              cliente={cliente}
              onClick={(c) => navigate(`/edicao/${c._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;