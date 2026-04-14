import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import AuthFormRegister from '../components/AuthFormRegister';
import AuthHeroRegister from '../components/AuthHeroRegister';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await register(formData);
      alert('Registrasi Berhasil! Silakan Login.');
      navigate('/login');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      hero={
        <AuthHeroRegister image='https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
      }
    >
      <AuthFormRegister
        handleSubmit={handleRegister}
        errorMessage={error}
        isLoading={loading}
      />
    </AuthLayout>
  );
};

export default Register;
