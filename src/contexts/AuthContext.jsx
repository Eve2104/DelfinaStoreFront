import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

// servicios mínimos
const authApi = {
  me:       () => api.get('/auth/me').then(r=>r.data),
  login:    (email, password) => api.post('/auth/login', { email, password }).then(r=>r.data),
  register: (nombre, email, password) => api.post('/auth/register', { nombre, email, password }).then(r=>r.data),
  logout:   () => api.post('/auth/logout').then(r=>r.data),
};

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    authApi.me().then(d => { if(!cancel) setUser(d.user); })
                .catch(()=>{})
                .finally(()=>{ if(!cancel) setLoading(false); });
    return ()=>{ cancel = true; };
  }, []);

  const login    = async (email, password) => { const d = await authApi.login(email, password); setUser(d.user); return d; };
  const register = async (nombre, email, password) => { const d = await authApi.register(nombre, email, password); setUser(d.user); return d; };
  const logout   = async () => { await authApi.logout(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
