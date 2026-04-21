import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const notesApi = {
  getAll: (search = '') =>
    api.get('/notes' + (search ? '?search=' + encodeURIComponent(search) : '')),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put('/notes/' + id, data),
  delete: (id) => api.delete('/notes/' + id),
};

export default api;
