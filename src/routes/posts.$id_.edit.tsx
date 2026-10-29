import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PostForm } from "@/components/PostForm";
import { updatePost, usePosts } from "@/lib/posts";

export const Route = createFileRoute("/posts/$id_/edit")({
  head: () => ({
    meta: [
      { title: "Edit post — The Ledger" },
      { name: "description", content: "Edit an existing post on The Ledger." },
      { property: "og:title", content: "Edit post — The Ledger" },
      { property: "og:description", content: "Edit an existing post on The Ledger." },
    ],
  }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const posts = usePosts();
  if (!posts) return null;
  const post = posts.find((p) => p.id === id);
  if (!post)
    return (
      <p>
        Post not found.{" "}
        <Link to="/" className="link">
          Back
        </Link>
      </p>
    );
  const { id: _omit, ...initial } = post;
  const back = () => navigate({ to: "/posts/$id", params: { id } });
  return (
    <div>
      <h1 className="font-display text-5xl mb-8">Edit post</h1>
      <PostForm
        initial={initial}
        submitLabel="Save changes"
        onSubmit={(p) => {
          updatePost(id, p);
          back();
        }}
        onCancel={back}
      />
    </div>
  );
}
