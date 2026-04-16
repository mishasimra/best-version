import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function SettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => fetcher("/profile/settings"),
  });
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => api.patch("/profile/settings", payload),
    onSuccess: () => {
      toast.success("Settings saved");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  if (isLoading || !settings) return <LoadingState label="Loading settings..." />;

  return (
    <Card>
      <SectionHeader eyebrow="Preferences" title="Control notifications, theme, and opportunity visibility" />
      <div className="stack">
        {[
          ["emailNotifications", "Email notifications"],
          ["pushNotifications", "Push notifications"],
          ["weeklyDigest", "Weekly digest"],
          ["openToWork", "Open to work"],
        ].map(([key, label]) => (
          <label className="toggle-row" key={key}>
            <span>{label}</span>
            <input checked={settings[key]} onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })} type="checkbox" />
          </label>
        ))}
        <label className="field">
          <span>Theme</span>
          <select value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })}>
            <option value="system">System</option>
            <option value="light">Light</option>
          </select>
        </label>
        <Button onClick={() => mutation.mutate(settings)}>Save preferences</Button>
      </div>
    </Card>
  );
}
