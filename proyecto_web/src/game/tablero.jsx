import React, { useState, useEffect } from 'react';
import Navbar from './../common/Navbar';
import './tablero.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JoacopolyVisual from './joacopoly_visual';

function Tablero() {
  const [isRollButtonVisible, setIsRollButtonVisible] = useState(true);
  const [isRollButtonVisible1, setIsRollButtonVisible1] = useState(false);
  const [isRollButtonVisible2, setIsRollButtonVisible2] = useState(false);
  const [isRollButtonVisible3, setIsRollButtonVisible3] = useState(false);
  const { gameId } = useParams();
  const [num_dado, setNumDado] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);
  const [info_compra, setInfo] = useState(null);
  const [info_propiedad, setInfo_propiedad] = useState(null);
  const [info_construccion, setInfo_construccion] = useState(null);
  const [info_carta, setInfo_carta] = useState(null);
  const [info_carta2, setInfo_carta2] = useState(null);
  const [property_info, setProperty_info] = useState(null);


  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findgame/${gameId}`);
        const playersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/showplayers/${gameId}`);
        const boardResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findboardbygameid/${gameId}`);

        setGameData(gameResponse.data);
        setPlayers(playersResponse.data);
        setBoard(boardResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  useEffect(() => {
    const interval = setInterval(fetchPlayers, 5000); 

    return () => clearInterval(interval); 
  }, []);

useEffect(() => {
  if (info_compra) {
    const timer = setTimeout(() => {
      setInfo(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [info_compra]);

useEffect(() => {
  if (info_construccion) {
    const timer = setTimeout(() => {
      setInfo_construccion(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [info_construccion]);

useEffect(() => {
  if (info_carta) {
    const timer = setTimeout(() => {
      setInfo_carta(null);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [info_carta]);

useEffect(() => {
  if (info_carta2) {
    const timer = setTimeout(() => {
      setInfo_carta2(null);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [info_carta2]);

  const fetchPlayers = async () => {
    try {
      const playersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/showplayers/${gameId}`);
      setPlayers(playersResponse.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchTurno = async () => {
    try {
      const gameResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/findgame/${gameId}`);
      setGameData(gameResponse.data);
    } catch (err) {
      setError(err);
    }
  };

  const obtenerNumeroRandom = () => {
    return Math.floor(Math.random() * 8) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameData = {
      num_dado: obtenerNumeroRandom(), // Este valor puede ser dinámico dependiendo de tu lógica
    };
    setNumDado(gameData.num_dado)
    setIsRollButtonVisible(false);
    setIsRollButtonVisible1(true);
    setIsRollButtonVisible2(true);
    setIsRollButtonVisible3(true);
    

    try {
      const response1 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/updateplayerposition/${gameId}`, gameData);
      console.log('Respuesta del servidor 1:', response1.data);
      setInfo_propiedad(response1.data)

      const response2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/getpropertytype/${gameId}`);
      console.log('Respuesta del servidor 2:', response2.data);
      const property = response2.data
      setProperty(response2.data);
      setInfo_carta();
      setInfo_carta2();
      if (property === 'interrogacion'){
        const response5 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards/interrogaciones`);
        console.log('Respuesta del servidor 5:', response5.data);
        setInfo_carta(response5.data)
    
        const response6 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/receivecard/${gameId}`,response5.data);
        console.log('Respuesta del servidor 6:', response6.data);
        setInfo_carta2(response6.data)

        

      }
      if (property === 'propiedad' || property === 'metro') {
      console.log("entrando al get")
      console.log(currentPlayer)
  
      const response8 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/getproperty_info_total/${gameId}`);
      console.log("respuesta servidor 8:", response8.data);
      setProperty_info(response8.data)
      }
      // Después de actualizar la posición del jugador, obtener nuevamente los datos de los jugadores
      setInfo();
      setInfo_construccion();
      fetchPlayers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      if (property === 'propiedad') {
      const response2 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/updateplayerproperty/${gameId}`);
      console.log('Respuesta del servidor 2:', response2.data);
      setInfo(response2.data);
    }

      else {
        const response2 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/updateplayermetro/${gameId}`);
        console.log('Respuesta del servidor 2:', response2.data);
        setInfo(response2.data);
      }

      fetchPlayers();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    setIsRollButtonVisible(true);
    setIsRollButtonVisible1(false);
    setIsRollButtonVisible2(false);
    setIsRollButtonVisible3(false);
    setInfo_propiedad();
    setInfo();
    setInfo_carta();
    setInfo_carta2;
    setInfo_construccion();
    setProperty_info();

    try {
      const response3 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/updateactualplayer/${gameId}`);
      console.log('Respuesta del servidor 3:', response3.data);

      fetchTurno();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSubmit4 = async (e) => {
    e.preventDefault();

    try {
      const response3 = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/buybuilding/${gameId}`);
      console.log('Respuesta del servidor 3:', response3.data);
      setInfo_construccion(response3.data);

      fetchPlayers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentPlayer = players.find(player => player.id === gameData?.actual_player);

return (
  <div>
    <Navbar />
    <div className="tablero">
      <h1>JOACOPOLY</h1>
      <div className="content-container">
        <div className="board-container">
          {/* <img src={tableroImg} alt="Tablero" className="board-image" /> */}
          <JoacopolyVisual 
              jugadores={players}
              tablero={board}
            />
        </div>
        <div className="info-container">
          <div className="controls">
          {isRollButtonVisible && <button onClick={handleSubmit}>Tirar Dado</button>}
            {isRollButtonVisible2 &&(property === 'propiedad' || property === 'metro') && <button onClick={handleSubmit2}>Comprar</button>}
            {isRollButtonVisible3 &&(property === 'propiedad') && <button onClick={handleSubmit4}>Construir</button>}
            {isRollButtonVisible1 && <button onClick={handleSubmit3}>Siguiente turno</button>}
          </div>
          <div className="info-section">
            <h3>Información de Propiedad</h3>
            <p>{info_propiedad}</p>
            <h3>Información de Compra</h3>
            <p>{info_compra}</p>
            <h3>Información de Construcción</h3>
            <p>{info_construccion}</p>
            <h3>Información de Carta</h3>
            {info_carta && info_carta.info && (
            <p>{info_carta.info}</p>
            )}
            <p>{info_carta2}</p>
          </div>
          <div className = "info-section">
          <h2>Detalles de Propiedad</h2>
          <p>
  {(property === 'propiedad' || property === 'metro') && (
    <>
      <strong>Price: </strong>{property_info?.price}
    </>
  )}
</p>
<p>
  {property === 'propiedad' && (
    <>
      <strong>Building Price: </strong>{property_info?.building_price}
    </>
  )}
</p>
<p>
  {property === 'propiedad' && (
    <>
      <strong>Buildings: </strong>{property_info?.buildings}
    </>
  )}
</p>
<p>
  {(property === 'propiedad' || property === 'metro') && (
    <>
      <strong>Name: </strong>{property_info?.name}
    </>
  )}
</p>
<p>
  {property === 'metro' && (
    <>
      <strong>Ticket Price Metro: </strong>{property_info?.ticket_price}
    </>
  )}
</p>





          </div>
            <div className="game-details">
              <h2>Detalles del Juego</h2>
              <p><strong>Número Dado:</strong> {num_dado}</p>
              <p><strong>Número Partida:</strong> {gameData.id}</p>
              {gameData.winner && <p><strong>Ganador:</strong> {gameData.winner}</p>}
              {currentPlayer && <p><strong>Jugador Actual:</strong> {currentPlayer.name}</p>}
            </div>
            <div className="player-details">
              <h2>Jugadores</h2>
              <div className="players">
                {players.map(player => (
                  <div 
                    key={player.id}
                    className={`player-card ${player.id === gameData.actual_player ? 'current-player' : ''}`}
                  >
                    <p>{player.name}</p>
                    {player.id === gameData.owner && <p>Dueño de la partida</p>}
                    <p>Efectivo: {player.cash}</p>
                    <p>Área: {player.area}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);
}


export default Tablero;

