import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "@/components/PostForm";
import { createPost } from "@/lib/posts";

export const Route = createFileRoute("/posts/new")({
  head: () => ({
    meta: [
      { title: "New post — The Ledger" },
      { name: "description", content: "Write a new post for The Ledger." },
      { property: "og:title", content: "New post — The Ledger" },
      { property: "og:description", content: "Write a new post for The Ledger." },
    ],
  }),
  component: NewPost,
});

function NewPost() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="font-display text-5xl mb-8">New post</h1>
      <PostForm
        submitLabel="Publish"
        onSubmit={(p) => {
          const post = createPost(p);
          navigate({ to: "/posts/$id", params: { id: post.id } });
        }}
        onCancel={() => navigate({ to: "/" })}
      />
    </div>
  );
}
