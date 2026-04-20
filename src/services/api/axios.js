import axios from 'axios';

// public API
const api = axios.create({
  baseURL: 'https://be-mobile-ecanteen.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// const api = axios.create({
//   baseURL: 'localhost:3000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export default api;
