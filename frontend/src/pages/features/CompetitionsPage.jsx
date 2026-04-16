import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function CompetitionsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["competitions"],
    queryFn: () => fetcher("/opportunities/competitions"),
  });

  const mutation = useMutation({
    mutationFn: (competitionId) => api.post(`/opportunities/competitions/${competitionId}/join`),
    onSuccess: () => {
      toast.success("Competition joined");
      queryClient.invalidateQueries({ queryKey: ["competitions"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading competitions..." />;

  return (
    <div className="stack-xl">
      <SectionHeader eyebrow="Compete" title="Active, upcoming, and past challenges" />
      <div className="course-grid">
        {data.map((item) => (
          <Card key={item._id} className="course-card">
            <img src={item.coverImage} alt={item.title} className="cover-image" />
            <span className="pill">{item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="meta-row">
              <span>{item.category}</span>
              <span>{item.prize}</span>
              <span>{new Date(item.deadline).toLocaleDateString()}</span>
            </div>
            <div className="tag-row">
              {item.rules.map((rule) => (
                <span key={rule} className="pill muted">
                  {rule}
                </span>
              ))}
            </div>
            <Button disabled={item.status === "past"} onClick={() => mutation.mutate(item._id)}>
              {item.status === "past" ? "Closed" : "Join competition"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
