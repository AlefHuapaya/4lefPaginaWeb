"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function uploadWeeklyHighlight(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  const titulo = String(formData.get("titulo") ?? "TX-IP-N3").trim() || "TX-IP-N3";
  const file = formData.get("imagen");
  if (!(file instanceof File) || file.size === 0) return;

  let { data: highlight } = await supabase
    .from("weekly_highlights")
    .select("id")
    .order("semana_inicio", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!highlight) {
    const { data: created, error } = await supabase
      .from("weekly_highlights")
      .insert({ titulo, semana_inicio: new Date().toISOString().slice(0, 10), updated_by: user.id })
      .select("id")
      .single();
    if (error || !created) return;
    highlight = created;
  } else {
    await supabase
      .from("weekly_highlights")
      .update({ titulo, updated_by: user.id, updated_at: new Date().toISOString() })
      .eq("id", highlight.id);
  }

  const path = `${highlight.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("weekly-highlights")
    .upload(path, file);
  if (uploadError) return;

  await supabase.from("weekly_highlight_images").insert({
    highlight_id: highlight.id,
    storage_path: path,
  });

  revalidatePath("/inicio");
}

export async function deleteWeeklyHighlightImage(imageId: string, storagePath: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado");

  await supabase.storage.from("weekly-highlights").remove([storagePath]);
  await supabase.from("weekly_highlight_images").delete().eq("id", imageId);
  revalidatePath("/inicio");
}
