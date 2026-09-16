"use client";

import { useState } from "react";
import { updateValidador } from "@/lib/actions/validadores";
import type { Database } from "@/lib/types/database.types";

type ValidadorArea = Database["public"]["Enums"]["validador_area"];

// Imagen real por área + un velo semi-opaco para que el texto resalte sin perder el color.
const AREA_BACKGROUND: Record<ValidadorArea, string> = {
  PEXT: 'linear-gradient(rgba(0,20,60,.45), rgba(0,20,60,.45)), url("/fondos/validador-pext.jpg")',
  TX: 'linear-gradient(rgba(10,10,45,.45), rgba(10,10,45,.45)), url("/fondos/validador-tx.jpg")',
  N3: 'linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url("/fondos/validador-n3.jpg")',
  "CORE IP": 'linear-gradient(rgba(15,8,40,.42), rgba(15,8,40,.42)), url("/fondos/validador-core-ip.jpg")',
};

const AREA_LABEL: Record<ValidadorArea, string> = {
  PEXT: "VALIDADOR PEXT",
  TX: "VALIDADOR TX (TRANSPORTE)",
  N3: "VALIDADOR N3 (CLIENTES FIJOS)",
  "CORE IP": "VALIDADOR CORE IP",
};

export function ValidadorCard({ area, persona }: { area: ValidadorArea; persona: string | null }) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl bg-cover bg-center p-3 shadow-sm"
      style={{ backgroundImage: AREA_BACKGROUND[area] }}
    >
      <span className="w-fit rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-900">
        {AREA_LABEL[area]}
      </span>

      {editing ? (
        <form
          action={async (formData) => {
            await updateValidador(area, formData);
            setEditing(false);
          }}
          className="flex gap-1"
        >
          <input
            name="persona"
            defaultValue={persona ?? ""}
            autoFocus
            placeholder="Nombre"
            className="min-w-0 flex-1 rounded-md border border-white/40 bg-white/90 px-2 py-1 text-sm text-slate-900 outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-900"
          >
            Guardar
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="w-fit rounded-full bg-white/90 px-2.5 py-1 text-sm font-bold text-slate-900 transition-opacity hover:opacity-90"
        >
          {persona || "Sin asignar (click para editar)"}
        </button>
      )}
    </div>
  );
}
