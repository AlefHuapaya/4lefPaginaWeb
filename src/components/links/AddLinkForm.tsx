export function AddLinkForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4 sm:flex-row sm:items-end sm:flex-wrap"
    >
      <div className="flex flex-1 flex-col gap-1 min-w-[10rem]">
        <label className="text-xs font-medium uppercase text-slate-500">Nombre</label>
        <input
          name="nombre"
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>
      <div className="flex flex-[2] flex-col gap-1 min-w-[14rem]">
        <label className="text-xs font-medium uppercase text-slate-500">URL</label>
        <input
          name="url"
          type="url"
          required
          placeholder="https://…"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-[10rem]">
        <label className="text-xs font-medium uppercase text-slate-500">
          Descripción (opcional)
        </label>
        <input
          name="descripcion"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Agregar
      </button>
    </form>
  );
}
