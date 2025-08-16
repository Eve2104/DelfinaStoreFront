// /src/services/carrito.js
import api from './api';

export async function confirmarCarrito(items){
  const payload = items.map(i => ({ _id: i.id, cantidad: i.cantidad }));
  const { data } = await api.post('/carrito/confirmar', payload);
  return data; // { ok, pedidoId }
}