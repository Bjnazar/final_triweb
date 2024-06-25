import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import Navbar from './../common/Navbar';


function Login() {
  // const { token, setToken } = useContext(AuthContext);
  const { token, setToken, setUsername, setUserId, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email: email,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const {access_token, username, user_id} = response.data;
        setToken(access_token);
        setUsername(username);
        setUserId(user_id);
        localStorage.setItem('token', access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', user_id);
        console.log("Se seteo el token: ", token);
        console.log("Se seteo el username: ", username);
        console.log("Se seteo el userId: ", user_id);
        
      }).catch((error) => {
        console.error('Hubo un error con el Login, por favor trata nuevamente.', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <div className="page-container">
      <Navbar />
      <div className="login-container">
    
        <div className="Login">
          {msg.length > 0 && <div className="successMsg"> {msg} </div>}

          {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
          {!token && (
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Contraseña:
              <input 
                type="password" 
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <input type="submit" value="Enviar" />
          </form>
         )}
        </div>
      </div>
    </div>
    
  );
}

export default Login;