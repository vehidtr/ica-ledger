import { useState } from "react";
import { LIMITS, validatePost, type PostErrors, type PostInput } from "@/lib/posts";

const today = () => new Date().toISOString().slice(0, 10);

export function PostForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: PostInput;
  submitLabel: string;
  onSubmit: (post: PostInput) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<PostInput>(
    initial ?? { title: "", summary: "", text: "", author: "", email: "", date: today() },
  );
  const [errors, setErrors] = useState<PostErrors>({});

  const updateField =
    (key: keyof PostInput) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: event.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validatePost(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  }

  const field = (key: keyof PostInput, label: string, element: React.ReactNode, max?: number) => (
    <div className="field">
      <div className="flex items-baseline justify-between">
        <label htmlFor={key} className="field-label">
          {label}
        </label>
        {max && (
          <span
            className={
              form[key].length > max ? "text-destructive text-xs" : "text-muted-foreground text-xs"
            }
          >
            {form[key].length}/{max}
          </span>
        )}
      </div>
      {element}
      {errors[key] && <p className="text-destructive text-sm mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {field(
        "title",
        "Title",
        <input id="title" className="input" value={form.title} onChange={updateField("title")} />,
        LIMITS.title,
      )}
      {field(
        "summary",
        "Summary",
        <textarea
          id="summary"
          rows={3}
          className="input"
          value={form.summary}
          onChange={updateField("summary")}
        />,
        LIMITS.summary,
      )}
      {field(
        "text",
        "Text",
        <textarea
          id="text"
          rows={12}
          className="input font-serif"
          value={form.text}
          onChange={updateField("text")}
        />,
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        {field(
          "author",
          "Author",
          <input
            id="author"
            className="input"
            value={form.author}
            onChange={updateField("author")}
          />,
          LIMITS.author,
        )}
        {field(
          "email",
          "Author's email",
          <input
            id="email"
            type="email"
            className="input"
            value={form.email}
            onChange={updateField("email")}
          />,
        )}
      </div>
      {field(
        "date",
        "Date",
        <input
          id="date"
          type="date"
          className="input max-w-xs"
          value={form.date}
          onChange={updateField("date")}
        />,
      )}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        <button type="button" className="btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
