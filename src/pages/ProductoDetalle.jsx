import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { listarProductos } from "../services/productos";
import { useCart } from "../contexts/CartContext";
import SizeGuide from "../components/SizeGuide";
import DetailSkeleton from '../components/DetailSkeleton';


export default function ProductoDetalle() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const { add } = useCart();
  // ...tus states
  const [talle, setTalle] = useState(""); // ← NUEVO
  const [showGuide, setShowGuide] = useState(false); // si no lo tenías
  

  // Grupo sugerido según el nombre (bebés vs niñas)
  const grupoTalles = useMemo(() => {
    const name = (prod?.nombre || "").toLowerCase();
    return /beb[eé]|jumper|body|ranita/.test(name) ? "bebes" : "ninas";
  }, [prod]);

  // Listas de talles para UI (front-only)
  const TALLES_NINAS = ["2", "4", "6", "8", "10", "12"];
  const TALLES_BEBES = [
    "0-3 m",
    "3-6 m",
    "6-9 m",
    "9-12 m",
    "12-18 m",
    "18-24 m",
  ];
  const talles = grupoTalles === "bebes" ? TALLES_BEBES : TALLES_NINAS;

  // construir src sin helper externo
  const src = useMemo(() => {
    const p = prod?.imagen || "";
    if (!p) return "/assets/img/placeholder.webp";
    if (/^https?:\/\//i.test(p)) return p;
    return encodeURI(p); // sirve para /uploads/... y /assets/...
  }, [prod]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancel = false;
    setLoading(true);
    setError(null);
    listarProductos()
      .then((list) => {
        if (!cancel) setProd(list.find((p) => p.id === id));
      })
      .catch((e) => {
        if (!cancel) setError(e.message || "Error");
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [id]);

if (loading) return <DetailSkeleton />;
  if (error)
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{String(error)}</div>
      </div>
    );
  if (!prod)
    return (
      <div className="container py-4">
        <div className="alert alert-warning">Producto no encontrado</div>
      </div>
    );

  const precio = (prod.precio ?? 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const handleAdd = () => {
    if (!talle) return; // obliga a elegir talle
    // guardamos el talle en el item del carrito (front-only)
    const prodConTalle = { ...prod, talleSeleccionado: talle };
    add(prodConTalle, Math.max(1, qty));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };
  return (
    <div className="container-xl py-4">
      <div className="mb-3 small">
        <Link to="/" className="link-underline">
          ← Volver
        </Link>
      </div>

      <div className="row g-4 align-items-start">
        {/* Galería */}
        {/* Galería */}
        <div className="col-12 col-lg-6">
          <div className="detail-media detail-media--compact shadow-sm">
            <div className="detail-frame">
              <img
                src={src}
                alt={prod.nombre}
                className="detail-img"
                onClick={() => setLightbox(true)} // 👈 vuelve el zoom
                onError={(e) => {
                  e.currentTarget.src = "/assets/img/placeholder.webp";
                }}
                style={{ cursor: "zoom-in" }}
              />
            </div>
          </div>
          <div className="text-muted small mt-2">
            Tocá la imagen para ampliarla
          </div>
        </div>

        {/* Info */}
        <div className="col-12 col-lg-6">
          <h1 className="h3 fw-bold mb-2">{prod.nombre}</h1>
          <p className="text-muted">{prod.descripcion}</p>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="h3 m-0 price">{precio}</div>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setShowGuide(true)}
            >
              Guía de talles
            </button>
          </div>

          {/* Cantidad + CTA */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="small text-muted">Cantidad</label>
            <div className="input-group" style={{ width: 140 }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                className="form-control text-center"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Selector de talle */}
          <div className="mb-3">
            <div className="small text-muted mb-2">Talle</div>
            <div className="d-flex flex-wrap gap-2">
              {talles.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`btn btn-sm ${
                    talle === t ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setTalle(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {!talle && (
              <div className="form-text">Elegí un talle para continuar</div>
            )}
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn btn-primary btn-lg ${added ? "disabled" : ""}`}
              onClick={handleAdd}
              disabled={!talle || added} // ← deshabilitado sin talle
            >
              {added
                ? "✓ Agregado"
                : !talle
                ? "Elegí un talle"
                : "Agregar al carrito"}
            </button>
            <Link className="btn btn-outline-secondary btn-lg" to="/carrito">
              Ver carrito
            </Link>
          </div>

          {/* Beneficios */}
          <div className="row g-3 mt-4">
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">
                🚚 <div className="fw-semibold mt-1">Envíos a todo el país</div>
                <div className="small text-muted">Rápidos y seguros</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">
                🔁 <div className="fw-semibold mt-1">Cambios 30 días</div>
                <div className="small text-muted">Sin vueltas</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">
                💬{" "}
                <div className="fw-semibold mt-1">Atención personalizada</div>
                <div className="small text-muted">Te asesoramos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SizeGuide
        open={showGuide}
        onClose={() => setShowGuide(false)}
        grupo={grupoTalles}
      />

      {/* CTA sticky solo mobile */}
      <div className="detail-cta-mobile d-md-none">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <strong className="price m-0">{precio}</strong>
            <button
              className={`btn btn-primary flex-grow-1 ${
                added ? "disabled" : ""
              }`}
              onClick={handleAdd}
              disabled={!talle || added}
            >
              {added
                ? "✓ Agregado"
                : !talle
                ? "Elegí un talle"
                : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox simple */}
      {lightbox && (
        <>
          <div
            className="lightbox-backdrop"
            onClick={() => setLightbox(false)}
          />
          <div className="lightbox">
            <img
              src={src}
              alt={prod.nombre}
              onClick={() => setLightbox(false)}
            />
            <button
              className="btn btn-light position-absolute top-0 end-0 m-2"
              onClick={() => setLightbox(false)}
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
