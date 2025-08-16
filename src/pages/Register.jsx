import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register(){
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true); setErr("");
      await register(nombre, email, password);
      navigate('/');
    }catch(ex){
      setErr(ex?.response?.data?.message || "Error al registrar");
    }finally{ setLoading(false); }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Crear cuenta</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="d-grid gap-3">
        <div className="form-floating">
          <input className="form-control" id="nombre" placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required />
          <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control" id="email" placeholder="tu@mail.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" placeholder="••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
          <label htmlFor="password">Contraseña</label>
        </div>
        <button className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>
      <p className="mt-3 small text-muted">¿Ya tenés cuenta? <Link to="/login">Ingresar</Link></p>
    </div>
  );
}
