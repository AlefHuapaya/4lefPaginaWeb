"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Paleta validada (skill de dataviz): slot 1 (azul) para magnitud, un solo tono.
const SERIES_BLUE = "#2a78d6";
const GRID = "#e1e0d9";
const AXIS_TEXT = "#898781";

type PorContrata = { contrata: string; total: number };

export function ContrataBarChart({ data }: { data: PorContrata[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Sin datos todavía. Aparecerán trabajos aquí después de importarlos.
      </p>
    );
  }

  const sorted = [...data].sort((a, b) => b.total - a.total);
  const height = Math.max(sorted.length * 32, 120);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24 }}>
        <CartesianGrid horizontal={false} stroke={GRID} />
        <XAxis type="number" allowDecimals={false} tick={{ fill: AXIS_TEXT, fontSize: 12 }} axisLine={{ stroke: GRID }} tickLine={false} />
        <YAxis
          type="category"
          dataKey="contrata"
          width={160}
          tick={{ fill: AXIS_TEXT, fontSize: 12 }}
          axisLine={{ stroke: GRID }}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(11,11,11,0.04)" }}
          contentStyle={{ border: "1px solid #e1e0d9", borderRadius: 6, fontSize: 13 }}
        />
        <Bar dataKey="total" fill={SERIES_BLUE} radius={[0, 4, 4, 0]} maxBarSize={20}>
          <LabelList dataKey="total" position="right" fill="#52514e" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
