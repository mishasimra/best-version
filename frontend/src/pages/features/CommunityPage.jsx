import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, fetcher } from "../../api/client";
import { Button, Card, LoadingState, SectionHeader } from "../../components/ui/UI";

export function CommunityPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["community"],
    queryFn: () => fetcher("/community"),
  });

  const mutation = useMutation({
    mutationFn: ({ userId, isFollowing }) =>
      isFollowing ? api.delete(`/community/follow/${userId}`) : api.post(`/community/follow/${userId}`),
    onSuccess: (_, variables) => {
      toast.success(variables.isFollowing ? "Unfollowed successfully" : "Connection updated");
      queryClient.invalidateQueries({ queryKey: ["community"] });
    },
    onError: () => {
      toast.error("We couldn't update that connection right now.");
    },
  });

  if (isLoading) return <LoadingState label="Loading community..." />;

  return (
    <div className="grid-two">
      <Card>
        <SectionHeader eyebrow="Discover people" title="Collaborators, peers, and inspiring builders" />
        <div className="stack">
          {data.people.map((person) => (
            <div className="person-row" key={person._id}>
              <img src={person.avatar} alt={person.name} />
              <div>
                <strong>{person.name}</strong>
                <p>{person.headline}</p>
              </div>
              <Button
                variant={person.isFollowing ? "secondary" : "primary"}
                disabled={mutation.isPending && mutation.variables?.userId === person._id}
                onClick={() => mutation.mutate({ userId: person._id, isFollowing: person.isFollowing })}
              >
                {mutation.isPending && mutation.variables?.userId === person._id
                  ? person.isFollowing
                    ? "Unfollowing..."
                    : "Following..."
                  : person.isFollowing
                    ? "Unfollow"
                    : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
      <div className="stack">
        <Card>
          <SectionHeader eyebrow="Activity feed" title="What the network is shipping" />
          <div className="stack">
            {data.feed.map((post) => (
              <div key={post._id}>
                <strong>{post.author.name}</strong>
                <p>{post.content}</p>
                <small>{post.likes} likes</small>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader eyebrow="Prompts" title="Ideas to spark collaboration" />
          <div className="stack">
            {data.prompts.map((prompt) => (
              <p key={prompt}>{prompt}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
