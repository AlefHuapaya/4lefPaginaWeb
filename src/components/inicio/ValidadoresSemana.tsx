import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { uploadWeeklyHighlight, deleteWeeklyHighlightImage } from "@/lib/actions/weekly-highlights";

export async function ValidadoresSemana() {
  const supabase = await createClient();

  const { data: highlight } = await supabase
    .from("weekly_highlights")
    .select("id, titulo, semana_inicio")
    .order("semana_inicio", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: images } = highlight
    ? await supabase
        .from("weekly_highlight_images")
        .select("id, storage_path")
        .eq("highlight_id", highlight.id)
        .order("orden", { ascending: true })
    : { data: [] };

  const imagesWithUrl = (images ?? []).map((img) => ({
    ...img,
    url: supabase.storage.from("weekly-highlights").getPublicUrl(img.storage_path).data
      .publicUrl,
  }));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="font-semibold text-slate-900">
        Validadores de la semana{highlight ? `: ${highlight.titulo}` : ""}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Se actualiza cada semana. Cualquiera del equipo puede subir una imagen nueva.
      </p>

      {imagesWithUrl.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {imagesWithUrl.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-md border border-slate-200">
              <Image
                src={img.url}
                alt={highlight?.titulo ?? "Validador de la semana"}
                width={400}
                height={300}
                className="h-32 w-full object-cover"
                unoptimized
              />
              <form
                action={deleteWeeklyHighlightImage.bind(null, img.id, img.storage_path)}
                className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <button
                  type="submit"
                  className="rounded bg-black/60 px-2 py-0.5 text-xs text-white hover:bg-black/80"
                >
                  Eliminar
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-400">Sin imágenes esta semana todavía.</p>
      )}

      <form action={uploadWeeklyHighlight} className="mt-4 flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Título</label>
          <input
            name="titulo"
            defaultValue={highlight?.titulo ?? "TX-IP-N3"}
            className="w-40 rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase text-slate-500">Imagen</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            required
            className="text-sm text-slate-600"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Subir
        </button>
      </form>
    </section>
  );
}
