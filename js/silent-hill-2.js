const { useState, useEffect } = React;

const ProductoDetalle = ({ producto }) => {
  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Producto añadido al carrito.");
  };

  return (
    <section className="bg-gray-800 rounded-lg p-6 shadow-lg glow-box flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
      <img src={producto.imagen} alt={producto.nombre} className="rounded max-w-xs w-full border-4 border-white" />

      <div className="flex-1 text-white">
        <h1 className="text-2xl font-bold mb-3">{producto.nombre}</h1>
        <p className="text-lg font-semibold mb-2">S/{producto.precio.toFixed(2)}</p>
        <p className="mb-4">{producto.descripcion}</p>
        <p><strong>Disponibilidad:</strong> {producto.disponibilidad}</p>
        <p><strong>SKU:</strong> {producto.sku}</p>
        <p><strong>Tiendas:</strong> {producto.tiendas.join(", ")}</p>

        <div className="mt-6">
          <button
            onClick={agregarAlCarrito}
            className="bg-red-500 text-white px-6 py-3 rounded font-bold text-lg hover:bg-red-400 transition"
          >
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const data = JSON.parse(document.getElementById("producto-json").textContent);
    setProducto(data);
  }, []);

  return producto ? <ProductoDetalle producto={producto} /> : <p className="text-center mt-10">Cargando...</p>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
