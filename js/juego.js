const { useState, useEffect, useRef } = React;

const Juego = () => {
  const config = JSON.parse(document.getElementById("juego-config").textContent);
  const [vidas, setVidas] = useState(config.vidas);
  const [tiempo, setTiempo] = useState(config.tiempo);
  const [puntos, setPuntos] = useState(0);
  const [posicion, setPosicion] = useState({ x: 100, y: 100 });
  const [jugando, setJugando] = useState(false);
  const [mostrarGato, setMostrarGato] = useState(false);
  const intervaloRef = useRef(null);

  const iniciarJuego = () => {
    setVidas(config.vidas);
    setPuntos(0);
    setJugando(true);
    siguienteRonda();
  };

  const siguienteRonda = () => {
    clearInterval(intervaloRef.current);
    setTiempo(config.tiempo);
    setMostrarGato(true);
    posicionarGato();

    intervaloRef.current = setInterval(() => {
      setTiempo(prev => {
        if (prev <= 1) {
          perderVida();
          return config.tiempo;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const perderVida = () => {
    clearInterval(intervaloRef.current);
    setVidas(v => {
      if (v <= 1) {
        alert(`😿 Fin del juego. Puntaje: ${puntos}`);
        setJugando(false);
        setMostrarGato(false);
        return 0;
      }
      siguienteRonda();
      return v - 1;
    });
  };

  const posicionarGato = () => {
    const contenedor = document.getElementById("game-container");
    if (!contenedor) return;
    const maxX = contenedor.offsetWidth - 100;
    const maxY = contenedor.offsetHeight - 100;
    const nuevoX = Math.floor(Math.random() * maxX);
    const nuevoY = Math.floor(Math.random() * maxY);
    setPosicion({ x: nuevoX, y: nuevoY });
  };

  const clickGato = () => {
    setPuntos(p => p + config.puntosPorGato);
    siguienteRonda();
  };

  useEffect(() => {
    return () => clearInterval(intervaloRef.current);
  }, []);

  return (
    <div className="text-center space-y-6 text-white">
      <h1 className="text-3xl font-bold">🐱 ¡Encuentra al Gato! 🏛️</h1>
      <div id="game-container">
        <img
          src="../imagenes/coliseo.png"
          alt="Coliseo"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        {mostrarGato && (
          <img
            src="../imagenes/gato.png"
            alt="Gato"
            id="gato"
            onClick={clickGato}
            className="absolute z-10"
            style={{
              top: `${posicion.y}px`,
              left: `${posicion.x}px`,
              width: '30px', // tamaño grande para verlo
            }}
          />
        )}
      </div>
      <div className="text-lg space-y-1">
        <p>⏱️ Tiempo: <span>{tiempo}</span>s</p>
        <p>❤️ Vidas: <span>{vidas}</span></p>
        <p>⭐ Puntos: <span>{puntos}</span></p>
      </div>
      <button
        onClick={iniciarJuego}
        className="bg-yellow-400 text-black px-6 py-3 rounded font-bold text-lg hover:bg-yellow-300 transition"
      >
        {jugando ? "Reiniciar" : "Iniciar Juego"}
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Juego />);
