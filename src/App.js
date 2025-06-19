import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Разделяем состояния для логина и регистрации
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: loginEmail,
        password: loginPassword,
      });
      if (loginEmail === 'admin@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      alert('Login successful: ' + response.data.message);
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email: registerEmail,
        password: registerPassword,
      });
      alert('Registration successful: ' + response.data.message);
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      alert('Ошибка при получении пользователей!');
    }
  };

  if (isAdmin) {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{ color: "#2193b0", marginBottom: 24 }}>Администратор</h1>
          <p>Добро пожаловать, Admin!</p>
          <button onClick={fetchUsers} style={{ marginBottom: 20 }}>Показать пользователей</button>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.email}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "#2193b0", marginBottom: 24 }}>
        <span role="img" aria-label="lock">🔒</span> Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <h2 style={{ color: "#2193b0", marginTop: 24 }}>Регистрация</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </header>
    </div>
  );
}

export default App;