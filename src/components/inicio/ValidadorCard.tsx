"use client";

import { useState } from "react";
import { updateValidador } from "@/lib/actions/validadores";
import type { Database } from "@/lib/types/database.types";

type ValidadorArea = Database["public"]["Enums"]["validador_area"];

// Gradientes placeholder por área (mismo tono de mood que las imágenes de referencia).
// Para usar las imágenes reales: pon el archivo en public/fondos/ y cambia backgroundImage
// por `url("/fondos/validador-pext.png"), <gradiente>` (el gradiente queda como overlay oscuro).
const AREA_BACKGROUND: Record<ValidadorArea, string> = {
  PEXT: "linear-gradient(rgba(0,10,30,.45), rgba(0,10,30,.45)), linear-gradient(180deg, #7ec8f2 0%, #bfe6ff 55%, #d7ecd0 100%)",
  TX: "linear-gradient(rgba(20,10,30,.45), rgba(20,10,30,.45)), linear-gradient(160deg, #2b2140 0%, #6a4a73 45%, #e8a0a0 100%)",
  N3: "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), linear-gradient(180deg, #0b1130 0%, #16204a 60%, #2a2f55 100%)",
  "CORE IP": "linear-gradient(rgba(20,8,0,.35), rgba(20,8,0,.35)), linear-gradient(160deg, #4a2a12 0%, #b3591b 55%, #f2a33d 100%)",
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
      className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl p-3 shadow-sm"
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
