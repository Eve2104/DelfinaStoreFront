// /src/components/Footer.jsx
import { Link } from "react-router-dom";
import Logo from "../assets/img/LOGO.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-white border-top pt-5 position-relative">
      
      <div className="container">
        <div className="row g-4">
          {/* Marca + misión */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center mb-2">
             <img
                    src={Logo}
                    alt="Logo Delfina Store"
                    className="me-2"
                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                  />
              <span className="fw-bold">Delfina Store</span>
            </div>
            <p className="text-muted mb-3">
              Ropa para niñas con diseño moderno y amor en cada detalle.
            </p>
            <div className="d-flex gap-2">
              <a
                className="social-btn"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="social-btn"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                className="social-btn"
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="TikTok"
              >
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="col-6 col-lg-2">
            <h6 className="text-dark fw-bold mb-3">Navegación</h6>
            <ul className="list-unstyled small">
              <li><Link className="link-underline" to="/">Home</Link></li>
              <li><Link className="link-underline" to="/nosotros">Nosotros</Link></li>
              <li><Link className="link-underline" to="/carrito">Carrito</Link></li>
              <li><Link className="link-underline" to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-6 col-lg-3">
            <h6 className="text-dark fw-bold mb-3">Contacto</h6>
            <ul className="list-unstyled small mb-3">
              <li>📍 Buenos Aires, Argentina</li>
              <li>
                📧{" "}
                <a className="link-underline" href="mailto:contacto@delfinastore.com">
                  contacto@delfinastore.com
                </a>
              </li>
              <li>
                📞{" "}
                <a className="link-underline" href="tel:+5491155555555">
                  +54 9 11 5555-5555
                </a>
              </li>
              <li>🕒 Lun a Vie 10–18 h</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-lg-3">
            <h6 className="text-dark fw-bold mb-3">Suscribite</h6>
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control"
                placeholder="Tu correo"
                aria-label="Correo electrónico"
                required
              />
              <button className="btn btn-primary">Enviar</button>
            </form>
            <small className="text-muted d-block mt-2">
              Promos y novedades sin spam ✨
            </small>
          </div>
        </div>

        <hr className="my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
          <span>© {year} Delfina Store — Hecho con ❤ en Argentina</span>
          <div className="mt-2 mt-md-0">
            <a href="#" className="link-underline me-3">Términos</a>
            <a href="#" className="link-underline">Privacidad</a>
          </div>
        </div>
      </div>

      {/* Volver arriba */}
      <a
        href="#top"
        className="back-to-top btn btn-outline-primary"
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        ↑
      </a>
    </footer>
  );
}
