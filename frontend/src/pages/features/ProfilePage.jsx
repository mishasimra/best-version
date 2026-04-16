import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Avatar } from "../../components/ui/Avatar";
import { ShareButtons } from "../../components/ui/ShareButtons";
import { Button, Card, Field, LoadingState, SectionHeader, Stat } from "../../components/ui/UI";
import { useAuth } from "../../context/AuthContext";

export function ProfilePage() {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetcher("/profile"),
  });
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (data?.user) {
      setForm({
        name: data.user.name,
        headline: data.user.headline || "",
        bio: data.user.bio || "",
        location: data.user.location || "",
        skills: (data.user.skills || []).join(", "),
        interests: (data.user.interests || []).join(", "),
        portfolio: {
          summary: data.portfolio?.summary || "",
        },
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => api.patch("/profile", payload),
    onSuccess: (response) => {
      toast.success("Profile updated");
      updateUser(response.data.data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  if (isLoading || !form) return <LoadingState label="Loading profile..." />;

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({
      ...form,
      skills: form.skills.split(",").map((item) => item.trim()).filter(Boolean),
      interests: form.interests.split(",").map((item) => item.trim()).filter(Boolean),
      portfolio: { summary: form.portfolio.summary },
    });
  }

  return (
    <div className="grid-two">
      <Card>
        <div className="profile-hero">
          <Avatar src={data.user.avatar} name={data.user.name} size={64} />
          <div>
            <h2>{data.user.name}</h2>
            <p>{data.user.headline}</p>
          </div>
        </div>
        <div className="stats-grid compact">
          <Stat label="XP" value={data.user.stats?.xp || 0} />
          <Stat label="Streak" value={data.user.stats?.streak || 0} />
          <Stat label="Badges" value={data.user.badges?.length || 0} />
        </div>
        <div className="stack">
          <SectionHeader eyebrow="Portfolio" title="Featured profile summary" />
          <p>{data.portfolio?.summary}</p>
          <div className="tag-row">
            {(data.user.skills || []).map((skill) => (
              <span key={skill} className="pill muted">
                {skill}
              </span>
            ))}
          </div>
          <ShareButtons label="Share your profile" text="I'm building my best version. Check out my progress!" />
        </div>
      </Card>
      <Card>
        <SectionHeader eyebrow="Edit" title="Update your public profile" />
        <form className="stack" onSubmit={handleSubmit}>
          <Field label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Field label="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
          <Field label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} textarea />
          <Field label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Field label="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          <Field label="Interests" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
          <Field
            label="Portfolio summary"
            value={form.portfolio.summary}
            onChange={(e) => setForm({ ...form, portfolio: { ...form.portfolio, summary: e.target.value } })}
            textarea
          />
          <Button type="submit">Save profile</Button>
        </form>
      </Card>
    </div>
  );
}
