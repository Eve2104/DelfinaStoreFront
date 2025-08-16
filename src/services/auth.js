import api from './api';

export const auth = {
  me:       () => api.get('/auth/me').then(r=>r.data),
  login:    (email, password) => api.post('/auth/login', { email, password }).then(r=>r.data),
  register: (nombre, email, password) => api.post('/auth/register', { nombre, email, password }).then(r=>r.data),
  logout:   () => api.post('/auth/logout').then(r=>r.data),
};
