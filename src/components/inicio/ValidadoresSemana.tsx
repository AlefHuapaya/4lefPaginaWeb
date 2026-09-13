import { createClient } from "@/lib/supabase/server";
import { ValidadorCard } from "@/components/inicio/ValidadorCard";

export async function ValidadoresSemana() {
  const supabase = await createClient();
  const { data: validadores } = await supabase
    .from("validadores_semana")
    .select("area, persona")
    .order("area");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="font-semibold text-slate-900">Validadores de la semana</h2>
      <p className="mt-1 text-sm text-slate-500">
        Click sobre el nombre para actualizar quién está en cada área. Visible para todo el equipo.
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(validadores ?? []).map((v) => (
          <ValidadorCard key={v.area} area={v.area} persona={v.persona} />
        ))}
      </div>
    </section>
  );
}
