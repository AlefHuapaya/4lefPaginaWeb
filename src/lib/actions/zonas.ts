"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database.types";

type ZonaTipoTrabajo = Database["public"]["Enums"]["zona_tipo_trabajo"];

export async function addZonaAsignacion(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const departamento = String(formData.get("departamento") ?? "").trim();
  const tipoTrabajo = String(formData.get("tipo_trabajo") ?? "") as ZonaTipoTrabajo;
  const coordinadorId = String(formData.get("coordinador_id") ?? "") || null;
  const contrataId = String(formData.get("contrata_id") ?? "") || null;

  if (!departamento || !tipoTrabajo) return;

  await supabase.from("zona_asignaciones").insert({
    departamento,
    tipo_trabajo: tipoTrabajo,
    coordinador_id: coordinadorId,
    contrata_id: contrataId,
    created_by: user.id,
  });

  revalidatePath("/zonas");
}

export async function deleteZonaAsignacion(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  await supabase.from("zona_asignaciones").delete().eq("id", id);
  revalidatePath("/zonas");
}
