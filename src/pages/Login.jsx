import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('next') || '/';

  const submit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true); setErr("");
      await login(email, password);
      navigate(redirect);
    }catch(ex){
      setErr(ex?.response?.data?.message || "Error de login");
    }finally{ setLoading(false); }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Ingresar</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="d-grid gap-3">
        <div className="form-floating">
          <input type="email" className="form-control" id="email" placeholder="tu@mail.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" placeholder="••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
          <label htmlFor="password">Contraseña</label>
        </div>
        <button className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
      <p className="mt-3 small text-muted">¿No tenés cuenta? <Link to="/registro">Crear cuenta</Link></p>
    </div>
  );
}
