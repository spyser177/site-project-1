import { SettingsManager } from "@/components/admin/SettingsManager";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Настройки</h1>
      <SettingsManager />
    </div>
  );
}
