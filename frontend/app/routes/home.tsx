import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contratos Sesp | FSP" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <h3>Página Inicial</h3>;
}
