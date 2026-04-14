import AuthLayout from '../layouts/AuthLayout';
import AuthFormLogin from '../components/AuthFormLogin';
import AuthHeroLogin from '../components/AuthHeroLogin';
import kantin from '../assets/kantin.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (formData) => {
    // Mulai loading
    setLoading(true);

    try {
      // Kirim data ke backend
      const result = await login(formData.email, formData.password);

      // Jika berhasil, simpan data ke localStorage
      localStorage.setItem('user', JSON.stringify(result));

      // Arahkan ke dashboard
      navigate('/dashboard');
    } catch (err) {
      // Jika salah, tampilkan pesan error
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout reverse={true} hero={<AuthHeroLogin image={kantin} />}>
      <AuthFormLogin
        handleSubmit={handleSubmit}
        errorMessage={error}
        isLoading={loading}
      />
    </AuthLayout>
  );
};

export default Login;
