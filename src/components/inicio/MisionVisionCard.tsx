"use client";

import { useState } from "react";
import { updateMisionVision } from "@/lib/actions/mision-vision";
import type { Database } from "@/lib/types/database.types";

type Clave = Database["public"]["Enums"]["mision_vision_clave"];

const LABEL: Record<Clave, string> = {
  mision: "Misión",
  vision: "Visión",
};

export function MisionVisionCard({ clave, contenido }: { clave: Clave; contenido: string | null }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-entel-blue">{LABEL[clave]}</h3>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-slate-400 hover:text-entel-blue"
          >
            Editar
          </button>
        )}
      </div>

      {editing ? (
        <form
          action={async (formData) => {
            await updateMisionVision(clave, formData);
            setEditing(false);
          }}
          className="mt-2 flex flex-col gap-2"
        >
          <textarea
            name="contenido"
            defaultValue={contenido ?? ""}
            autoFocus
            rows={4}
            placeholder={`Escribe la ${LABEL[clave].toLowerCase()} del equipo…`}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-entel-blue"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-entel-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-entel-blue-dark"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
          {contenido || "Aún sin definir — click en Editar para agregarla."}
        </p>
      )}
    </div>
  );
}
