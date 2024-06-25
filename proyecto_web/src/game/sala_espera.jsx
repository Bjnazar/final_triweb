import Navbar from '../common/Navbar';
import './sala_espera.css';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import meones from '../assets/meones.png';
import baticristo from '../assets/baticristo.png';
import profesor from '../assets/profesor.png';
import estudiante from '../assets/estudiante.png';


function Sala_espera() {
  const { gameId } = useParams();
  const { userId } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [tablero, setTablero] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const navigate = useNavigate(); // Para redireccionar


  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/showplayers/${gameId}`);
  //       setPlayers(response.data);
  //     } catch (error) {
  //       console.error('Error al obtener los jugadores:', error);
  //     }
  //   };

  //   fetchPlayers();
  // }, [gameId]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findgame/${gameId}`);
        setOwnerId(response.data.owner);
        setGameStarted(response.data.started);
      } catch (error) {
        console.error('Error al obtener la partida:', error);
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/showplayers/${gameId}`);
        setPlayers(response.data);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    };

    const fetchPlayerId = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findwindowplayer/${gameId}/${userId}`);
        setPlayerId(response.data.id);
      } catch (error) {
        console.error('Error al obtener el playerId:', error);
      }
    };

    fetchGame();
    // Hacer la primera llamada para obtener los jugadores
    fetchPlayers();
    fetchPlayerId();

    const intervalId = setInterval(() => {
      fetchPlayers();
      fetchGame();
    }, 5000); // 1 segundo = 1000

    return () => clearInterval(intervalId);
  }, [gameId, userId]);

  useEffect(() => {
    if (gameStarted) {
      navigate(`/tablero/${gameId}`);
    }
  }, [gameStarted, navigate, gameId]);

  useEffect(() => {
    console.log('ownerId:', ownerId);
    console.log('playerId:', playerId);
  }, [ownerId, playerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gameData = {
      game_id: gameId, // Use gameId instead of hardcoding the ID
    };

    try {

      const gameStatusResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findgame/${gameId}`);
      const gameStarted = gameStatusResponse.data.started;

      if (gameStarted) {
        // Si el juego ya empezó, redirigir directamente al tablero
        navigate(`/tablero/${gameId}`);
        return;
      }

      // Requests para partir el juego (solo se debe accionar una vez)
      const response1 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/startgame/${gameId}`);
      console.log('Respuesta del servidor 1:', response1.data);
      // Este endpoint cambiará el estado de started a true

      const response2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/addboard`, gameData);
      console.log('Respuesta del servidor 2:', response2.data);

      const response22 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findboardbygameid/${gameId}`);
      console.log('Respuesta del servidor 22:', response22.data);
      const tableroData = response22.data;
      setTablero(tableroData);

      console.log("id tablero:", tableroData.id);

      const response3 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/properties/create/${tableroData.id}`);
      console.log('Respuesta del servidor 3:', response3.data);

      const response4 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/metros/create/${tableroData.id}`);
      console.log('Respuesta del servidor 4:', response4.data);

      const response5 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cards/create/${tableroData.id}`);
      console.log('Respuesta del servidor 5:', response5.data);

      // Redireccionar a la ruta /tablero después de inicializar el juego
      navigate(`/tablero/${gameId}`);
      return;
    } catch (error) {
      console.error('Error en algo:', error);
    }
  };

  const characters = [
    {
      id: 1,
      name: 'Los Meones',
      avatar: meones,
    },
    {
      id: 2,
      name: 'Baticristo',
      avatar: baticristo,
    },
    {
      id: 3,
      name: 'Profesor Rosa',
      avatar: profesor,
    },
    {
      id: 4,
      name: 'Estudiante',
      avatar: estudiante,
    },
  ];

  const characterMap = characters.reduce((map, char) => {
    map[char.id] = char;
    return map;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="sala_espera">
        <h2>Sala de Espera</h2>
        <p>Número de partida: {gameId}</p>
        <p> Debemos esperar a que hayan 4 jugadores. ¡Invita a tus amigos!</p>
        <h3>Jugadores en la partida</h3>
        <div className="players-container">
        {players.map(player => {
          const character = characterMap[player.character_id];
          return (
            <div key={player.id} className="player-card">
              <div className="player-name">{player.name}</div>
              {character && (
                <>
                  <div className="avatar-container">
                    <img src={character.avatar} alt={character.name} className="avatar" />
                  </div>
                  <div className="character-name">Personaje: {character.name}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {ownerId === playerId ? (
          players.length === 4 ? (
            <div>
              <button onClick={handleSubmit}>Jugar</button>
            </div>
          ) : (
            <div>
              <p>Podrás iniciar tu partida cuando hayan 4 jugadores.</p>
            </div>
          )
        ) : (
          <div>
            <p>Esperando que el dueño de la partida inicie el juego...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sala_espera;
