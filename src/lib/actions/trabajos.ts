"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database.types";

type TrabajoTipo = Database["public"]["Enums"]["trabajo_tipo"];
type TrabajoEstado = Database["public"]["Enums"]["trabajo_estado"];

export async function createTrabajo(_prevState: { error: string }, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const df = Number(formData.get("df"));
  const enlace = String(formData.get("enlace") ?? "").trim();
  const contrataId = String(formData.get("contrata_id") ?? "") || null;
  const tipoTrabajo = (String(formData.get("tipo_trabajo") ?? "") || null) as TrabajoTipo | null;
  const estado = String(formData.get("estado") ?? "NO") as TrabajoEstado;
  const fechaEntrega = String(formData.get("fecha_entrega") ?? "") || null;
  const fechaForecast = String(formData.get("fecha_forecast") ?? "") || null;
  const comentario = String(formData.get("comentario") ?? "").trim() || null;

  if (!df || !enlace) {
    return { error: "El DF y el enlace son obligatorios." };
  }

  const { error } = await supabase.from("trabajos").insert({
    df,
    enlace,
    contrata_id: contrataId,
    tipo_trabajo: tipoTrabajo,
    estado,
    fecha_entrega: fechaEntrega,
    fecha_forecast: fechaForecast,
    comentario,
    created_by: user.id,
  });

  if (error) {
    return { error: error.code === "23505" ? "Ya existe un trabajo con ese DF." : error.message };
  }

  revalidatePath("/seguimiento");
  redirect("/seguimiento");
}
