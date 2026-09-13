import { ValidadoresSemana } from "@/components/inicio/ValidadoresSemana";

export default function InicioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Inicio</h1>
        <p className="mt-1 text-sm text-slate-500">Novedades de la semana para el equipo.</p>
      </div>

      <ValidadoresSemana />
    </div>
  );
}
