import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, LoadingState, ProgressBar, SectionHeader } from "../../components/ui/UI";

export function AssessmentPage() {
  const queryClient = useQueryClient();
  const { data: questionsData, isLoading } = useQuery({
    queryKey: ["assessment-questions"],
    queryFn: () => fetcher("/assessments/questions"),
  });
  const { data: latest } = useQuery({
    queryKey: ["assessment-latest"],
    queryFn: () => fetcher("/assessments/latest"),
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const mutation = useMutation({
    mutationFn: (payload) => api.post("/assessments", payload),
    onSuccess: () => {
      toast.success("Assessment submitted");
      queryClient.invalidateQueries({ queryKey: ["assessment-latest"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const questions = questionsData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const progress = useMemo(() => ((currentIndex + 1) / Math.max(questions.length, 1)) * 100, [currentIndex, questions.length]);

  if (isLoading) return <LoadingState label="Loading assessment..." />;

  function chooseOption(option) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        prompt: currentQuestion.prompt,
        category: currentQuestion.category,
        answer: option.label,
        score: option.score,
      },
    }));

    if (currentIndex < questions.length - 1) setCurrentIndex((value) => value + 1);
  }

  function submit() {
    mutation.mutate({ answers: Object.values(answers) });
  }

  return (
    <div className="grid-two">
      <Card className="assessment-card">
        <SectionHeader eyebrow="Skill assessment" title="Find your strongest growth path" />
        <ProgressBar value={progress} />
        <div className="assessment-question">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <h3>{currentQuestion.prompt}</h3>
          <div className="stack">
            {currentQuestion.options.map((option) => (
              <button className="answer-card" key={option.label} onClick={() => chooseOption(option)} type="button">
                {option.label}
              </button>
            ))}
          </div>
          <div className="row-actions">
            <Button variant="ghost" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>
              Previous
            </Button>
            <Button disabled={Object.keys(answers).length < questions.length || mutation.isPending} onClick={submit}>
              {mutation.isPending ? "Submitting..." : "Finish assessment"}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader eyebrow="Latest result" title={latest?.topStrengths?.join(" • ") || "No result yet"} />
        {latest ? (
          <div className="stack">
            <p>{latest.summary}</p>
            {(latest.recommendations || []).map((item) => (
              <div key={item.title} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.reason}</p>
                </div>
                <span className="pill">{item.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Take the assessment to unlock tailored recommendations.</p>
        )}
      </Card>
    </div>
  );
}
