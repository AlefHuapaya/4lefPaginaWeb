import { createClient } from "@/lib/supabase/server";

const ALERTA_INFO: Record<string, { label: string; color: string }> = {
  ACCESO_MOP_PENDIENTE: { label: "Acceso / MOP pendiente (≥5 días desde entrega)", color: "#fab219" },
  PEDIDO_ORACLE_PENDIENTE: { label: "Pedido Oracle pendiente (≥2 días desde creado)", color: "#fab219" },
  FORECAST_VENCIDO: { label: "Forecast vencido", color: "#d03b3b" },
};

type Alerta = {
  trabajo_id: string;
  df: number;
  enlace: string;
  tipo_alerta: string;
  dias: number | null;
};

export default async function AlertasPage() {
  const supabase = await createClient();
  const { data: alertas } = await supabase
    .from("v_alertas")
    .select("trabajo_id, df, enlace, tipo_alerta, dias")
    .order("dias", { ascending: false });

  const grupos = Object.entries(ALERTA_INFO).map(([tipo, info]) => ({
    tipo,
    ...info,
    items: ((alertas ?? []) as Alerta[]).filter((a) => a.tipo_alerta === tipo),
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Alertas</h1>
        <p className="mt-1 text-sm text-slate-500">
          Se calculan al vuelo a partir de los trabajos registrados.
        </p>
      </div>

      {grupos.map((g) => (
        <section key={g.tipo} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: g.color }}
              aria-hidden
            />
            <h2 className="font-semibold text-slate-900">{g.label}</h2>
            <span className="ml-auto text-sm text-slate-400">{g.items.length}</span>
          </div>

          {g.items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Sin alertas de este tipo.</p>
          ) : (
            <div className="mt-3 flex flex-col divide-y divide-slate-100">
              {g.items.map((a) => (
                <div key={`${g.tipo}-${a.trabajo_id}`} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-slate-900">DF {a.df}</span>
                  <span className="flex-1 truncate px-3 text-slate-600">{a.enlace}</span>
                  <span className="text-slate-500">{a.dias} días</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
