import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, Field, LoadingState, SectionHeader, Stat } from "../../components/ui/UI";

export function EarnPage() {
  const queryClient = useQueryClient();
  const [proposal, setProposal] = useState("I can deliver a polished, startup-ready outcome with clear communication.");
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["freelance-jobs"],
    queryFn: () => fetcher("/opportunities/freelance", { params: { type: "all" } }),
  });
  const { data: applicationsData } = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetcher("/opportunities/applications"),
  });

  const applyMutation = useMutation({
    mutationFn: (jobId) =>
      api.post(`/opportunities/freelance/${jobId}/apply`, {
        proposal,
        bidAmount: "$900",
        portfolioLink: "https://portfolio.example.com",
      }),
    onSuccess: () => {
      toast.success("Application sent");
      queryClient.invalidateQueries({ queryKey: ["freelance-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading opportunities..." />;

  return (
    <div className="stack-xl">
      <section className="stats-grid">
        <Stat label="Wallet balance" value={`$${applicationsData?.wallet?.balance || 0}`} />
        <Stat label="Pending payouts" value={`$${applicationsData?.wallet?.pending || 0}`} />
        <Stat label="Applications" value={applicationsData?.applications?.length || 0} />
      </section>

      <Card>
        <SectionHeader eyebrow="Proposal" title="Reusable pitch" description="Use this as your default bid and refine per job." />
        <Field label="Proposal" value={proposal} onChange={(e) => setProposal(e.target.value)} textarea />
      </Card>

      <section className="grid-two">
        <div className="stack">
          <SectionHeader eyebrow="Freelance + jobs" title="Active opportunities" />
          {jobs.map((job) => (
            <Card key={job._id}>
              <div className="list-row">
                <div>
                  <h3>{job.title}</h3>
                  <p>
                    {job.company} • {job.location} • {job.budget}
                  </p>
                </div>
                <span className="pill">{job.type}</span>
              </div>
              <p>{job.description}</p>
              <div className="tag-row">
                {job.skills.map((skill) => (
                  <span key={skill} className="pill muted">
                    {skill}
                  </span>
                ))}
              </div>
              <Button disabled={Boolean(job.applicationStatus)} onClick={() => applyMutation.mutate(job._id)}>
                {job.applicationStatus ? job.applicationStatus : "Apply / Bid"}
              </Button>
            </Card>
          ))}
        </div>

        <Card>
          <SectionHeader eyebrow="Tracking" title="Your applications" />
          <div className="stack">
            {(applicationsData?.applications || []).map((item) => (
              <div className="list-row" key={item._id}>
                <div>
                  <strong>{item.job.title}</strong>
                  <p>{item.job.company}</p>
                </div>
                <span className="pill">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
