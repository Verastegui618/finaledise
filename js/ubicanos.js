const { useEffect, useState } = React;

const Ubicacion = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const raw = document.getElementById("ubicacion-data").textContent;
    setData(JSON.parse(raw));
  }, []);

  if (!data) return <div className="text-center mt-10">Cargando...</div>;

  return (
    <div className="flex flex-col items-center">
      <header className="bg-[#900026] w-full text-center py-4 text-2xl font-bold">
        {data.titulo}
      </header>

      <main className="p-8 max-w-4xl text-center space-y-6">
        <h2 className="text-[#ff4757] text-3xl font-semibold">{data.subtitulo}</h2>
        <p className="text-lg">{data.descripcion}</p>

        <div className="flex justify-center">
          <iframe
            src={data.mapa}
            allowFullScreen=""
            loading="lazy"
            className="w-full max-w-3xl h-[400px]"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>

      <img src={data.logo} alt="Logo FiaGamer" className="fixed bottom-4 right-4 w-[60px]" />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Ubicacion />);
