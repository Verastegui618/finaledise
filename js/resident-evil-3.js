const { useEffect, useState } = React;

const ProductoDetalle = ({ producto }) => {
  const agregarAlCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Producto añadido al carrito.");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full max-w-sm border-4 border-white rounded-md bg-white"
      />

      <div className="glow-box p-6 max-w-xl text-white">
        <h1 className="text-2xl font-bold mb-3">{producto.nombre}</h1>
        <p className="text-lg font-semibold mb-2">S/{producto.precio.toFixed(2)}</p>
        <p className="mb-4">{producto.descripcion}</p>

        <p className="mb-2 font-semibold">Incluye:</p>
        <ul className="list-disc list-inside mb-4">
          {producto.incluye.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="mb-1"><strong>Disponibilidad:</strong> {producto.disponibilidad}</p>
        <p className="mb-1"><strong>SKU:</strong> {producto.sku}</p>
        <p className="mb-4"><strong>Tiendas:</strong> {producto.tiendas.join(", ")}</p>

        <button
          onClick={agregarAlCarrito}
          className="bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-300 transition"
        >
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const data = JSON.parse(document.getElementById("producto-json").textContent);
    setProducto(data);
  }, []);

  return producto ? <ProductoDetalle producto={producto} /> : <p>Cargando...</p>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
