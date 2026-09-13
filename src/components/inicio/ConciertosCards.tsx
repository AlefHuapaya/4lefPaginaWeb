const conciertos = [
  {
    nombre: "Teleticket",
    url: "https://www.teleticket.com.pe/",
    descripcion: "Cartelera oficial de conciertos y eventos en Perú.",
  },
  {
    nombre: "Joinnus",
    url: "https://www.joinnus.com/",
    descripcion: "Otra plataforma de venta de entradas para eventos.",
  },
] as const;

export function ConciertosCards() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="font-semibold text-slate-900">Conciertos</h2>
      <p className="mt-1 text-sm text-slate-500">Enlaces directos a las carteleras de eventos.</p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {conciertos.map((c) => (
          <a
            key={c.nombre}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md"
          >
            <p className="font-medium text-slate-900">{c.nombre}</p>
            <p className="mt-1 text-sm text-slate-500">{c.descripcion}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
