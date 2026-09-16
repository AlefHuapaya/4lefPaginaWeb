import { createClient } from "@/lib/supabase/server";
import { LinksGrid } from "@/components/links/LinksGrid";
import { AddLinkForm } from "@/components/links/AddLinkForm";
import { addLink } from "@/lib/actions/links";

export default async function PlataformasPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("links")
    .select("id, nombre, url, descripcion")
    .eq("seccion", "plataformas")
    .eq("activo", true)
    .order("orden", { ascending: true });

  const addPlataforma = addLink.bind(null, "plataformas", "/plataformas");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Plataformas</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enlaces a las plataformas externas que usa el equipo.
        </p>
      </div>

      <LinksGrid
        links={links ?? []}
        emptyMessage="Todavía no hay plataformas registradas. Agrega la primera abajo."
        showFavicon
      />

      <AddLinkForm action={addPlataforma} />
    </div>
  );
}
