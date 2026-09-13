type LinkRow = {
  id: string;
  nombre: string;
  url: string;
  descripcion: string | null;
};

export function LinksGrid({
  links,
  emptyMessage,
}: {
  links: LinkRow[];
  emptyMessage: string;
}) {
  if (links.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-medium text-slate-900">{link.nombre}</p>
          {link.descripcion && (
            <p className="mt-1 text-sm text-slate-500">{link.descripcion}</p>
          )}
        </a>
      ))}
    </div>
  );
}
