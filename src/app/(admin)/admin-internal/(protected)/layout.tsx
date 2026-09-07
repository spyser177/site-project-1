import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { adminPanelPath } from "@/lib/config";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    redirect(`${adminPanelPath}/login`);
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar username={session.username} panelPath={adminPanelPath} />
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
