import { createClient } from "@/lib/supabase/server";
import { LinksGrid } from "@/components/links/LinksGrid";
import { AddLinkForm } from "@/components/links/AddLinkForm";
import { addLink } from "@/lib/actions/links";

export default async function ManualesPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("links")
    .select("id, nombre, url, descripcion")
    .eq("seccion", "manuales")
    .eq("activo", true)
    .order("orden", { ascending: true });

  const addManual = addLink.bind(null, "manuales", "/manuales");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Manuales</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manuales del equipo (ID, MOPs, planta externa) alojados en{" "}
          <a
            href="https://github.com/AlefHuapaya/4lefPaginaWeb/tree/main/manuales"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            el repositorio de GitHub
          </a>
          .
        </p>
      </div>

      <LinksGrid
        links={links ?? []}
        emptyMessage="Todavía no hay manuales enlazados. Agrega el primero abajo."
      />

      <AddLinkForm action={addManual} />
    </div>
  );
}
