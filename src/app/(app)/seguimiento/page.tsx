import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SeguimientoPage() {
  const supabase = await createClient();
  const { data: trabajos } = await supabase
    .from("trabajos")
    .select("id, df, enlace, estado, tipo_trabajo, fecha_entrega, fecha_forecast, contratas(nombre)")
    .order("df", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Seguimiento</h1>
          <p className="mt-1 text-sm text-slate-500">Trabajos de campo identificados por DF.</p>
        </div>
        <Link
          href="/seguimiento/nuevo"
          className="rounded-md bg-entel-blue px-4 py-2 text-sm font-medium text-white hover:bg-entel-blue-dark"
        >
          Nuevo trabajo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">DF</th>
              <th className="px-3 py-2">Enlace</th>
              <th className="px-3 py-2">Contrata</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Entrega</th>
              <th className="px-3 py-2">Forecast</th>
            </tr>
          </thead>
          <tbody>
            {(trabajos ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-slate-400">
                  Todavía no hay trabajos registrados.
                </td>
              </tr>
            ) : (
              (trabajos ?? []).map((t) => (
                <tr key={t.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-slate-900">{t.df}</td>
                  <td className="px-3 py-2 text-slate-600">{t.enlace}</td>
                  <td className="px-3 py-2 text-slate-600">{t.contratas?.nombre ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{t.tipo_trabajo ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{t.estado}</td>
                  <td className="px-3 py-2 text-slate-600">{t.fecha_entrega ?? "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{t.fecha_forecast ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
