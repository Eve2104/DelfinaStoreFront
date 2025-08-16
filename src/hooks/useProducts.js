import { useEffect, useState } from 'react';
import { listarProductos } from '../services/productos';

export default function useProducts(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true); setError(null);
    listarProductos()
      .then(res => { if(!cancel) setData(res); })
      .catch(err => { if(!cancel) setError(err.message || 'Error al cargar productos'); })
      .finally(() => { if(!cancel) setLoading(false); });
    return () => { cancel = true; };
  }, []);

  return { data, loading, error };
}