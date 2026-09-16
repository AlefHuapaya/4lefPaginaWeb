"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database.types";

type MisionVisionClave = Database["public"]["Enums"]["mision_vision_clave"];

export async function updateMisionVision(clave: MisionVisionClave, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const contenido = String(formData.get("contenido") ?? "").trim() || null;

  await supabase
    .from("mision_vision")
    .update({ contenido, updated_by: user.id, updated_at: new Date().toISOString() })
    .eq("clave", clave);

  revalidatePath("/inicio");
}
