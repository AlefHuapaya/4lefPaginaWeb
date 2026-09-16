"use client";

import { useState } from "react";

type LinkRow = {
  id: string;
  nombre: string;
  url: string;
  descripcion: string | null;
};

const IP_LITERAL = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

// Herramientas internas (IP directa o subdominios *.entel.net.pe, solo accesibles
// por VPN) no son alcanzables por el servicio de favicons de Google: este devuelve
// un globo genérico igual para todas en vez de fallar, así que ni siquiera lo
// intentamos y vamos directo a la insignia de color — es el caso real de las
// herramientas NCE/Huawei, que comparten logo y hay que distinguir igual.
function faviconUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    if (IP_LITERAL.test(hostname) || hostname.endsWith(".entel.net.pe")) {
      return null;
    }
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}

// Color e iniciales determinísticos por nombre: sirve de respaldo cuando el
// favicon real no carga (típico en herramientas internas por IP, como las de
// NCE/Huawei) para poder distinguirlas de un vistazo igualmente.
function badgeStyle(nombre: string) {
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 42%)`;
}

function initials(nombre: string) {
  return nombre.trim().slice(0, 2).toUpperCase();
}

function LinkIcon({ nombre, url }: { nombre: string; url: string }) {
  const [failed, setFailed] = useState(false);
  const icon = faviconUrl(url);

  if (!icon || failed) {
    return (
      <div
        style={{ backgroundColor: badgeStyle(nombre) }}
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
      >
        {initials(nombre)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      width={28}
      height={28}
      onError={() => setFailed(true)}
      className="mt-0.5 h-7 w-7 shrink-0 rounded"
    />
  );
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
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          {showFavicon && <LinkIcon nombre={link.nombre} url={link.url} />}
          <div>
            <p className="font-medium text-slate-900">{link.nombre}</p>
            {link.descripcion && (
              <p className="mt-1 text-sm text-slate-500">{link.descripcion}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
