import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Edicao from './pages/Edicao';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/edicao/:id" element={<Edicao />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;