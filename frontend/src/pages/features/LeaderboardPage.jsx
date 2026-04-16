import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetcher } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function LeaderboardPage() {
  const { auth } = useAuth();
  const [metric, setMetric] = useState("points");
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetcher("/opportunities/leaderboard"),
  });

  const sorted = useMemo(() => [...(data || [])].sort((a, b) => (b[metric] || 0) - (a[metric] || 0)), [data, metric]);

  if (isLoading) return <LoadingState label="Loading leaderboard..." />;

  return (
    <Card>
      <SectionHeader eyebrow="Leaderboard" title="Who is creating momentum right now?" />
      <div className="tab-row">
        {["points", "achievements", "competitionWins", "skillGrowth", "earnings"].map((item) => (
          <button className={`tab ${metric === item ? "tab-active" : ""}`} key={item} onClick={() => setMetric(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="stack">
        {sorted.map((entry, index) => (
          <div className={`leaderboard-row ${entry.user._id === auth.user?._id ? "leaderboard-row-active" : ""}`} key={entry._id}>
            <strong>#{index + 1}</strong>
            <img src={entry.user.avatar} alt={entry.user.name} />
            <div>
              <strong>{entry.user.name}</strong>
              <p>{entry.user.headline}</p>
            </div>
            <strong>{entry[metric]}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
