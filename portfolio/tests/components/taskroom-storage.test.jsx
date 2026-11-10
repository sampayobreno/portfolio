import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { TaskroomWorkspace } from "@/components/taskroom/TaskroomWorkspace";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

vi.mock("next/link", () => ({
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});

it("keeps the draft on screen when browser storage fails and allows retry", () => {
  const store = vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
    throw new DOMException("Storage unavailable", "QuotaExceededError");
  });
  render(<TaskroomWorkspace />);
  fireEvent.click(screen.getByRole("button", { name: "New request" }));
  fireEvent.change(screen.getByLabelText("Request title"), { target: { value: "A new brief" } });
  fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Changes couldn’t be saved");
  expect(screen.getByLabelText("Request title")).toHaveValue("A new brief");
  expect(screen.queryByText("Draft saved in this browser.")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
  expect(store).toHaveBeenCalledTimes(2);
  expect(screen.getByRole("button", { name: "Resume draft" })).toBeVisible();
  expect(screen.queryByRole("alert")).toBeNull();
});
