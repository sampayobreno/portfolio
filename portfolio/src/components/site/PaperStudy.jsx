"use client";

import { useEffect, useState } from "react";

// Development-only switcher for the background study. Not rendered in production builds.
const PAPERS = [
  { id: "marfim", name: "Marfim (atual)" },
  { id: "pedra", name: "Pedra" },
  { id: "gelo", name: "Gelo" },
  { id: "branco", name: "Branco" },
];
const pill = { position: "fixed", left: 64, bottom: 16, zIndex: 200, display: "flex", alignItems: "center", gap: 4, padding: 4, borderRadius: 14, background: "#191a18", color: "#faf9f6", font: "500 12px/1 system-ui, sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,.18)" };
const button = (on) => ({ minWidth: 36, minHeight: 32, padding: "0 10px", border: 0, borderRadius: 10, cursor: "pointer", font: "inherit", background: on ? "#faf9f6" : "transparent", color: on ? "#191a18" : "#faf9f6" });

function apply(id) {
  if (id === "marfim") document.documentElement.removeAttribute("data-paper");
  else document.documentElement.setAttribute("data-paper", id);
}

export function PaperStudy() {
  const [paper, setPaper] = useState("marfim");

  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem("paper-study"); } catch {}
    const initial = PAPERS.some((p) => p.id === stored) ? stored : "marfim";
    setPaper(initial);
    apply(initial);
  }, []);

  function choose(id) {
    setPaper(id);
    apply(id);
    document.documentElement.setAttribute("data-theme", "light");
    try { localStorage.setItem("paper-study", id); localStorage.setItem("theme", "light"); } catch {}
  }

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div role="group" aria-label="Background study" style={pill}>
      <span style={{ padding: "0 8px", opacity: 0.7 }}>Fundo</span>
      {PAPERS.map((p) => <button key={p.id} type="button" aria-pressed={paper === p.id} onClick={() => choose(p.id)} style={button(paper === p.id)}>{p.name}</button>)}
    </div>
  );
}
