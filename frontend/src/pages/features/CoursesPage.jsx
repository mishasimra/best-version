import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, EmptyState, LoadingState, ProgressBar, SectionHeader } from "../../components/ui/UI";

export function CoursesPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ q: "", category: "all", level: "all", sort: "featured" });
  const { data, isLoading } = useQuery({
    queryKey: ["courses", filters],
    queryFn: () => fetcher("/courses", { params: filters }),
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId) => api.post(`/courses/${courseId}/enroll`),
    onSuccess: () => {
      toast.success("Enrolled successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading courses..." />;

  return (
    <div className="stack-xl">
      <Card className="filters">
        <input placeholder="Search courses or tags" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="all">All categories</option>
          <option value="Development">Development</option>
          <option value="Career">Career</option>
        </select>
        <select value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })}>
          <option value="all">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>
        <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="featured">Featured</option>
          <option value="rating">Rating</option>
          <option value="students">Popularity</option>
        </select>
      </Card>

      <div className="course-grid">
        {data.length ? (
          data.map((course) => (
            <Card key={course._id} className="course-card">
              <img src={course.coverImage} alt={course.title} className="cover-image" />
              <span className="pill">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="meta-row">
                <span>{course.level}</span>
                <span>{course.durationHours}h</span>
                <span>{course.rating} rating</span>
              </div>
              {course.enrollment ? (
                <div className="stack">
                  <ProgressBar value={course.enrollment.progress} />
                  <small>{course.enrollment.progress}% complete</small>
                </div>
              ) : null}
              <div className="row-actions">
                <Link to={`/courses/${course.slug}`}>
                  <Button variant="secondary">View details</Button>
                </Link>
                <Button disabled={Boolean(course.enrollment)} onClick={() => enrollMutation.mutate(course._id)}>
                  {course.enrollment ? "Enrolled" : "Enroll"}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState title="No courses matched" description="Try broadening your search or switching the filter." />
        )}
      </div>
    </div>
  );
}
