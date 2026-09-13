import { createClient } from "@/lib/supabase/server";
import { TrabajoForm } from "@/components/seguimiento/TrabajoForm";

export default async function NuevoTrabajoPage() {
  const supabase = await createClient();
  const { data: contratas } = await supabase.from("contratas").select("id, nombre").order("nombre");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Nuevo trabajo</h1>
        <p className="mt-1 text-sm text-slate-500">Registra un nuevo trabajo de campo por DF.</p>
      </div>

      <TrabajoForm contratas={contratas ?? []} />
    </div>
  );
}
