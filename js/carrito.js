const { useState, useEffect } = React;

const Producto = ({ producto }) => (
  <div className="bg-white text-black rounded-lg p-4 flex items-center gap-4 shadow-md mb-4">
    <img src={producto.imagen} alt={producto.nombre} className="w-24 rounded" />
    <div>
      <h3 className="text-xl font-bold">{producto.nombre}</h3>
      <p><strong>Precio:</strong> S/{producto.precio.toFixed(2)}</p>
    </div>
  </div>
);

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("../data/carrito.json")
      .then(res => res.json())
      .then(data => setCarrito(data))
      .catch(() => {
        const local = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(local);
      });
  }, []);

  const realizarCompra = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }
    alert("¡La compra se ha realizado correctamente!");
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  return (
    <div>
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
        onClick={() => window.history.back()}
      >
        ⬅ Volver
      </button>

      {carrito.length === 0 ? (
        <p>No has añadido ningún producto aún.</p>
      ) : (
        carrito.map((producto, i) => (
          <Producto key={i} producto={producto} />
        ))
      )}

      <button
        id="btn-compra"
        className={`mt-6 mx-auto block px-8 py-3 text-lg font-bold rounded-full shadow transition ${
          carrito.length === 0
            ? "bg-red-400 opacity-50 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-400"
        }`}
        onClick={realizarCompra}
        disabled={carrito.length === 0}
      >
        Hacer compra
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Carrito />);
