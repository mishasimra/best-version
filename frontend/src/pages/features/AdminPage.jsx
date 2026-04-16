import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../api/client";
import { Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function AdminPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: () => fetcher("/admin/summary"),
  });

  if (isLoading) return <LoadingState label="Loading admin summary..." />;

  return (
    <div className="stack-xl">
      <SectionHeader eyebrow="Admin-ready" title="Platform management snapshot" />
      <div className="grid-two">
        <Card>
          <h3>Users</h3>
          <div className="stack">
            {data.users.map((item) => (
              <div key={item._id} className="list-row">
                <span>{item.name}</span>
                <span className="pill">{item.role}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>Courses</h3>
          <div className="stack">
            {data.courses.map((item) => (
              <div key={item._id} className="list-row">
                <span>{item.title}</span>
                <span>{item.studentsCount || 0} students</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>Competitions</h3>
          <div className="stack">
            {data.competitions.map((item) => (
              <div key={item._id} className="list-row">
                <span>{item.title}</span>
                <span className="pill">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>Jobs</h3>
          <div className="stack">
            {data.jobs.map((item) => (
              <div key={item._id} className="list-row">
                <span>{item.title}</span>
                <span className="pill">{item.type}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
