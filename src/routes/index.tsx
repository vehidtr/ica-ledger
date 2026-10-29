import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDate, sortedPosts, usePosts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Ledger — All posts" },
      { name: "description", content: "An overview of every post on The Ledger, a simple blog." },
      { property: "og:title", content: "The Ledger — All posts" },
      {
        property: "og:description",
        content: "An overview of every post on The Ledger, a simple blog.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const posts = usePosts();
  if (!posts) return null;
  const list = sortedPosts(posts);
  return (
    <div>
      <h1 className="font-display text-5xl sm:text-6xl leading-none mb-10">All posts</h1>
      {list.length === 0 ? (
        <p className="text-muted-foreground">
          No posts yet.{" "}
          <Link to="/posts/new" className="link">
            Write the first one.
          </Link>
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {list.map((p) => (
            <li key={p.id}>
              <Link to="/posts/$id" params={{ id: p.id }} className="group block py-7">
                <time className="eyebrow">{formatDate(p.date)}</time>
                <h2 className="font-display text-3xl mt-1 group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
