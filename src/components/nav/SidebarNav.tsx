"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/auth";

const items = [
  { href: "/inicio", label: "Inicio" },
  { href: "/seguimiento", label: "Seguimiento" },
  { href: "/zonas", label: "Zonas" },
  { href: "/plataformas", label: "Plataformas" },
  { href: "/manuales", label: "Manuales" },
] as const;

export function SidebarNav({ nombreCompleto }: { nombreCompleto: string | null }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-sm font-semibold text-entel-blue">Portal de apoyo</p>
        {nombreCompleto && <p className="mt-0.5 text-xs text-slate-500">{nombreCompleto}</p>}
      </div>

      <ul className="flex flex-1 flex-col gap-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-entel-blue text-white"
                    : "text-slate-600 hover:bg-entel-blue-tint hover:text-entel-blue"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <form action={signOut} className="border-t border-slate-200 p-3">
        <button
          type="submit"
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Cerrar sesión
        </button>
      </form>
    </nav>
  );
}
