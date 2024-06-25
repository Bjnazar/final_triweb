import React from 'react';
import './Cuadrado.css';

const Cuadrado = ({ nombre, area, grupo, posicion, jugadores }) => {
  let tipoClase = '';

  switch (grupo) {
    case 0:
      tipoClase = 'cuadrado-grupo-0';
      break;
    case 1:
      tipoClase = 'cuadrado-grupo-1';
      break;
    case 2:
      tipoClase = 'cuadrado-grupo-2';
      break;
    case 3:
      tipoClase = 'cuadrado-grupo-3';
      break;
    case 4:
      tipoClase = 'cuadrado-grupo-4';
      break;
    case 5:
      tipoClase = 'cuadrado-grupo-5';
      break;
    case 6:
      tipoClase = 'cuadrado-grupo-6';
      break;
    case 7:
      tipoClase = 'cuadrado-grupo-7';
      break;
    case 8:
      tipoClase = 'cuadrado-grupo-8';
      break;
    case 9:
      tipoClase = 'cuadrado-grupo-9';
      break;
    case 10:
      tipoClase = 'cuadrado-grupo-10';
      break;
    default:
      tipoClase = 'cuadrado-normal';
      break;
  }

  const style = {
    top: `${posicion.y * 100}px`,
    left: `${posicion.x * 100}px`,
    backgroundColor: colores[grupo] || '#D3D3D3' 
  };

  return (
    <div className={`cuadrado ${tipoClase}`} style={style}>
      <div className="cuadrado-nombre">{nombre}</div>
      {jugadores && jugadores.length > 0 && (
        <div className="jugadores-en-area">
          {jugadores.map(jugador => (
            <div key={jugador.id} className="jugador-nombre">
              <p>{jugador.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const colores = {
  0: '#00B9AE', 
  1: '#D72F37', 
  2: '#AEE0FA',  
  3: '#F89734',  
  4: '#D94AA7',
  5: '#08A64D',
  6: '#FED702',
  7: '#758BFD',
  8: '#AEE0FA',
  9: '#F95738',
  99: '#7A9CC6',
  10: '#955436'
};

export default Cuadrado;
