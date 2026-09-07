import { LoginForm } from "@/components/admin/LoginForm";
import { adminPanelPath } from "@/lib/config";

export default function AdminLoginPage() {
  return <LoginForm panelPath={adminPanelPath} />;
}
