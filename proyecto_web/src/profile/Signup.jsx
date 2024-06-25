import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './../common/Navbar';
import './Login.css'; 
import {  useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        email: email,
        password: password
      }).then((response) => {
        setError(false);
        console.log('Registro exitoso! Ahora puedes iniciar sesión.');
        setMsg('Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          navigate(`/login`);
        }, 3000); // espera 3 segundos antes de redirigir al usuario
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

  return (
    <div className="page-container">
      <Navbar />
    
      <div className="login-container">

        <div className="Login">
          
          {msg.length > 0 && <div className="successMsg"> {msg} </div>}
          {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}
          <form onSubmit={handleSubmit}>
            <label>
              Nombre de usuario:
              <input 
                type="text" 
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>
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
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
