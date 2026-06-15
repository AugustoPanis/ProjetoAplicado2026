import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criar } from '../services/clienteService';
import { ArrowLeft, PlusCircle } from 'lucide-react';

function Cadastro() {
  const [formData, setFormData] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      await criar(formData);
      navigate('/');
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao cadastrar cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-zinc-950 min-h-screen">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">
            <span>➕</span> Novo Cliente
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Cadastrar Login</h1>
          <p className="text-zinc-500 text-sm mt-1">O token de acesso será gerado automaticamente.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-zinc-800 hover:border-zinc-700 transition duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
      </div>

      {/* Formulário */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 h-[250px] w-[250px] bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

        {erro && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold px-4 py-3 rounded-xl">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: João Silva"
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-zinc-700 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="joao@email.com"
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-zinc-700 text-sm"
            />
          </div>

          {/* Info token */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-amber-500 text-lg">🔑</span>
            <div>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Token de Acesso</p>
              <p className="text-zinc-600 text-xs mt-0.5">Gerado automaticamente ao salvar</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black py-4 px-4 rounded-xl shadow-lg transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
          >
            <PlusCircle className="h-5 w-5 stroke-[2.5]" />
            {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;