const { useState, useEffect } = React;

const Filtros = ({ categoriaActual, filtrar }) => {
  const categorias = ["todos", "terror", "aventura", "diversion"];
  return (
    <div className="text-center my-6">
      <h2 className="text-xl font-bold mb-2">🎮 Filtrar por:</h2>
      {categorias.map(cat => (
        <button
          key={cat}
          onClick={() => filtrar(cat)}
          className={`m-1 px-4 py-2 rounded font-bold ${
            categoriaActual === cat ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

const Producto = ({ producto }) => (
  <a
    href={producto.link}
    data-categoria={producto.categoria}
    className="bg-gray-800 rounded-xl p-4 text-center w-full max-w-xs glow-card"
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <img src={producto.imagen} alt={producto.titulo} className="rounded-lg w-full mb-3" />
    <h3 className="font-bold text-lg mb-1">{producto.titulo}</h3>
    <p className="text-sm">{producto.descripcion}</p>
  </a>
);

const App = () => {
  const [categoria, setCategoria] = useState("todos");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("../data/tienda.json")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const productosFiltrados = categoria === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoria);

  return (
    <div>
      <Filtros categoriaActual={categoria} filtrar={setCategoria} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {productosFiltrados.map((producto, index) => (
          <Producto key={index} producto={producto} />
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
