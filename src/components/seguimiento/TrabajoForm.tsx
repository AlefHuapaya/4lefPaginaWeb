"use client";

import { useActionState } from "react";
import { createTrabajo } from "@/lib/actions/trabajos";

const TIPOS_TRABAJO = ["Cableado nuevo sin afectación", "Reubicaciones con afectación"] as const;
const ESTADOS = ["NO", "STAND BY", "EJECUTADO"] as const;

export function TrabajoForm({ contratas }: { contratas: { id: string; nombre: string }[] }) {
  const [state, formAction, pending] = useActionState(createTrabajo, { error: "" });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">DF</label>
          <input
            name="df"
            type="number"
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Contrata</label>
          <select name="contrata_id" className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Sin asignar</option>
            {contratas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-medium uppercase text-slate-500">Enlace</label>
          <input
            name="enlace"
            required
            placeholder="0100127_LM_Manco_Capac to 0102547_LM_La_Victoria"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Tipo de trabajo</label>
          <select name="tipo_trabajo" className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Sin definir</option>
            {TIPOS_TRABAJO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Estado</label>
          <select name="estado" defaultValue="NO" className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Fecha de entrega</label>
          <input
            name="fecha_entrega"
            type="date"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Fecha forecast</label>
          <input
            name="fecha_forecast"
            type="date"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-medium uppercase text-slate-500">Comentario</label>
          <textarea
            name="comentario"
            rows={3}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-entel-blue px-4 py-2 text-sm font-medium text-white hover:bg-entel-blue-dark disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar trabajo"}
      </button>
    </form>
  );
}
