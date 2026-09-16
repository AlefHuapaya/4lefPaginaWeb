type LinkRow = {
  id: string;
  nombre: string;
  url: string;
  descripcion: string | null;
};

function faviconUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}

export function LinksGrid({
  links,
  emptyMessage,
  showFavicon = false,
}: {
  links: LinkRow[];
  emptyMessage: string;
  showFavicon?: boolean;
}) {
  if (links.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => {
        const icon = showFavicon ? faviconUrl(link.url) : null;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={icon}
                alt=""
                width={28}
                height={28}
                className="mt-0.5 h-7 w-7 shrink-0 rounded"
              />
            )}
            <div>
              <p className="font-medium text-slate-900">{link.nombre}</p>
              {link.descripcion && (
                <p className="mt-1 text-sm text-slate-500">{link.descripcion}</p>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
