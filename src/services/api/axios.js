import axios from 'axios';

// public API (Local Development)
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// public API (Production Vercel)
const api = axios.create({
  baseURL: 'https://be-mobile-ecanteen.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
