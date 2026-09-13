import Link from "next/link";

const tabs = [
  { href: "/seguimiento", label: "Trabajos" },
  { href: "/seguimiento/dashboard", label: "Dashboard" },
  { href: "/seguimiento/alertas", label: "Alertas" },
] as const;

export default function SeguimientoLayout({ children }: LayoutProps<"/seguimiento">) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-t-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
