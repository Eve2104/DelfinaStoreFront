import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <section className="py-5 bg-light nosotros-section">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-9">
            <h2 className="display-6 fw-bold text-primary mb-3">
              ✨ Vistiendo Sueños, Creando Sonrisas ✨
            </h2>
            <p className="lead text-muted">
              En <strong>Delfina Store</strong>, creemos que cada niña merece sentirse especial y única.
              Diseñamos ropa con amor, combinando comodidad, estilo y calidad para que cada prenda
              sea una expresión de alegría y ternura.
            </p>
            <p className="lead text-muted">
              Desde pequeños detalles hasta grandes tendencias, nuestra misión es hacer que cada
              momento sea mágico. Porque la moda no es solo vestir, es una forma de soñar.
            </p>
            <p className="cta fs-4 fw-semibold text-danger-emphasis">
              Únite a nuestra comunidad y hagamos que cada día sea una pasarela de felicidad. 💖
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🧵</div>
                <h5 className="fw-bold">Calidad</h5>
                <p className="text-muted small">Materiales suaves y duraderos para acompañar su día a día.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🎨</div>
                <h5 className="fw-bold">Diseño</h5>
                <p className="text-muted small">Estilos actuales con detalles que enamoran.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🌸</div>
                <h5 className="fw-bold">Comodidad</h5>
                <p className="text-muted small">Prendas pensadas para jugar, explorar y soñar.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🤝</div>
                <h5 className="fw-bold">Compromiso</h5>
                <p className="text-muted small">Cerca tuyo, con atención cálida y humana.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <Link to="/" className="btn btn-primary btn-lg px-4">
            Conocé nuestros productos
          </Link>
        </div>
      </div>
    </section>
  );
}
