import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SizeGuide from '../components/SizeGuide';   // 👈 guía
import ProductCardSkeleton from '../components/ProductCardSkeleton';

export default function Home(){
  const { data: productos, loading, error } = useProducts();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();

  const [orden, setOrden] = useState('relevancia');
  const onOrden = (e)=> setOrden(e.target.value);

  const filtrados = useMemo(() => !q ? productos : productos.filter(p =>
    [p.nombre, p.descripcion].some(x => (x||'').toLowerCase().includes(q))
  ), [productos, q]);

  // 👇 estado del modal de talles (front-only)
  const [showGuide, setShowGuide] = useState(false);
  const [guideGrupo] = useState('ninas'); // default; se puede cambiar dentro del modal

  if(loading){
  return (
    <div className="container py-4">
      <div className="row g-3 g-lg-4 products-grid">
        {Array.from({length: 8}).map((_,i)=>(
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={i}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
  if(error)   return <div className="container py-4"><div className="alert alert-danger">{String(error)}</div></div>;

  return (
    <div className="container-xl py-4">
      {/* toolbar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div className="text-muted">
          {filtrados.length} producto{filtrados.length !== 1 ? 's' : ''}
          {q && <> • buscando: <strong>{q}</strong></>}
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Botón global de guía de talles */}


          <label htmlFor="orden" className="small text-muted ms-2">Ordenar</label>
          <select id="orden" className="form-select" value={orden} onChange={onOrden} style={{maxWidth: 220}}>
            <option value="relevancia">Relevancia</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {/* hint solo en mobile */}
      <div className="d-sm-none text-muted small mb-2">
        Deslizá para ver más →
      </div>

      {/* grid */}
      <div className="row g-3 g-lg-4 products-grid">
        {filtrados.map(p => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={p.id}>
            <ProductCard producto={p} />
          </div>
        ))}
      </div>

      {!filtrados.length && (
        <div className="alert alert-warning mt-3">No se encontraron productos.</div>
      )}

      {/* 👇 Modal de guía (global para toda la página) */}
      <SizeGuide open={showGuide} onClose={()=>setShowGuide(false)} grupo={guideGrupo} />
    </div>
  );
}
