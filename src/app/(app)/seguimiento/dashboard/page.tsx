import { createClient } from "@/lib/supabase/server";
import { StatTile } from "@/components/seguimiento/StatTile";
import { ContrataBarChart } from "@/components/seguimiento/DashboardCharts";

// Paleta de status (fija, del skill de dataviz) — nunca color solo, siempre con label.
const STATUS_COLOR: Record<string, string> = {
  EJECUTADO: "#0ca30c", // good
  "STAND BY": "#fab219", // warning
  NO: "#d03b3b", // critical
};

type Kpis = {
  por_estado: { estado: string; total: number }[];
  por_contrata: { contrata: string; total: number }[];
  tiempo_promedio_dias: number | null;
  forecast_vencidos: number;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: kpis } = await supabase.rpc("get_dashboard_kpis").single<Kpis>();

  const porEstado = kpis?.por_estado ?? [];
  const totalTrabajos = porEstado.reduce((acc, e) => acc + e.total, 0);
  const tiempoPromedio = kpis?.tiempo_promedio_dias;
  const forecastVencidos = kpis?.forecast_vencidos ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Indicadores generales de Seguimiento.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile label="Total de trabajos" value={totalTrabajos} />
        {porEstado.map((e) => (
          <StatTile
            key={e.estado}
            label={e.estado}
            value={e.total}
            swatchColor={STATUS_COLOR[e.estado] ?? "#898781"}
          />
        ))}
        <StatTile
          label="Tiempo promedio (días)"
          value={tiempoPromedio != null ? Math.round(tiempoPromedio) : "—"}
        />
        <StatTile
          label="Forecast vencido"
          value={forecastVencidos}
          swatchColor={forecastVencidos > 0 ? "#d03b3b" : undefined}
        />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-900">Trabajos por contrata</h2>
        <div className="mt-3">
          <ContrataBarChart data={kpis?.por_contrata ?? []} />
        </div>
      </section>
    </div>
  );
}
