import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Contacto() {
  const { user } = useAuth(); // 👈 datos de la sesión
  const [useAccountEmail, setUseAccountEmail] = useState(!!user);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "Consulta general",
    mensaje: "",
    acepta: true,
    website: "", // honeypot anti-bots
  });

  // Prefill cuando llega el usuario o cambia
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      nombre: f.nombre || user.nombre || "",
      email: useAccountEmail ? (user.email || f.email) : f.email,
    }));
    // si hay cuenta, por defecto usamos el email de la cuenta
    setUseAccountEmail(true);
  }, [user]);

  // Si el usuario alterna usar/no usar email de la cuenta
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      email: useAccountEmail ? user.email : (f.email || ""),
    }));
  }, [useAccountEmail, user]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const buildMailto = () => {
    const subject = `[Contacto] ${form.motivo} — ${form.nombre || "Cliente"}`;
    const bodyLines = [
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      form.telefono ? `Teléfono: ${form.telefono}` : null,
      `Motivo: ${form.motivo}`,
      "",
      "Mensaje:",
      form.mensaje,
      "",
      `Acepta novedades: ${form.acepta ? "Sí" : "No"}`,
    ].filter(Boolean);
    return `mailto:contacto@delfinastore.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.website) return; // bot
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      alert("Completá nombre, email y mensaje 🙂");
      return;
    }
    window.location.href = buildMailto();
  };

  return (
    <div className="container-xl py-4">
      <section className="contact-hero rounded-4 p-4 p-md-5 mb-4">
        <h1 className="display-6 fw-bold mb-2">¡Hablemos! ✨</h1>
        <p className="lead m-0 text-muted">
          Contanos tu consulta y te respondemos a la brevedad.
        </p>
      </section>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 contact-card">
            <div className="card-body p-4 p-md-5">
              <h2 className="h4 mb-3">Formulario de contacto</h2>

              <form onSubmit={onSubmit} noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  className="d-none"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={onChange}
                        required
                      />
                      <label htmlFor="nombre">Nombre</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="tu@mail.com"
                        value={form.email}
                        onChange={onChange}
                        required
                        disabled={!!user && useAccountEmail} // 👈 bloquea si usa el de la cuenta
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    {!!user && (
                      <div className="form-text d-flex align-items-center gap-2">
                        <input
                          id="useAccountEmail"
                          type="checkbox"
                          className="form-check-input me-1"
                          checked={useAccountEmail}
                          onChange={(e) => setUseAccountEmail(e.target.checked)}
                        />
                        <label htmlFor="useAccountEmail" className="form-check-label">
                          Usar el email de mi cuenta ({user.email})
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        placeholder="+54 9 ..."
                        value={form.telefono}
                        onChange={onChange}
                      />
                      <label htmlFor="telefono">Teléfono (opcional)</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="motivo"
                        name="motivo"
                        value={form.motivo}
                        onChange={onChange}
                      >
                        <option>Consulta general</option>
                        <option>Estado de pedido</option>
                        <option>Talle / Medidas</option>
                        <option>Devoluciones y cambios</option>
                        <option>Mayorista</option>
                      </select>
                      <label htmlFor="motivo">Motivo</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="mensaje"
                        name="mensaje"
                        style={{ height: 140 }}
                        placeholder="Tu mensaje"
                        value={form.mensaje}
                        onChange={onChange}
                        required
                      />
                      <label htmlFor="mensaje">Mensaje</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="acepta"
                        name="acepta"
                        checked={form.acepta}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor="acepta">
                        Quiero recibir novedades y promos (sin spam).
                      </label>
                    </div>
                  </div>

                  <div className="col-12 d-grid gap-2 d-sm-flex">
                    <button className="btn btn-primary btn-lg" type="submit">
                      Enviar con mi correo ✉️
                    </button>
                  </div>
                </div>
              </form>

              <p className="small text-muted mt-3 mb-0">
                Se abrirá tu app de correo con el mensaje listo para enviar.
              </p>
            </div>
          </div>
        </div>

        {/* Info + mapa */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4 p-md-5 d-flex flex-column">
              <h2 className="h5">Otros medios</h2>
              <ul className="list-unstyled small text-muted mb-3">
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
                <li>📍 Buenos Aires, Argentina</li>
              </ul>
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm mt-auto">
                <iframe
                  title="Mapa - Buenos Aires"
                  src="https://www.google.com/maps?q=Buenos%20Aires%2C%20Argentina&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
