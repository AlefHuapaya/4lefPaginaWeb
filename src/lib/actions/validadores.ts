"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database.types";

type ValidadorArea = Database["public"]["Enums"]["validador_area"];

export async function updateValidador(area: ValidadorArea, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const persona = String(formData.get("persona") ?? "").trim() || null;

  await supabase
    .from("validadores_semana")
    .update({ persona, updated_by: user.id, updated_at: new Date().toISOString() })
    .eq("area", area);

  revalidatePath("/inicio");
}
