// /src/contexts/CartContext.jsx
import { createContext, useContext, useReducer, useEffect, useState } from 'react';
const CartContext = createContext();
const initial = { items: [] };

const keyOf = (p) => `${p.id}|${p.talleSeleccionado || ''}`;

function reducer(state, action){
  switch(action.type){
    case 'HYDRATE': return action.payload || state;

    case 'ADD': {
      const payload = action.payload;                     // { id, talleSeleccionado?, cantidad, ... }
      const key = keyOf(payload);
      const ex = state.items.find(x => x.key === key);
      const items = ex
        ? state.items.map(x => x.key === key ? { ...x, cantidad: x.cantidad + payload.cantidad } : x)
        : [...state.items, { ...payload, key }];
      return { ...state, items };
    }

    case 'QTY': {
      const { key, cantidad } = action.payload;
      return { ...state, items: state.items.map(x => x.key === key ? { ...x, cantidad: Math.max(1, cantidad) } : x) };
    }

    case 'REMOVE': {
      return { ...state, items: state.items.filter(x => x.key !== action.payload) };
    }

    case 'CLEAR': return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial);
  const [isOpen, setIsOpen] = useState(false);

  // Hidratar y migrar: asegura que todos los ítems tengan 'key'
  useEffect(() => {
    const raw = localStorage.getItem('delfina_cart');
    if (!raw) return;
    try{
      const parsed = JSON.parse(raw);
      const items = (parsed.items || []).map(i => ({ ...i, key: i.key || keyOf(i) }));
      dispatch({ type:'HYDRATE', payload:{ items } });
    }catch{}
  }, []);

  useEffect(() => {
    localStorage.setItem('delfina_cart', JSON.stringify(state));
  }, [state]);

  const add    = (prod, cantidad=1) => { dispatch({ type:'ADD', payload:{ ...prod, cantidad } }); setIsOpen(true); };
  const qty    = (key, cantidad)     => dispatch({ type:'QTY', payload:{ key, cantidad } });
  const remove = (key)               => dispatch({ type:'REMOVE', payload:key });
  const clear  = ()                  => dispatch({ type:'CLEAR' });

  const openCart = () => setIsOpen(true);
  const closeCart= () => setIsOpen(false);

  const totalItems  = state.items.reduce((a,i)=>a+i.cantidad,0);
  const totalPrecio = state.items.reduce((a,i)=>a+i.precio*i.cantidad,0);

  return (
    <CartContext.Provider value={{
      items: state.items, add, qty, remove, clear,
      totalItems, totalPrecio, isOpen, openCart, closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
