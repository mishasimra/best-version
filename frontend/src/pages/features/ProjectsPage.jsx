import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, EmptyState, Field, LoadingState, ProgressBar, SectionHeader } from "../../components/ui/UI";

const emptyProject = {
  title: "",
  brief: "",
  description: "",
  category: "Product",
  status: "planning",
  completion: 20,
};

export function ProjectsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetcher("/projects"),
  });
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  const createMutation = useMutation({
    mutationFn: (payload) => api.post("/projects", payload),
    onSuccess: () => {
      toast.success("Project saved");
      setForm(emptyProject);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => api.patch(`/projects/${id}`, payload),
    onSuccess: () => {
      toast.success("Project updated");
      setEditingId(null);
      setForm(emptyProject);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const submitMutation = useMutation({
    mutationFn: ({ id, payload }) => api.post(`/projects/${id}/submit`, payload),
    onSuccess: () => {
      toast.success("Project submitted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading project workspace..." />;

  function handleSubmit(event) {
    event.preventDefault();
    if (editingId) updateMutation.mutate({ id: editingId, payload: form });
    else createMutation.mutate({ ...form, milestones: [{ title: "Kickoff", status: "active", dueDate: new Date() }] });
  }

  return (
    <div className="grid-two">
      <Card>
        <SectionHeader eyebrow="Build studio" title={editingId ? "Edit project" : "Create a new project"} />
        <form className="stack" onSubmit={handleSubmit}>
          <Field label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Field label="Brief" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} textarea />
          <Field
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            textarea
          />
          <label className="field">
            <span>Category</span>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Product</option>
              <option>SaaS</option>
              <option>Career</option>
              <option>Community</option>
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="planning">Planning</option>
              <option value="building">Building</option>
              <option value="submitted">Submitted</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <Button type="submit">{editingId ? "Save changes" : "Create project"}</Button>
        </form>
      </Card>

      <div className="stack">
        <SectionHeader eyebrow="Your projects" title="Track milestones and submit work" />
        {data.length ? (
          data.map((project) => (
            <Card key={project._id}>
              <div className="list-row">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.brief}</p>
                </div>
                <span className="pill">{project.status}</span>
              </div>
              <ProgressBar value={project.completion} />
              <div className="row-actions">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingId(project._id);
                    setForm({
                      title: project.title,
                      brief: project.brief,
                      description: project.description,
                      category: project.category,
                      status: project.status,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => submitMutation.mutate({ id: project._id, payload: { notes: "Submitting MVP", submissionUrl: project.liveUrl || "" } })}>
                  Submit work
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState title="No projects yet" description="Create your first portfolio-ready build to start compounding proof." />
        )}
      </div>
    </div>
  );
}
