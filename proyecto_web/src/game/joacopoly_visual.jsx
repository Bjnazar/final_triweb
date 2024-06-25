import './joacopoly_visual.css';
import Cuadrado from './Cuadrado';
import React, { useEffect, useState } from 'react';

const JoacopolyVisual = ({ jugadores, tablero }) => {
  const cuadrados = [
    { nombre: 'Partida', posicion: { x: 0, y: 0 }, area: 0, grupo: 0 },
    { nombre: 'Cai', posicion: { x: 1, y: 0 }, area: 1, grupo: 1 },
    { nombre: 'Raúl Devés', posicion: { x: 2, y: 0 }, area: 2, grupo: 1 },
    { nombre: 'Metro San Joaquín', posicion: { x: 3, y: 0 }, area: 3, grupo: 2 },
    { nombre: 'Biblioteca de Humanidades', posicion: { x: 4, y: 0 }, area: 4, grupo: 3 },
    { nombre: 'Interrogación: I1', posicion: { x: 5, y: 0 }, area: 5, grupo: 4 },
    { nombre: 'Instituto de Filosofía', posicion: { x: 6, y: 0 }, area: 6, grupo: 3 },
    { nombre: 'Cárcel: Por plagio Académico', posicion: { x: 7, y: 0 }, area: 7, grupo: 99 },

    { nombre: 'Nutrición', posicion: { x: 7, y: 1 }, area: 8, grupo: 5 },
    { nombre: 'Enfermería', posicion: { x: 7, y: 2 }, area: 9, grupo: 5 },
    { nombre: 'Metro Tobalaba', posicion: { x: 7, y: 3 }, area: 10, grupo: 2 },
    { nombre: 'Escuela de Administración', posicion: { x: 7, y: 4 }, area: 11, grupo: 6 },
    { nombre: 'Interrogación: I2', posicion: { x: 7, y: 5 }, area: 12, grupo: 4 },
    { nombre: 'Instituto de Economía', posicion: { x: 7, y: 6 }, area: 13, grupo: 6 },
    { nombre: 'Semana de Receso', posicion: { x: 7, y: 7 }, area: 14, grupo: 0 },

    { nombre: 'Piscina', posicion: { x: 6, y: 7 }, area: 15, grupo: 7 },
    { nombre: 'Cancha de Voleibol', posicion: { x: 5, y: 7 }, area: 16, grupo: 7 },
    { nombre: 'Metro Baquedano', posicion: { x: 4, y: 7 }, area: 17, grupo: 2 },
    { nombre: 'Huerto San Francisco', posicion: { x: 3, y: 7 }, area: 18, grupo: 8 },
    { nombre: 'Interrogación: I3', posicion: { x: 2, y: 7 }, area: 19, grupo: 4 },
    { nombre: 'Casino de Agronomía', posicion: { x: 1, y: 7 }, area: 20, grupo: 8 },
    { nombre: 'Falta a la Integridad Académica', posicion: { x: 0, y: 7 }, area: 21, grupo: 99 },

    { nombre: 'Fork', posicion: { x: 0, y: 6 }, area: 22, grupo: 9 },
    { nombre: 'Mesa de Ping Pong', posicion: { x: 0, y: 5 }, area: 23, grupo: 9 },
    { nombre: 'Metro Vicente Valdés', posicion: { x: 0, y: 4 }, area: 24, grupo: 2 },
    { nombre: 'Aula Magna', posicion: { x: 0, y: 3 }, area: 25, grupo: 10 },
    { nombre: 'Eximición', posicion: { x: 0, y: 2 }, area: 26, grupo: 4 },
    { nombre: 'Auditorio Luksic', posicion: { x: 0, y: 1 }, area: 27, grupo: 10 },
  ];

  const [jugadoresPorArea, setJugadoresPorArea] = useState({});

  useEffect(() => {
    // Función para agrupar jugadores por área
    const agruparJugadoresPorArea = () => {
      const jugadoresAgrupados = jugadores.reduce((acc, jugador) => {
        if (!acc[jugador.area]) {
          acc[jugador.area] = [];
        }
        acc[jugador.area].push(jugador);
        return acc;
      }, {});
      setJugadoresPorArea(jugadoresAgrupados);
    };

    // Inicializar agrupación de jugadores al cargar o al cambiar los jugadores
    agruparJugadoresPorArea();

    // Intervalo para actualizar los jugadores cada segundo
    const interval = setInterval(agruparJugadoresPorArea, 1000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [jugadores]);

  return (
    <div className="joacopoly-visual">
      {cuadrados.map((cuadrado, index) => (
        <Cuadrado
          key={index}
          nombre={cuadrado.nombre}
          area={cuadrado.area}
          grupo={cuadrado.grupo}
          posicion={cuadrado.posicion}
          jugadores={jugadoresPorArea[cuadrado.area]}
        />
      ))}
    </div>
  );
};

export default JoacopolyVisual;
