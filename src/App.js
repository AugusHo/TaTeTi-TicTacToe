import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [bloques, setBloques] = useState(Array(9).fill(null));
  const [turnoX, setTurnoX] = useState(true);
  const [ganador, setGanador] = useState(null);
  const [victoriasX, setVictoriasX] = useState(0);
  const [victoriasO, setVictoriasO] = useState(0);	

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
      //setGanador(comprobarGanador(nuevoBloques));
      //hasta aca es lo viejo
      const ganadorActual = comprobarGanador(nuevoBloques);
      if (ganadorActual) {
        setGanador(ganadorActual);
        if (ganadorActual === 'X') {
          const victorias = victoriasX + 1;
          setVictoriasX(victorias);
          localStorage.setItem('victoriasX', victorias);
        } else if (ganadorActual === 'O') {
          const victorias = victoriasO + 1;
          setVictoriasO(victorias);
          localStorage.setItem('victoriasO', victorias);
        }
      }
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


  useEffect(() => {
    const victoriasXGuardadas = localStorage.getItem('victoriasX');
    const victoriasOGuardadas = localStorage.getItem('victoriasO');
    if (victoriasXGuardadas) {
      setVictoriasX(parseInt(victoriasXGuardadas));
    }
    if (victoriasOGuardadas) {
      setVictoriasO(parseInt(victoriasOGuardadas));
    }
  }, []);

  return (
    <div className="App">
      <h1 >
        <div className='texto-colorido'>Tic Tac Toe</div>
      </h1>
      <div className="texto-colorido">{mensaje()}</div>
      <div className='tablero'>
        {bloques.map((value, id) => (
            <div key={id} className={`bloque ${value}`} onClick={() => handleClick(id)}>
              {value}
            </div>
          ))}
      </div>
      <div className="victorias">
        <div>Victorias X: {victoriasX}  ||  Victorias O: {victoriasO}</div>
      </div>
      <div >
        {(ganador || !bloques.includes(null)) && <button className="botón-estético" onClick={reiniciar}>Reiniciar</button>}
      </div>
      <div className="copyright">© 2024 Juego de Tic-Tac-Toe que hice para aprender, todos los derechos reservados.</div>
    </div>
  );
}

export default App;
