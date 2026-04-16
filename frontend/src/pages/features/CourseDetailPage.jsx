import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, LoadingState, ProgressBar, SectionHeader } from "../../components/ui/UI";

export function CourseDetailPage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetcher(`/courses/${slug}`),
  });

  const progressMutation = useMutation({
    mutationFn: (next) =>
      api.patch(`/courses/${data._id}/progress`, {
        progress: next,
        completedLessons: data.lessons.slice(0, Math.ceil((data.lessons.length * next) / 100)).map((lesson) => lesson.title),
      }),
    onSuccess: () => {
      toast.success("Course progress updated");
      queryClient.invalidateQueries({ queryKey: ["course", slug] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading course details..." />;

  const progress = data.enrollment?.progress || 0;

  return (
    <div className="grid-two">
      <Card className="course-detail-card">
        <img src={data.coverImage} alt={data.title} className="cover-image" />
        <SectionHeader eyebrow={data.category} title={data.title} description={data.description} />
        <div className="meta-row">
          <span>{data.level}</span>
          <span>{data.durationHours} hours</span>
          <span>{data.studentsCount} learners</span>
        </div>
        <div className="stack">
          {data.outcomes.map((item) => (
            <div key={item} className="list-row">
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader eyebrow="Progress" title={`${progress}% complete`} description={`Instructor: ${data.instructorName}`} />
        <ProgressBar value={progress} />
        <div className="stack">
          {data.lessons.map((lesson) => (
            <div key={lesson.title} className="list-row">
              <div>
                <strong>{lesson.title}</strong>
                <p>{lesson.durationMinutes} minutes</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row-actions">
          <Button variant="secondary" onClick={() => progressMutation.mutate(Math.min(progress + 20, 100))}>
            Mark progress +20%
          </Button>
          <Button onClick={() => progressMutation.mutate(100)}>Complete course</Button>
        </div>
      </Card>
    </div>
  );
}
