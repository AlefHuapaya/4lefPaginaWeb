import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarNav } from "@/components/nav/SidebarNav";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre_completo")
    .eq("id", user.id)
    .single();

  return (
    <div className="app-shell-background flex min-h-screen">
      <SidebarNav nombreCompleto={profile?.nombre_completo ?? null} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="rounded-xl bg-slate-50/95 p-6 shadow-sm backdrop-blur-sm">{children}</div>
      </main>
    </div>
  );
}
