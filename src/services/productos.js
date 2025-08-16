import api from './api';

export async function listarProductos(){
  const { data } = await api.get('/productos');
  // Mapear _id -> id para el frontend
  return (data || []).map(({ _id, ...rest }) => ({ id: _id, ...rest }));
}