import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Успішна реєстрація!');
      navigate('/login');
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Реєстрація</h2>

        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Ім'я</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Іван Іваненко"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label>Пароль</label>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Зачекайте...' : 'Зареєструватися'}
          </button>
        </form>

        <p className="auth-footer">
          Вже є акаунт?{' '}
          <Link to="/login" className="auth-link">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;