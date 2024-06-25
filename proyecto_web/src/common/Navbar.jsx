import './Navbar.css';
import React from 'react';
import {useContext, useState} from 'react'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../profile/Logout';
import { AuthContext } from '../auth/AuthContext';


export default function Navbar() {
  const { token, username } = useContext(AuthContext);


  return (
    <nav className="navbar">
      <NavLink exact to="/" className="nav-link" activeClassName="active">Inicio</NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">Nosotros</NavLink>
      <NavLink to="/instructions" className="nav-link" activeClassName="active">Instrucciones</NavLink>
      <NavLink to="/player" className="nav-link" activeClassName="active">Jugar</NavLink>

      {token ? (
        <>
          <span >Bienvenido {username || 'Usuario'}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <span>Usuario no registrado</span>
          <NavLink to="/login" className="nav-link" activeClassName="active">Iniciar Sesión</NavLink>
          <NavLink to="/signup" className="nav-link" activeClassName="active">Registrarse</NavLink>
        </>
      )}
    </nav>
  );
}