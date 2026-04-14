import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-mobile-ecanteen.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
