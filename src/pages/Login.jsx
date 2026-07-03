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
      try {
        const parsedUser = JSON.parse(savedUser);
        // Jika user sengaja balik ke halaman login padahal sudah masuk, kembalikan sesuai role-nya
        if (parsedUser.role === 'penjual') {
          navigate('/dashboard-penjual');
        } else {
          navigate('/beranda');
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      // Kirim email, password, dan role pilihan user ke service
      const result = await login(formData.email, formData.password, formData.role);

      // Gabungkan payload response backend dengan role-nya agar tersimpan di localStorage
      const userSession = {
        ...result,
        role: formData.role
      };
      
      localStorage.setItem('user', JSON.stringify(userSession));

      // Pengalihan halaman dinamis berdasarkan role akun
      if (formData.role === 'penjual') {
        navigate('/dashboard-penjual');
      } else {
        navigate('/beranda');
      }
    } catch (err) {
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