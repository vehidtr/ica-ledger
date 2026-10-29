import { useSyncExternalStore } from "react";

export type Post = {
  id: string;
  title: string;
  summary: string;
  text: string;
  author: string;
  email: string;
  date: string; // YYYY-MM-DD
};

export type PostInput = Omit<Post, "id">;
export type PostErrors = Partial<Record<keyof PostInput, string>>;

export const LIMITS = { title: 50, summary: 250, author: 40 } as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePost(input: PostInput): PostErrors {
  const errors: PostErrors = {};

  const trimmedTitle = input.title.trim();
  if (!trimmedTitle) errors.title = "Title is required";
  else if (trimmedTitle.length > LIMITS.title) errors.title = `Max ${LIMITS.title} characters`;

  const trimmedSummary = input.summary.trim();
  if (!trimmedSummary) errors.summary = "Summary is required";
  else if (trimmedSummary.length > LIMITS.summary)
    errors.summary = `Max ${LIMITS.summary} characters`;

  if (!input.text.trim()) errors.text = "Text is required";

  const trimmedAuthor = input.author.trim();
  if (!trimmedAuthor) errors.author = "Author is required";
  else if (trimmedAuthor.length > LIMITS.author) errors.author = `Max ${LIMITS.author} characters`;

  if (!EMAIL_REGEX.test(input.email.trim())) errors.email = "Enter a valid email address";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || isNaN(Date.parse(input.date))) {
    errors.date = "Enter a valid date";
  }

  return errors;
}

const STORAGE_KEY = "blog.posts.v1";
const SEED_POSTS: Post[] = [
  {
    id: "welcome",
    title: "Welcome to the Ledger",
    summary:
      "A small notebook for long thoughts. Create, edit and delete posts — everything stays in this browser.",
    text: "This is a simple blog.\n\nUse the “New post” button to write something. Open any post to read it in full, edit it, or delete it.",
    author: "The Editor",
    email: "editor@example.com",
    date: "2026-10-27",
  },
];

let postsCache: Post[] = [];
let isLoaded = false;
const listeners = new Set<() => void>();

function loadPostsFromStorage() {
  if (isLoaded || typeof window === "undefined") return;
  isLoaded = true;
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    postsCache = rawData ? JSON.parse(rawData) : SEED_POSTS;
  } catch {
    postsCache = SEED_POSTS;
  }
}

function commitPosts(nextPosts: Post[]) {
  postsCache = nextPosts;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
  } catch {}
  listeners.forEach((listener) => listener());
}

const EMPTY_POSTS: Post[] = [];
export function usePosts(): Post[] | null {
  const posts = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => {
      loadPostsFromStorage();
      return postsCache;
    },
    () => EMPTY_POSTS,
  );
  return isLoaded ? posts : null;
}

export function sortedPosts(list: Post[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

function cleanPostInput(input: PostInput): PostInput {
  return {
    ...input,
    title: input.title.trim(),
    summary: input.summary.trim(),
    text: input.text.trim(),
    author: input.author.trim(),
    email: input.email.trim(),
  };
}

export function createPost(input: PostInput): Post {
  loadPostsFromStorage();
  const newPost = { ...cleanPostInput(input), id: crypto.randomUUID() };
  commitPosts([newPost, ...postsCache]);
  return newPost;
}

export function updatePost(id: string, input: PostInput) {
  loadPostsFromStorage();
  commitPosts(postsCache.map((post) => (post.id === id ? { ...cleanPostInput(input), id } : post)));
}

export function deletePost(id: string) {
  loadPostsFromStorage();
  commitPosts(postsCache.filter((post) => post.id !== id));
}

export function formatDate(dateString: string) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
