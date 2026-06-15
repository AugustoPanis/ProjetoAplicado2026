import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({ email: '', senha: '' });
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
      const token = await login(formData.email, formData.senha);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-5xl">💈</span>
          <h1 className="text-2xl font-black tracking-wider text-amber-400 uppercase mt-3">
            Barber Admin
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Acesso restrito ao painel administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">

          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold px-4 py-3 rounded-xl mb-6">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@barbearia.com"
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-zinc-700 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-zinc-700 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black py-4 rounded-xl shadow-lg transition duration-300 disabled:opacity-50 uppercase tracking-wider text-sm mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;