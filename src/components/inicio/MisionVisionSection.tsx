import { createClient } from "@/lib/supabase/server";
import { MisionVisionCard } from "@/components/inicio/MisionVisionCard";

export async function MisionVisionSection() {
  const supabase = await createClient();
  const { data } = await supabase.from("mision_vision").select("clave, contenido");

  const mision = data?.find((d) => d.clave === "mision")?.contenido ?? null;
  const vision = data?.find((d) => d.clave === "vision")?.contenido ?? null;

  return (
    <section className="flex flex-col gap-3 sm:flex-row">
      <MisionVisionCard clave="mision" contenido={mision} />
      <MisionVisionCard clave="vision" contenido={vision} />
    </section>
  );
}
