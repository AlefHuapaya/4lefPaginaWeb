import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect: redirectTo } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold text-slate-900">Portal de apoyo</h1>
        <p className="mb-6 text-sm text-slate-500">Ingresa con tu cuenta del equipo.</p>
        <LoginForm redirectTo={redirectTo ?? "/inicio"} />
      </div>
    </div>
  );
}
