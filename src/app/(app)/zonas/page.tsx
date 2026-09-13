import { createClient } from "@/lib/supabase/server";
import { ZonasClient } from "@/components/zonas/ZonasClient";

export default async function ZonasPage() {
  const supabase = await createClient();

  const [{ data: asignaciones }, { data: contratas }, { data: coordinadores }] =
    await Promise.all([
      supabase
        .from("zona_asignaciones")
        .select(
          "id, departamento, tipo_trabajo, created_at, contratas(nombre), profiles!coordinador_id(nombre_completo)"
        )
        .order("created_at", { ascending: false }),
      supabase.from("contratas").select("id, nombre").order("nombre"),
      supabase.from("profiles").select("id, nombre_completo").order("nombre_completo"),
    ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Zonas</h1>
        <p className="mt-1 text-sm text-slate-500">
          Asignación de contrata y coordinador por departamento.
        </p>
      </div>

      <ZonasClient
        asignaciones={asignaciones ?? []}
        contratas={contratas ?? []}
        coordinadores={
          (coordinadores ?? [])
            .filter((c) => c.nombre_completo)
            .map((c) => ({ id: c.id, nombre: c.nombre_completo as string }))
        }
      />
    </div>
  );
}
