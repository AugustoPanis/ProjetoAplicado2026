import api from '../api/api';

export const getAll = async () => {
    const response = await api.get('/clientes');
    return response.data;
};

export const criar = async (dados) => {
    const response = await api.post('/clientes', dados);
    return response.data;
};

export const deletar = async (id) => {
    await api.delete(`/clientes/${id}`);
};

export const getById = async (id) => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

export const atualizar = async (id, dados) => {
  const response = await api.put(`/clientes/${id}`, dados);
  return response.data;
};

export const testarConexao = async (id) => {
    const response = await api.post(`/clientes/${id}/testar`);
    return response.data;
};