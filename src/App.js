import './App.css';
import React, { useState } from 'react';


function App() {
  const [bloques, setBloques] = useState(Array(9).fill(null));
  const [turnoX, setTurnoX] = useState(true);
  const [ganador, setGanador] = useState(null);	

  const comprobarGanador = (bloques) => {
    const lineasGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lineasGanadoras.length; i++){
      const [a, b, c] = lineasGanadoras[i];
      if (bloques[a] && bloques[a] === bloques[b] && bloques[a] === bloques[c]){
        return bloques[a];
      }
    }

    return null;
  };

  const handleClick = (id) => {
    if (bloques[id] === null && !ganador){
      const nuevoBloques = [...bloques];
      nuevoBloques[id] = turnoX ? 'X' : 'O'; //Alternar entre X y O
      setBloques(nuevoBloques);
      setTurnoX(!turnoX);
      setGanador(comprobarGanador(nuevoBloques));
    }
  };

  const reiniciar = () => {
    setBloques(Array(9).fill(null));
    setTurnoX(true);
    setGanador(null);
  };

  const mensaje = () => {
    if (ganador) {
      return 'Ganador: ' + ganador;
    } else if (!bloques.includes(null)) {
      return 'Empate';
    } else {
      return 'Turno de: ' + (turnoX ? 'X' : 'O');
    }
  };


  return (
    <div className="App">
      <h1 >Tic - Tac - Toe</h1>
    
      <div className='tablero'>
      {bloques.map((value, id) => (
          <div key={id} className="bloque" onClick={() => handleClick(id)}>
            {value}
          </div>
        ))}
      </div>
      <div className="mensaje">{mensaje()}</div>
      {(ganador || !bloques.includes(null)) && <button onClick={reiniciar}>Reiniciar</button>}

      <div className="copyright">© 2024 Juego de Tic-Tac-Toe que hice para aprender, todos los derechos reservados.</div>
    </div>
  );
}

export default App;
