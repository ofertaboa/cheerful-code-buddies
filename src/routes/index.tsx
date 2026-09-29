import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Olá Mundo" },
      { name: "description", content: "Uma página simples de olá mundo." },
      { property: "og:title", content: "Olá Mundo" },
      { property: "og:description", content: "Uma página simples de olá mundo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Olá, mundo! 👋
      </h1>
    </div>
  );
}
