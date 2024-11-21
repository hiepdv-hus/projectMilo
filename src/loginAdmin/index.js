import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleLogin(username, password)) {
      navigate('/admin'); // Điều hướng đến trang admin sau khi đăng nhập thành công
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <div>
        <div className='auth-overlay'></div>
        <div className='auth-form'>
            <h2>Đăng Nhập</h2>
            <form onSubmit={onSubmit}>
                <div>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
