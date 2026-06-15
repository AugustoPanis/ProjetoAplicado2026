import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { getById, atualizar, deletar, testarConexao } from '../services/clienteService';

function Edicao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', email: '' });
  const [tokenApp, setTokenApp] = useState('');
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [testando, setTestando] = useState(false);
  const [resultadoTeste, setResultadoTeste] = useState(null);

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const cliente = await getById(id);
        setFormData({ nome: cliente.nome, email: cliente.email });
        setTokenApp(cliente.tokenApp);
      } catch (error) {
        setErro('Cliente não encontrado.');
      } finally {
        setCarregando(false);
      }
    };
    carregarCliente();
  }, [id]);

  const handleTestarConexao = async () => {
    setTestando(true);
    setResultadoTeste(null);
    try {
      await testarConexao(id);
      setResultadoTeste({ sucesso: true, mensagem: 'App conectado! Mensagem enviada.' });
    } catch (error) {
      setResultadoTeste({ sucesso: false, mensagem: 'App offline ou não conectado.' });
    } finally {
      setTestando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      await atualizar(id, formData);
      navigate('/');
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao atualizar cliente.');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    if (!confirmandoExclusao) {
      setConfirmandoExclusao(true);
      return;
    }
    setLoading(true);
    try {
      await deletar(id);
      navigate('/');
    } catch (error) {
      setErro('Erro ao excluir cliente.');
    } finally {
      setLoading(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <h2 className="text-zinc-500 font-bold tracking-widest text-xs uppercase animate-pulse">
          Carregando...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-zinc-950 min-h-screen">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">
            <span>✏️</span> Edição de Cliente
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight truncate">
            {formData.nome}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Altere os dados e salve para atualizar.</p>
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
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-zinc-700 text-sm"
            />
          </div>

          {/* Token — somente leitura */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Token de Acesso</label>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <span className="text-zinc-500 font-mono text-xs truncate">{tokenApp}</span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(tokenApp)}
                className="text-amber-500 hover:text-amber-400 text-xs font-bold uppercase tracking-wider shrink-0 transition"
              >
                Copiar
              </button>
            </div>
            <p className="text-zinc-600 text-xs">O token não pode ser alterado.</p>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black py-3 px-4 rounded-xl shadow-lg transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
            >
              <Save className="h-4 w-4 stroke-[2.5]" />
              {loading ? 'Salvando...' : 'Salvar'}
            </button>

            <button
              type="button"
              onClick={handleTestarConexao}
              disabled={testando}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-amber-400 font-bold py-3 px-4 rounded-xl transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              {testando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-amber-500"></div>
                  Testando...
                </>
              ) : (
                <>📡 Testar Conexão</>
              )}
            </button>

            <button
              type="button"
              onClick={handleExcluir}
              disabled={loading}
              style={{
                background: confirmandoExclusao ? "linear-gradient(to right, #dc2626, #b91c1c)" : "transparent",
                borderColor: confirmandoExclusao ? "#dc2626" : "#3f3f46",
                color: confirmandoExclusao ? "#ffffff" : "#71717a",
                transition: "all 0.3s ease",
              }}
              className="sm:w-auto px-4 py-3 rounded-xl font-black text-sm uppercase tracking-wider border flex items-center justify-center gap-2 hover:border-red-600 hover:text-red-400 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4 stroke-[2.5]" />
              {confirmandoExclusao ? 'Confirmar' : 'Excluir'}
            </button>
          </div>

          {/* Resultado do teste */}
          {resultadoTeste && (
            <div className={`px-4 py-3 rounded-xl text-sm font-bold border ${resultadoTeste.sucesso
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
              {resultadoTeste.sucesso ? '✅' : '❌'} {resultadoTeste.mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Edicao;