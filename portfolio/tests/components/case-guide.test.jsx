import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseGuide } from "@/components/taskroom/CaseGuide";

afterEach(() => { cleanup(); Object.defineProperty(window, "scrollY", { configurable: true, value: 0 }); });

describe("case study guide", () => {
  it("tracks scroll direction without taking the section menu away when it is open", async () => {
    render(<CaseGuide lang="en" />);
    const guide = screen.getByRole("navigation", { name: "Case study navigation" });
    const trigger = screen.getByRole("button", { name: /overview/i });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 200 });
    fireEvent.scroll(window);
    await waitFor(() => expect(guide).toHaveAttribute("data-reading-down", "true"));
    fireEvent.click(trigger);
    expect(guide).toHaveAttribute("data-open", "true");
    expect(screen.getByRole("link", { name: /the decision/i })).toBeVisible();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 100 });
    fireEvent.scroll(window);
    await waitFor(() => expect(guide).toHaveAttribute("data-reading-down", "false"));
  });

  it("closes the menu with Escape from a link and returns focus to the trigger", () => {
    render(<CaseGuide lang="en" />);
    const trigger = screen.getByRole("button", { name: /overview/i });
    fireEvent.click(trigger);
    const link = screen.getByRole("link", { name: /the decision/i });
    link.focus();
    fireEvent.keyDown(link, { key: "Escape" });
    expect(screen.queryByRole("link", { name: /the decision/i })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
