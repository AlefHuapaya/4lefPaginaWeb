export function StatTile({
  label,
  value,
  swatchColor,
}: {
  label: string;
  value: string | number;
  swatchColor?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        {swatchColor && (
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: swatchColor }}
            aria-hidden
          />
        )}
        <p className="text-sm text-slate-500">{label}</p>
      </div>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
