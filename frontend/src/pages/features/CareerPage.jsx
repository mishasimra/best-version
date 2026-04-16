import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, Field, LoadingState, SectionHeader } from "../../components/ui/UI";

export function CareerPage() {
  const queryClient = useQueryClient();
  const [proposal, setProposal] = useState("I bring product sense, execution energy, and a portfolio mindset to early-stage teams.");
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["career-jobs"],
    queryFn: () => fetcher("/opportunities/career"),
  });
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetcher("/profile"),
  });

  const mutation = useMutation({
    mutationFn: (jobId) => api.post(`/opportunities/freelance/${jobId}/apply`, { proposal, portfolioLink: profile?.portfolio?.links?.[0] || "" }),
    onSuccess: () => {
      toast.success("Application submitted");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading career opportunities..." />;

  return (
    <div className="grid-two">
      <Card>
        <SectionHeader eyebrow="Career growth" title="Jobs and internships matched to builders like you" />
        <div className="stack">
          {jobs.map((job) => (
            <div key={job._id} className="career-card">
              <div className="list-row">
                <div>
                  <strong>{job.title}</strong>
                  <p>
                    {job.company} • {job.location}
                  </p>
                </div>
                <span className="pill">{job.type}</span>
              </div>
              <p>{job.description}</p>
              <Button onClick={() => mutation.mutate(job._id)}>Apply now</Button>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionHeader eyebrow="Portfolio + resume" title="Career assets snapshot" />
        <p>{profile?.portfolio?.summary}</p>
        <Field label="Career pitch" value={proposal} onChange={(e) => setProposal(e.target.value)} textarea />
        <div className="stack">
          {(profile?.resume?.achievements || []).map((item) => (
            <div key={item} className="list-row">
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
