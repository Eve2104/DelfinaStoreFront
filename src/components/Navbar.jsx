// /src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartWidget from "./CartWidget.jsx";
import Logo from "../assets/img/LOGO.png";
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  // ⬇️ fallback por si alguna vez renderiza sin provider
  const auth = (typeof useAuth === 'function' ? useAuth() : null) || {};
  const { user, logout } = auth;

  useEffect(() => {
    const q = new URLSearchParams(search).get("q") || "";
    setQuery(q);
  }, [search]);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
  };
  const onLogout = async () => { try { await logout?.(); navigate('/'); } catch {} };
  const firstName = (user?.nombre || "").split(" ")[0];

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="Logo Delfina Store" className="me-2" style={{ width: 40, height: 40, objectFit: "contain" }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>

          <form className="d-flex me-3" role="search" onSubmit={onSubmit}>
            <input className="form-control" type="search" placeholder="Buscar..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </form>

          {user ? (
            <div className="d-flex align-items-center gap-2 me-3">
              <span className="text-muted small d-none d-lg-inline">Hola, <strong>{firstName}</strong></span>
              <button className="btn btn-outline-secondary btn-sm" onClick={onLogout}>Salir</button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2 me-3">
              <Link className="btn btn-outline-primary btn-sm" to="/login">Ingresar</Link>
              <Link className="btn btn-primary btn-sm" to="/registro">Crear cuenta</Link>
            </div>
          )}

          <CartWidget />
        </div>
      </div>
    </nav>
  );
}
