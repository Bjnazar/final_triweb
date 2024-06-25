import React, { useState, useContext } from 'react';
import axios from 'axios'; 
import Navbar from './../common/Navbar';
import { Link } from 'react-router-dom';
import './Player.css';
import { AuthContext } from '../auth/AuthContext';

function Player() {
  const { userId } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [character_id, setIdCharacter] = useState('');
  const [idPartida, setIdPartida] = useState('');
  const [playerCreated, setPlayerCreated] = useState(false);
  const [error, setError] = useState(null);
  const [createGame, setCreateGame] = useState(false);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleIdCharacterChange = (e) => {
    setIdCharacter(e.target.value);
  };

  const handleIdPartidaChange = (e) => {
    setIdPartida(e.target.value);
  };

  const handleOptionChange = (e) => {
    setCreateGame(e.target.value === 'create');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
  const user_Id = userId ? userId : null;

    try {
      // Crear partida si es necesario
      let game_id = idPartida;
      let player_id = null;
      if (createGame) {
        const gameResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/newgame`, {});
        game_id = gameResponse.data.id;
        setIdPartida(game_id); // Actualizar el ID de la partida con el nuevo ID
      }

      const playerData = {
        name: nombre,
        user_id: user_Id,
        game_id: game_id,
        character_id: character_id,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/addplayer`, playerData);
      console.log('Respuesta del servidor:', response.data);
      setPlayerCreated(true);
      player_id = response.data.id;
      setError(null);

      if(createGame && player_id){
        await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/setowner/${game_id}`, {player_id});
        console.log('owner seteado');
      }

    } catch (error) {
      console.error('Error al añadir el jugador:', error);
      setError(error.response.data)
    }
  };

  const handleUnirseClick = () => {
    setError(null); // Restablecer el estado de error
  };

  return (
    <div>
      <Navbar />
      <div className="player">
        <div className="formulario-container">
          <h2>¡Únete a una partida o crea una nueva!</h2>
          {error && <div className="error">{error}</div>}
          {!playerCreated && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="join"
                    checked={!createGame}
                    onChange={handleOptionChange}
                  />
                  Unirse a una partida existente
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="create"
                    checked={createGame}
                    onChange={handleOptionChange}
                  />
                  Crear una nueva partida
                </label>
              </div>
              
              {!createGame && (
                <div className="form-group">
                  <label htmlFor="idPartida">ID de la partida:</label>
                  <input
                    type="number"
                    id="idPartida"
                    value={idPartida}
                    min="0"
                    required={!createGame} // solo si se une a una partida q ya existe
                    onChange={handleIdPartidaChange}
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="nombre">Nombre del jugador:</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  required
                  onChange={handleNombreChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="character_id">Personaje:</label> <br></br>
                <select
                  id="character_id"
                  value={character_id}
                  required
                  onChange={handleIdCharacterChange}
                >
                  <option value="">Selecciona un personaje</option>
                  <option value="1">Los Meones</option>
                  <option value="2">Baticristo</option>
                  <option value="3">Profesor Rosa</option>
                  <option value="4">Estudiante</option>
                </select>
              </div>
              <button type="submit">{createGame ? 'Crear Partida y Player' : 'Crear Player'}</button>
            </form>
          )}
          {playerCreated && (
            <div>
            <p>Estás listo para empezar a jugar en la partida {idPartida}. </p>
            <Link to={`/sala_espera/${idPartida}`}>
              <button onClick={handleUnirseClick}>Unirse</button>
            </Link>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Player;