"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database.types";

type LinkSeccion = Database["public"]["Enums"]["link_seccion"];

export async function addLink(seccion: LinkSeccion, path: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const nombre = String(formData.get("nombre") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim() || null;

  if (!nombre || !url) return;

  await supabase.from("links").insert({ seccion, nombre, url, descripcion });
  revalidatePath(path);
}

export async function deleteLink(id: string, path: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  await supabase.from("links").delete().eq("id", id);
  revalidatePath(path);
}
