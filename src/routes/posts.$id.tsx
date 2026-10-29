import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { deletePost, formatDate, usePosts } from "@/lib/posts";

export const Route = createFileRoute("/posts/$id")({
  head: () => ({
    meta: [
      { title: "Read post — The Ledger" },
      { name: "description", content: "Read a full post on The Ledger." },
      { property: "og:title", content: "Read post — The Ledger" },
      { property: "og:description", content: "Read a full post on The Ledger." },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const posts = usePosts();
  if (!posts) return null;
  const post = posts.find((p) => p.id === id);
  if (!post) return <NotFound />;

  return (
    <article>
      <time className="eyebrow">{formatDate(post.date)}</time>
      <h1 className="font-display text-5xl sm:text-6xl leading-tight mt-2">{post.title}</h1>
      <p className="mt-4 text-xl text-muted-foreground leading-relaxed">{post.summary}</p>
      <p className="mt-6 text-sm">
        By <span className="font-semibold">{post.author}</span> ·{" "}
        <a href={`mailto:${post.email}`} className="link">
          {post.email}
        </a>
      </p>
      <div className="mt-10 border-t border-border pt-10 font-serif text-lg leading-8 whitespace-pre-wrap">
        {post.text}
      </div>
      <div className="mt-12 flex gap-3 border-t border-border pt-6">
        <Link to="/posts/$id/edit" params={{ id }} className="btn-primary">
          Edit
        </Link>
        <button
          className="btn-danger"
          onClick={() => {
            if (confirm(`Delete “${post.title}”? This can't be undone.`)) {
              deletePost(id);
              navigate({ to: "/" });
            }
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <div>
      <h1 className="font-display text-4xl">Post not found</h1>
      <p className="mt-3 text-muted-foreground">
        It may have been deleted.{" "}
        <Link to="/" className="link">
          Back to all posts
        </Link>
      </p>
    </div>
  );
}
