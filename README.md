# The Ledger — TanStack Start Blog

A modern, fast, and fully type-safe full-stack web application built with cutting-edge web technologies, free of legacy or proprietary platform dependencies.

## 🚀 Technologies

This application is built using a powerful and modern tech stack:

- **[TanStack Start](https://tanstack.com/start)** — A full-stack React framework with SSR (Server-Side Rendering) and server functions.
- **[TanStack Router](https://tanstack.com/router)** — Advanced file-based routing with 100% type-safe paths.
- **[TanStack Query](https://tanstack.com/query)** — Powerful asynchronous state management and data caching.
- **[React 19](https://react.dev/)** — A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)** — A utility-first CSS framework for styling.
- **[Bun](https://bun.sh/)** — An ultra-fast JavaScript/TypeScript runtime and package manager.

---

## 🛠️ How to run locally (using Bun)

Using **Bun** is recommended for this project as it ensures maximum installation and startup speed.

### Prerequisites

Make sure you have **Bun** installed on your machine. If you don't have it installed yet, you can run:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Steps to Run:

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <project-folder-name>
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start the development server:**

   ```bash
   bun run dev
   ```

4. Open your browser and navigate to:
   `http://localhost:5173`

---

## 📦 Available Scripts

The following commands are available in `package.json`:

| Command           | Description                                                           |
| :---------------- | :-------------------------------------------------------------------- |
| `bun run dev`     | Starts the local development server with Hot Module Replacement (HMR) |
| `bun run build`   | Builds the application for production                                 |
| `bun run preview` | Locally previews the production build                                 |
| `bun run lint`    | Lints the codebase using ESLint                                       |
| `bun run test`    | Runs unit tests using Vitest                                          |

---

## 📂 Project Structure

The project follows the standard TanStack Start file-system structure:

- `src/routes/` — **File-based routing.** Every file here automatically becomes a route.
- `src/lib/` — Helper functions, validation schemas, and shared utilities.
- `src/components/` — Reusable UI components.
- `src/styles.css` — Global styles and Tailwind CSS configuration.
- `routeTree.gen.ts` — **Automatically generated file** by TanStack Router (do not edit manually).
