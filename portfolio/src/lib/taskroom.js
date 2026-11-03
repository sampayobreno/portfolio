export const storageKey = "taskroom-demo-v1";
export const statuses = ["New", "Needs details", "Ready", "In progress", "Completed"];
export const owners = ["Sam Rivera", "Alex Morgan", "Jamie Lee"];
export const details = ["Deliverables", "Dimensions", "Reference materials", "Deadline"];
export const blankRequest = { title: "", requester: "", description: "", owner: "", date: "" };

export const initialWorkspace = {
  draft: null,
  requests: [
    { id: "TR-101", title: "Autumn campaign assets", requester: "North Studio · email", description: "Prepare a set of campaign assets for the autumn launch. The creative direction is approved. Confirm the final dimensions with the client before starting production.", owner: "Sam Rivera", date: "2026-11-18", status: "New", missing: [], note: "", history: [{ action: "Request created", at: "2026-11-03T09:15:00Z" }] },
    { id: "TR-102", title: "Homepage image refresh", requester: "Lakehouse · chat", description: "Replace the three homepage images using the autumn photography set.", owner: "Alex Morgan", date: "2026-11-20", status: "Needs details", missing: ["Reference materials"], note: "Please provide the final photo shortlist.", history: [{ action: "Request created", at: "2026-11-03T09:30:00Z" }, { action: "Details requested", at: "2026-11-03T10:00:00Z" }] },
    { id: "TR-103", title: "Studio welcome guide", requester: "North Studio · email", description: "Update the welcome guide with the agreed onboarding checklist.", owner: "Jamie Lee", date: "", status: "Ready", missing: [], note: "", history: [{ action: "Request created", at: "2026-11-03T10:15:00Z" }, { action: "Marked ready", at: "2026-11-03T11:00:00Z" }] },
  ],
};

export function validateRequest(fields) {
  return Object.fromEntries([
    ["title", "Enter a title to continue."],
    ["requester", "Enter who requested the work or where it came from."],
    ["description", "Describe the work before creating the request."],
  ].filter(([field]) => !fields[field].trim()));
}

export function readyBlock(request) {
  if (Object.keys(validateRequest(request)).length) return "Complete the brief before marking it ready.";
  if (!request.owner) return "Assign an owner before marking this request ready.";
  if (request.missing.length) return "Resolve the missing details before marking this request ready.";
  return "";
}

export function nextAction(request) {
  switch (request.status) {
    case "New": return request.owner ? "Review the brief" : "Assign an owner";
    case "Needs details":
      if (request.missing.length) return "Resolve missing details";
      return request.owner ? "Mark as ready" : "Assign an owner";
    case "Ready": return "Start work";
    case "In progress": return "Complete the work";
    case "Completed": return "No action needed";
  }
}

export function recordEvent(request, action, at) {
  return { ...request, history: [...request.history, { action, at }] };
}

export function moveRequest(request, to, at) {
  const from = request.status;
  const valid = (["New", "Needs details"].includes(from) && to === "Ready" && !readyBlock(request))
    || (["Ready", "Completed"].includes(from) && to === "In progress")
    || (from === "In progress" && to === "Completed");
  if (!valid) return null;
  const action = from === "Completed" ? "Request reopened" : {
    Ready: "Marked ready", "In progress": "Work started", Completed: "Request completed",
  }[to];
  return recordEvent({ ...request, status: to }, action, at);
}

export function readWorkspace() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { data: initialWorkspace, warning: "" };
    const data = JSON.parse(raw);
    if (data?.version !== 1 || !Array.isArray(data.requests) ||
        !data.requests.every(request => request && typeof request.title === "string"
          && statuses.includes(request.status) && Array.isArray(request.history) && Array.isArray(request.missing))) {
      throw new Error("Invalid saved workspace");
    }
    return { data, warning: "" };
  } catch {
    return { data: initialWorkspace, warning: "Saved data couldn’t be loaded. The sample requests are shown below." };
  }
}
