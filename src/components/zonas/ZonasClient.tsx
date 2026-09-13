"use client";

import { useMemo, useState } from "react";
import { DEPARTAMENTOS_PERU } from "@/lib/data/departamentos";
import { addZonaAsignacion, deleteZonaAsignacion } from "@/lib/actions/zonas";

const TIPOS_TRABAJO = ["FO PINT", "FO PEXT", "MW", "Desmontaje", "CONTRATA FIJA"] as const;

type Asignacion = {
  id: string;
  departamento: string;
  tipo_trabajo: string;
  created_at: string;
  contratas: { nombre: string } | null;
  profiles: { nombre_completo: string | null } | null;
};

type Opcion = { id: string; nombre: string };

export function ZonasClient({
  asignaciones,
  contratas,
  coordinadores,
}: {
  asignaciones: Asignacion[];
  contratas: Opcion[];
  coordinadores: Opcion[];
}) {
  const [depto, setDepto] = useState<string | null>(null);

  const enZona = useMemo(
    () => asignaciones.filter((a) => a.departamento === depto),
    [asignaciones, depto]
  );

  const conteos = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of asignaciones) {
      map.set(a.departamento, (map.get(a.departamento) ?? 0) + 1);
    }
    return map;
  }, [asignaciones]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-900">Departamentos</h2>
        <p className="mt-1 text-sm text-slate-500">
          Elige un departamento para ver y registrar asignaciones de contrata/coordinador.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {DEPARTAMENTOS_PERU.map((d) => {
            const total = conteos.get(d) ?? 0;
            const active = depto === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDepto(d)}
                className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="block font-medium">{d}</span>
                <span className={`text-xs ${active ? "text-slate-300" : "text-slate-400"}`}>
                  {total === 1 ? "1 asignación" : `${total} asignaciones`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="rounded-lg border border-slate-200 bg-white p-4">
        {!depto ? (
          <p className="text-sm text-slate-500">
            Selecciona un departamento de la grilla para ver el detalle.
          </p>
        ) : (
          <>
            <h2 className="font-semibold text-slate-900">{depto}</h2>

            <div className="mt-3 flex flex-col gap-2">
              {enZona.length === 0 ? (
                <p className="text-sm text-slate-400">Sin asignaciones registradas.</p>
              ) : (
                enZona.map((a) => (
                  <div key={a.id} className="rounded-md border border-slate-200 p-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{a.tipo_trabajo}</span>
                      <form action={deleteZonaAsignacion.bind(null, a.id)}>
                        <button
                          type="submit"
                          className="text-xs text-red-600 hover:underline"
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                    <p className="text-slate-600">
                      {a.contratas?.nombre ?? "Sin contrata"} ·{" "}
                      {a.profiles?.nombre_completo ?? "Sin coordinador"}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form action={addZonaAsignacion} className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <input type="hidden" name="departamento" value={depto} />

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase text-slate-500">
                  Tipo de trabajo
                </label>
                <select
                  name="tipo_trabajo"
                  required
                  className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                >
                  {TIPOS_TRABAJO.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase text-slate-500">
                  Coordinador
                </label>
                <select
                  name="coordinador_id"
                  className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                >
                  <option value="">Sin especificar</option>
                  {coordinadores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase text-slate-500">
                  Contrata / proveedor
                </label>
                <select
                  name="contrata_id"
                  className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                >
                  <option value="">Sin especificar</option>
                  {contratas.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Agregar asignación
              </button>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}
