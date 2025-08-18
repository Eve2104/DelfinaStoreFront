// /src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CartWidget from "./CartWidget.jsx";
import Logo from "../assets/img/LOGO.png";
import { useAuth } from "../contexts/AuthContext";


export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Bootstrap Collapse ref
  const collapseEl = useRef(null);
  const bsCollapseRef = useRef(null);

  // Auth (fallback por si el provider no está montado aún)
  const auth = (typeof useAuth === "function" ? useAuth() : null) || {};
  const { user, logout } = auth;
  const firstName = (user?.nombre || "").split(" ")[0];

  // Instanciar collapse una vez
  useEffect(() => {
    if (collapseEl.current && window.bootstrap?.Collapse) {
      bsCollapseRef.current = window.bootstrap.Collapse.getOrCreateInstance(
        collapseEl.current,
        { toggle: false }
      );
    }
  }, []);

  const closeNav = () => {
    // Cierra por API y como fallback quita la clase
    try {
      bsCollapseRef.current?.hide();
    } catch {}
    collapseEl.current?.classList?.remove("show");
  };

  // Actualizar query del buscador
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setQuery(q);
  }, [location.search]);

  // Cierra al cambiar de ruta
  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  // —— helpers de navegación que además cierran el menú ——
  const go = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    closeNav();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
    closeNav();
  };

  const onLogout = async () => {
    try {
      await logout?.();
      navigate("/");
    } finally {
      closeNav();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* LOGO */}
        <a
          href="/"
          onClick={go("/")}
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={Logo}
            alt="Logo Delfina Store"
            className="me-2"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="nav" ref={collapseEl}>
          {/* Links */}
          <ul className="navbar-nav me-auto mb-3 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={go("/")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/nosotros"
                onClick={go("/nosotros")}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contacto"
                onClick={go("/contacto")}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Buscador */}
          {/* Buscador */}
          <form
            className="d-flex my-3 my-lg-0 w-100 w-lg-auto"
            role="search"
            onSubmit={onSubmit}
            style={{ maxWidth: 360 }}
          >
            <div className="input-group">
              <button className="btn btn-outline-secondary" type="submit">
                <i className="bi bi-search"></i>
              </button>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              
            </div>
          </form>

          {/* Acciones + carrito */}
          <div className="d-grid gap-2 mt-3 mt-lg-0 d-lg-flex align-items-center ms-lg-3">
            {user ? (
              <>
                <span className="text-muted small d-none d-lg-inline">
                  Hola, <strong>{firstName}</strong>
                </span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={onLogout}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-primary"
                  to="/login"
                  onClick={go("/login")}
                >
                  Ingresar
                </Link>
                <Link
                  className="btn btn-primary"
                  to="/registro"
                  onClick={go("/registro")}
                >
                  Crear cuenta
                </Link>
              </>
            )}

            {/* Carrito: también cierra el menú al tocarlo */}
            <div className="d-flex justify-content-lg-end" onClick={closeNav}>
              <CartWidget />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
