import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Providers } from "@/context/AppContext";
import { AssistantDock } from "@/components/site/AssistantDock";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));
beforeEach(() => { vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("assistant access from navigation", () => {
  it("opens from the dock and returns focus to its trigger on close", async () => {
    render(<Providers><button type="button">Open assistant</button><AssistantDock /></Providers>);
    const trigger = screen.getByRole("button", { name: "Open assistant" });
    trigger.focus();
    act(() => window.dispatchEvent(new Event("portfolio:assistant-open")));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeVisible();
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("button", { name: /chat directly with breno/i })).not.toBeInTheDocument();
  });
});
