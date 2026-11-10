import { describe, expect, it } from "vitest";
import { getAssistantKnowledgeResult, SYSTEM_KNOWLEDGE } from "@/lib/portfolioAssistant";

describe("current portfolio assistant", () => {
  it("identifies the assistant and keeps unvalidated claims out of its instructions", () => {
    expect(SYSTEM_KNOWLEDGE).toContain("automated assistant");
    expect(SYSTEM_KNOWLEDGE).toContain("no case studies are currently public");
    expect(SYSTEM_KNOWLEDGE).not.toContain("Relay");
  });
  it("reports the confirmed language levels without suggesting legacy cases", () => {
    const answer = getAssistantKnowledgeResult("Quais idiomas Breno fala?", "pt");
    expect(answer.reply).toContain("espanhol B2");
    expect(answer.reply).toContain("italiano B1");
    expect(JSON.stringify(answer)).not.toMatch(/relay/i);
  });
  it("does not promote the temporarily hidden Taskroom", () => {
    const answer = getAssistantKnowledgeResult("Tell me about Taskroom", "en");
    expect(answer.reply).not.toMatch(/Taskroom/i);
    expect(answer.actions.some((action) => action.href.includes("taskroom"))).toBe(false);
  });
  it("admits unknown information rather than inventing personal claims", () => {
    const answer = getAssistantKnowledgeResult("What is Breno's university degree?", "en");
    expect(answer.reply).toMatch(/automated portfolio assistant/i);
    expect(answer.reply).toMatch(/contact Breno directly/i);
  });
});
