import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../api/client";
import { Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function StartupIdeasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["startup-ideas"],
    queryFn: () => fetcher("/opportunities/startups"),
  });

  if (isLoading) return <LoadingState label="Loading startup ideas..." />;

  return (
    <div className="stack-xl">
      <SectionHeader eyebrow="Startup ideas" title="Boards for collaborators, co-builders, and ambitious operators" />
      <div className="course-grid">
        {data.map((idea) => (
          <Card key={idea._id}>
            <span className="pill">{idea.sector}</span>
            <h3>{idea.title}</h3>
            <p>{idea.summary}</p>
            <div className="tag-row">
              {idea.lookingFor.map((item) => (
                <span key={item} className="pill muted">
                  {item}
                </span>
              ))}
            </div>
            <p>
              <strong>{idea.stage}</strong> • {idea.traction}
            </p>
            <small>Posted by {idea.postedByName}</small>
          </Card>
        ))}
      </div>
    </div>
  );
}
