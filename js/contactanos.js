const { useState, useEffect } = React;

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("mensajesFiaGamer")) || [];
    setMensajes(guardados);
  }, []);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) return;

    const nuevoMensaje = {
      id: Date.now(),
      nombre,
      mensaje
    };

    const actualizados = [...mensajes, nuevoMensaje];
    setMensajes(actualizados);
    localStorage.setItem("mensajesFiaGamer", JSON.stringify(actualizados));
    setMensaje("");
  };

  return (
    <div className="text-center space-y-6">
      {/* Botón de Volver */}
      <button
        onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "index.html"}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-bold mb-4"
      >
        ⬅ Volver
      </button>

      <h2 className="text-3xl text-pink-500 font-bold">
        ¡Dinos tus quejas, sugerencias o elogios!
      </h2>
      <p className="text-gray-300">
        Puedes dejar un mensaje público visible para todos. ¡Tu opinión importa!
      </p>

      <form onSubmit={enviarMensaje} className="bg-white text-black p-6 rounded space-y-4 shadow-md">
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full p-2 border border-pink-700 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Tu mensaje"
          className="w-full p-2 border border-pink-700 rounded"
          rows="3"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded font-bold"
        >
          Enviar
        </button>
      </form>

      <div className="bg-gray-800 rounded p-4 space-y-3 max-h-[300px] overflow-y-auto text-left shadow-inner">
        {mensajes.length === 0 ? (
          <p className="text-gray-400 italic">Aún no hay mensajes.</p>
        ) : (
          mensajes.map((msg) => (
            <div key={msg.id} className="bg-black bg-opacity-50 p-2 rounded border border-pink-700">
              <p className="font-bold text-pink-400">{msg.nombre}:</p>
              <p className="text-white">{msg.mensaje}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Contacto />);
