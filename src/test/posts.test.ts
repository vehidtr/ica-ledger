import { describe, expect, it } from "vitest";
import { validatePost, type PostInput } from "@/lib/posts";

const ok: PostInput = {
  title: "T",
  summary: "S",
  text: "X",
  author: "A",
  email: "a@b.co",
  date: "2026-10-27",
};

describe("validatePost", () => {
  it("accepts a valid post", () => {
    expect(validatePost(ok)).toEqual({});
  });

  it("title max length (50 characters)", () => {
    expect(validatePost({ ...ok, title: "a".repeat(50) }).title).toBeUndefined();
    expect(validatePost({ ...ok, title: "a".repeat(51) }).title).toBeDefined();
  });

  it("summary max length (250 characters)", () => {
    expect(validatePost({ ...ok, summary: "a".repeat(250) }).summary).toBeUndefined();
    expect(validatePost({ ...ok, summary: "a".repeat(251) }).summary).toBeDefined();
  });

  it("author max length (40 characters)", () => {
    expect(validatePost({ ...ok, author: "a".repeat(40) }).author).toBeUndefined();
    expect(validatePost({ ...ok, author: "a".repeat(41) }).author).toBeDefined();
  });

  it("validates email correctly", () => {
    expect(validatePost({ ...ok, email: "user@example.com" }).email).toBeUndefined();

    expect(validatePost({ ...ok, email: "nope" }).email).toBeDefined();
    expect(validatePost({ ...ok, email: "a@b" }).email).toBeDefined();
  });
});
