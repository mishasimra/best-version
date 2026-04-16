import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, Field, LoadingState, SectionHeader } from "../../components/ui/UI";

export function MentorshipPage() {
  const queryClient = useQueryClient();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [message, setMessage] = useState("I’d love help tightening my portfolio story and choosing my next high-signal project.");
  const [preferredSlot, setPreferredSlot] = useState("Sat 11 AM");
  const { data: mentors, isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: () => fetcher("/mentors"),
  });
  const { data: requests } = useQuery({
    queryKey: ["mentorship-requests"],
    queryFn: () => fetcher("/mentors/requests"),
  });

  const mutation = useMutation({
    mutationFn: (mentorId) => api.post(`/mentors/${mentorId}/request`, { message, preferredSlot, goals: ["Portfolio", "Career strategy"] }),
    onSuccess: () => {
      toast.success("Mentorship request sent");
      queryClient.invalidateQueries({ queryKey: ["mentorship-requests"] });
    },
  });

  if (isLoading) return <LoadingState label="Loading mentors..." />;

  const activeMentor = mentors.find((mentor) => mentor._id === selectedMentor) || mentors[0];

  return (
    <div className="grid-two">
      <Card>
        <SectionHeader eyebrow="Mentors" title="Browse experts who can sharpen your path" />
        <div className="stack">
          {mentors.map((mentor) => (
            <button className={`mentor-card ${activeMentor?._id === mentor._id ? "mentor-card-active" : ""}`} key={mentor._id} onClick={() => setSelectedMentor(mentor._id)} type="button">
              <img src={mentor.user.avatar} alt={mentor.user.name} />
              <div>
                <strong>{mentor.user.name}</strong>
                <p>{mentor.bio}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
      <div className="stack">
        {activeMentor ? (
          <Card>
            <SectionHeader eyebrow="Mentor profile" title={activeMentor.user.name} description={activeMentor.user.headline} />
            <p>{activeMentor.bio}</p>
            <div className="tag-row">
              {activeMentor.expertise.map((item) => (
                <span key={item} className="pill muted">
                  {item}
                </span>
              ))}
            </div>
            <p>${activeMentor.ratePerSession} per session</p>
            <Field label="Request message" value={message} onChange={(e) => setMessage(e.target.value)} textarea />
            <Field label="Preferred slot" value={preferredSlot} onChange={(e) => setPreferredSlot(e.target.value)} />
            <Button onClick={() => mutation.mutate(activeMentor._id)}>Request mentorship</Button>
          </Card>
        ) : null}
        <Card>
          <SectionHeader eyebrow="Requests" title="Your mentorship pipeline" />
          <div className="stack">
            {(requests || []).map((item) => (
              <div className="list-row" key={item._id}>
                <div>
                  <strong>{item.mentor.user.name}</strong>
                  <p>{item.preferredSlot}</p>
                </div>
                <span className="pill">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
