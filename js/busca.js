const { useState, useEffect } = React;

const Producto = ({ producto }) => (
  <a href={producto.url} className="text-black no-underline">
    <div className="bg-red-700 border-2 border-black rounded-lg w-56 text-center p-2 card cursor-pointer">
      <img src={producto.imagen} alt={producto.nombre} className="w-full rounded-t-md border-b border-black" />
      <p className="mt-2 text-sm">
        Disponible<br />
        {producto.nombre}<br />
        {producto.descripcion}<br />
        <strong>{producto.precio}</strong>
      </p>
    </div>
  </a>
);

const Buscador = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch("../data/busca.json")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Barra */}
      <header className="bg-red-800 p-4 flex gap-4 items-center border-b-2 border-black">
        <a href="index.html" title="Inicio" className="text-black text-xl">🏠</a>
        <span onClick={() => document.getElementById("buscador").focus()} className="cursor-pointer text-xl">🔍</span>
        <a href="contactanos.html" className="text-xl">✉️</a>
        <a href="ubicanos.html" className="text-xl">📌</a>
        <a href="carrito.html" className="text-xl">🛒</a>
        <a href="juego.html" className="text-xl">🎮</a>
      </header>

      {/* Buscador */}
      <section className="flex justify-center my-6 px-4">
        <input
          id="buscador"
          type="text"
          placeholder="Busca lo que quieras..."
          className="w-full max-w-xl p-3 border-2 border-black rounded-md bg-red-700 text-black focus:outline-none focus:ring-2"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </section>

      {/* Productos */}
      <main className="flex flex-wrap justify-center gap-6 px-4">
        {productosFiltrados.map((producto, index) => (
          <Producto key={index} producto={producto} />
        ))}
      </main>

      {/* Logo */}
      <img src="../imagenes/imagen6.png" alt="Logo FIA GAMER" className="block mx-auto my-10 max-w-[150px]" />

      {/* Footer */}
      <footer className="bg-red-800 text-black p-6 text-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-6">
          <div>
            <h3 className="font-bold text-lg"><span className="font-bold">FIA</span> GAMER</h3>
            <p>Especialistas en videojuegos y aventuras épicas desde 2020.</p>
            <div className="flex gap-3 mt-2 text-xl">
              <a href="#">📷</a><a href="#">🐦</a><a href="#">📘</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Contacto</h4>
            <p>📍 Av. Gaming Pro 404, Gamerland 4040, Perú</p>
            <p>📞 +51 999 888 777</p>
            <p>✉️ contacto@fiagamer.com</p>
          </div>
          <div>
            <h4 className="font-bold">Horario</h4>
            <p>🕒 Lunes a Viernes 9:00 AM – 7:00 PM</p>
            <p>🕒 Sábados 9:00 AM – 2:00 PM</p>
          </div>
        </div>
        <div className="text-center mt-6 border-t border-black pt-4 text-xs text-gray-800">
          © 2025 FIA GAMER. Todos los derechos reservados. | Desarrollado con ❤️
        </div>
      </footer>
    </div>
  );
};

ReactDOM.render(<Buscador />, document.getElementById("root"));
