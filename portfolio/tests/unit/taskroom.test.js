import { describe, expect, it } from "vitest";
import { initialWorkspace, moveRequest, nextAction, readyBlock } from "@/lib/taskroom";

const at = "2026-11-03T12:00:00Z";

describe("Taskroom status rules", () => {
  it("blocks Ready until the brief has an owner and its outstanding details are resolved", () => {
    const blocked = { ...initialWorkspace.requests[1], owner: "" };
    expect(readyBlock(blocked)).toMatch(/Assign an owner/);
    expect(moveRequest(blocked, "Ready", at)).toBeNull();
    const assigned = { ...blocked, owner: "Sam Rivera" };
    expect(readyBlock(assigned)).toMatch(/Resolve the missing details/);
    expect(moveRequest(assigned, "Ready", at)).toBeNull();
    const corrected = { ...assigned, missing: [] };
    expect(nextAction(corrected)).toBe("Mark as ready");
    const ready = moveRequest(corrected, "Ready", at);
    expect(ready.status).toBe("Ready");
    expect(ready.history.at(-1)).toEqual({ action: "Marked ready", at });
  });

  it("rejects jumping to completion and keeps history after reopening", () => {
    const ready = initialWorkspace.requests[2];
    expect(moveRequest(ready, "Completed", at)).toBeNull();
    const started = moveRequest(ready, "In progress", at);
    const completed = moveRequest(started, "Completed", at);
    const reopened = moveRequest(completed, "In progress", at);
    expect(reopened.status).toBe("In progress");
    expect(reopened.history.slice(-3).map(item => item.action))
      .toEqual(["Work started", "Request completed", "Request reopened"]);
  });
});
