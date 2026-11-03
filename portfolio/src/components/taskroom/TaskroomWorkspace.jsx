"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  blankRequest, details, moveRequest, nextAction, owners, readWorkspace,
  readyBlock, recordEvent, statuses, storageKey, validateRequest,
} from "@/lib/taskroom";
import s from "./TaskroomWorkspace.module.css";

const fieldLabels = {
  title: "Request title", requester: "Requested by", description: "What needs to be done?",
  owner: "Owner", date: "Target date (optional)",
};
const dateLabel = value => value ? new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(value)) : "No date";
const subscribe = () => () => {};

export function TaskroomWorkspace({ frenchCase }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return mounted ? <Workspace frenchCase={frenchCase} /> : <p className="container">Loading requests…</p>;
}

function Workspace({ frenchCase }) {
  const router = useRouter();
  const caseHref = frenchCase ? "/fr/work/taskroom" : "/work/taskroom";
  const [loaded] = useState(readWorkspace);
  const [data, setData] = useState(loaded.data);
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState(loaded.warning);
  const [screen, setScreen] = useState("inbox");
  const [selectedId, setSelectedId] = useState(data.requests[1]?.id ?? data.requests[0]?.id);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All requests");
  const [fields, setFields] = useState(blankRequest);
  const [missing, setMissing] = useState([]);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState(false);
  const focusTarget = useRef(null);
  const previousScreen = useRef("inbox");
  const dialog = useRef(null);
  const pendingDestination = useRef(null);
  const request = data.requests.find(item => item.id === selectedId);
  const filtered = data.requests.filter(item => (
    (status === "All requests" || item.status === status)
    && item.title.toLowerCase().includes(query.trim().toLowerCase())
  ));
  const isEditor = screen === "new" || screen === "edit";

  useEffect(() => {
    if (previousScreen.current !== screen) focusTarget.current?.focus();
    previousScreen.current = screen;
  }, [screen]);

  useEffect(() => {
    if (!dirty) return;
    function warn(event) {
      event.preventDefault();
      event.returnValue = true;
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (!dirty) return;
    function guardNavigation(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
      event.preventDefault();
      event.stopPropagation();
      pendingDestination.current = destination.pathname + destination.search + destination.hash;
      if (!dialog.current.open) dialog.current.showModal();
    }
    document.addEventListener("click", guardNavigation, true);
    return () => document.removeEventListener("click", guardNavigation, true);
  }, [dirty]);

  function go(next) {
    setErrors({});
    setDirty(false);
    setScreen(next);
  }

  function save(next, message) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ ...next, version: 1 }));
    } catch {
      setNotice("");
      setStorageError("Changes couldn’t be saved in this browser. Your edits are still here. Check browser storage and try again.");
      return false;
    }
    setStorageError("");
    setData(next);
    setNotice(message);
    return true;
  }

  function saveRequest(item, message) {
    return save({ ...data, requests: data.requests.map(row => row.id === item.id ? item : row) }, message);
  }

  function showEditor(kind) {
    setFields(kind === "edit"
      ? Object.fromEntries(Object.keys(blankRequest).map(key => [key, request[key]]))
      : { ...blankRequest, ...data.draft });
    go(kind);
  }

  function showClarify() {
    setMissing(request.missing);
    setNote(request.note);
    go("clarify");
  }

  function showErrors(next, form) {
    setErrors(next);
    form.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
  }

  function submitRequest(event) {
    event.preventDefault();
    const invalid = validateRequest(fields);
    if (screen === "edit" && ["Ready", "In progress"].includes(request.status) && !fields.owner) {
      invalid.owner = "Choose an owner for this brief.";
    }
    if (Object.keys(invalid).length) return showErrors(invalid, event.currentTarget);
    const clean = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]));
    const at = new Date().toISOString();
    if (screen === "edit") {
      const updated = recordEvent({ ...request, ...clean, missing }, "Brief updated", at);
      if (saveRequest(updated, "Brief saved.")) go("detail");
      return;
    }
    const id = `TR-${Math.max(100, ...data.requests.map(item => Number(item.id.slice(3)))) + 1}`;
    const created = { ...clean, id, status: "New", missing: [], note: "", history: [{ action: "Request created", at }] };
    if (save({ draft: null, requests: [created, ...data.requests] }, "Request created.")) {
      setSelectedId(id);
      go("detail");
    }
  }

  function submitDetails(event) {
    event.preventDefault();
    if (!missing.length || !note.trim()) {
      const invalid = {};
      if (!missing.length) invalid.missing = "Choose at least one missing detail.";
      if (!note.trim()) invalid.note = "Explain what needs to be provided.";
      return showErrors(invalid, event.currentTarget);
    }
    const updated = recordEvent({ ...request, missing, note: note.trim(), status: "Needs details" },
      "Details requested", new Date().toISOString());
    if (saveRequest(updated, "Details request saved.")) go("detail");
  }

  function changeStatus(to) {
    const updated = moveRequest(request, to, new Date().toISOString());
    if (!updated) return;
    if (saveRequest(updated, updated.history.at(-1).action + ".")) {
      go(to === "Completed" ? "completed" : "detail");
    }
  }

  function closeEditor() {
    if (dirty) {
      pendingDestination.current = null;
      dialog.current.showModal();
    }
    else go(screen === "new" ? "inbox" : "detail");
  }

  function toggleDetail(value) {
    setMissing(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
    setDirty(true);
  }

  const title = {
    inbox: "Requests", new: "Create a request", edit: "Edit brief",
    clarify: "Ask for details", detail: "Request details", completed: "Request completed",
  }[screen];
  const canClarify = request && ["New", "Needs details"].includes(request.status);
  const block = canClarify && readyBlock(request);
  const activeRequest = screen === "inbox" ? filtered.find(item => item.id === selectedId) : request;

  return (
    <article lang="en-GB" className={`container ${s.workspace}`}>
      <div className={s.utility}>
        <Link href={caseHref} lang={frenchCase ? "fr-CA" : undefined}>
          {frenchCase ? "← Retour à l’étude de cas" : "← Back to case study"}
        </Link>
        <span>Fictional data · Stored in this browser</span>
      </div>
      <header className={s.header}>
        <div><p className={s.eyebrow}>Taskroom / Request workspace</p><h1 ref={focusTarget} tabIndex={-1}>{title}</h1></div>
        {screen === "inbox" ? <button className={s.primary} onClick={() => showEditor("new")}>
          {data.draft ? "Resume draft" : "New request"}
        </button> : <button onClick={isEditor || screen === "clarify" ? closeEditor : () => go("inbox")}>
          {isEditor || screen === "clarify" ? "Cancel" : "All requests"}
        </button>}
      </header>
      <div role="status">{notice && <p className={s.notice}>{notice}</p>}</div>
      {storageError && <p className={s.errorBanner} role="alert">{storageError}</p>}

      {screen === "inbox" && (
        <div className={s.inbox}>
          <section className={s.queue} aria-label="Request inbox">
            <div className={s.filters}>
              <label>Search requests<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by title" /></label>
              <label>Status<select value={status} onChange={event => setStatus(event.target.value)}>
                {["All requests", ...statuses].map(value => <option key={value}>{value}</option>)}
              </select></label>
            </div>
            <p className={s.count} aria-live="polite">{filtered.length} {filtered.length === 1 ? "request" : "requests"}</p>
            {filtered.length ? <ul className={s.list}>{filtered.map(item => (
              <li key={item.id}>
                <button className={s.row} aria-current={item.id === selectedId ? "true" : undefined} onClick={() => {
                  setSelectedId(item.id);
                  go("detail");
                }}>
                  <span><span className={s.eyebrow}>{item.id}</span><strong>{item.title}</strong></span>
                  <Status value={item.status} />
                  <span className={s.rowMeta}>{item.owner || "Unassigned"} · {dateLabel(item.date)}</span>
                  <span className={s.rowNext}>{nextAction(item)}</span>
                </button>
              </li>
            ))}</ul> : <p className={s.empty}>{data.requests.length ? "No requests match your filters." : "No requests yet. Create your first request to get started."}</p>}
          </section>
          {activeRequest && <section className={s.panel} aria-label="Request preview">
            <Brief request={activeRequest} />
            <button className={s.primary} onClick={() => go("detail")}>Open request</button>
          </section>}
        </div>
      )}

      {isEditor && <form className={`${s.panel} ${s.form}`} onSubmit={submitRequest} noValidate>
        {Object.entries(fieldLabels).map(([key, label]) => {
          const props = {
            id: `taskroom-${key}`, name: key, value: fields[key], "aria-invalid": errors[key] ? true : undefined,
            "aria-describedby": errors[key] ? `taskroom-error-${key}` : undefined,
            onChange: event => {
              setFields({ ...fields, [key]: event.target.value });
              setDirty(true);
            },
          };
          return <div className={s.field} key={key}>
            <label htmlFor={props.id}>{label}</label>
            {key === "owner" ? <select {...props}><option value="">Unassigned</option>{owners.map(owner => <option key={owner}>{owner}</option>)}</select>
              : key === "description" ? <textarea {...props} rows={5} maxLength={1800} required />
                : <input {...props} type={key === "date" ? "date" : "text"} maxLength={key === "date" ? undefined : 140} required={key !== "date"} />}
            {errors[key] && <p id={`taskroom-error-${key}`} className={s.errorText}>{errors[key]}</p>}
          </div>;
        })}
        {screen === "edit" && request.missing.length > 0 && <fieldset>
          <legend>Resolved details</legend>
          {request.missing.map(value => <label className={s.checkbox} key={value}>
            <input type="checkbox" checked={!missing.includes(value)} onChange={() => toggleDetail(value)} />{value}
          </label>)}
        </fieldset>}
        <div className={s.actions}>
          <button className={s.primary} type="submit">{screen === "edit" ? "Save brief" : "Create request"}</button>
          {screen === "new" && <button type="button" onClick={() => {
            if (save({ ...data, draft: fields }, "Draft saved in this browser.")) go("inbox");
          }}>Save draft</button>}
        </div>
      </form>}

      {screen === "clarify" && <form className={`${s.panel} ${s.form}`} onSubmit={submitDetails} noValidate>
        <p>{request.title}</p>
        <fieldset aria-describedby={errors.missing ? "missing-error" : undefined}>
          <legend>What information is missing?</legend>
          {details.map(value => <label className={s.checkbox} key={value}>
            <input name="missing" type="checkbox" checked={missing.includes(value)} onChange={() => toggleDetail(value)} />{value}
          </label>)}
          {errors.missing && <p className={s.errorText} id="missing-error">{errors.missing}</p>}
        </fieldset>
        <label htmlFor="clarification-note">What should the requester provide?</label>
        <textarea id="clarification-note" name="note" value={note} rows={4} maxLength={900} required
          aria-invalid={errors.note ? true : undefined} aria-describedby={errors.note ? "note-error" : undefined}
          onChange={event => { setNote(event.target.value); setDirty(true); }} />
        {errors.note && <p className={s.errorText} id="note-error">{errors.note}</p>}
        <p className={s.hint}>This note stays with the request in this browser.</p>
        <button type="submit" className={s.primary}>Save details request</button>
      </form>}

      {(screen === "detail" || screen === "completed") && request && (
        <div className={s.inbox}>
          <section className={`${s.panel} ${s.brief}`}>
            <Brief request={request} />
            {block && <p className={s.hint}>{block}</p>}
            <div className={s.actions}>
              {canClarify && <>
                <button className={s.primary} disabled={Boolean(block)} onClick={() => changeStatus("Ready")}>Mark as ready</button>
                <button onClick={showClarify}>Ask for details</button>
              </>}
              {request.status === "Ready" && <button className={s.primary} onClick={() => changeStatus("In progress")}>Start work</button>}
              {request.status === "In progress" && <button className={s.primary} onClick={() => changeStatus("Completed")}>Mark completed</button>}
              {request.status === "Completed" && <>
                <button onClick={() => changeStatus("In progress")}>Reopen</button>
                <button onClick={() => window.print()}>Print brief</button>
                {screen === "completed" && <button onClick={() => go("detail")}>Go to request</button>}
              </>}
              {request.status !== "Completed" && <button onClick={() => { setMissing(request.missing); showEditor("edit"); }}>Edit brief</button>}
            </div>
          </section>
          <section className={s.panel} aria-label="Request activity">
            <p className={s.eyebrow}>Request log</p><h2>Activity</h2>
            <ol className={s.history}>{request.history.map(({ at, action }, index) => <li key={`${at}-${index}`}>
              <strong>{action}</strong>
              <time dateTime={at}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(at))}</time>
            </li>)}</ol>
          </section>
        </div>
      )}
      <dialog ref={dialog} className={s.dialog} aria-labelledby="discard-title" onCancel={() => { pendingDestination.current = null; }}>
        <h2 id="discard-title">Discard unsaved changes?</h2>
        <p>Changes since your last save will be lost.</p>
        <div className={s.actions}>
          <button className={s.primary} onClick={() => { pendingDestination.current = null; dialog.current.close(); }}>Keep editing</button>
          <button onClick={() => {
            const destination = pendingDestination.current;
            dialog.current.close();
            go(screen === "new" ? "inbox" : "detail");
            if (destination) router.push(destination);
          }}>Discard changes</button>
        </div>
      </dialog>
    </article>
  );
}

function Status({ value }) {
  return <span className={s.status} data-status={value}>{value}</span>;
}

function Brief({ request }) {
  return <>
    <p className={s.eyebrow}>{request.id} / Brief</p>
    <div className={s.briefHeading}><h2>{request.title}</h2><Status value={request.status} /></div>
    <div className={s.next}><span className={s.eyebrow}>Next step</span><strong>{nextAction(request)}</strong></div>
    <p className={s.description}>{request.description}</p>
    <dl className={s.facts}>
      <div><dt>Requested by</dt><dd>{request.requester}</dd></div>
      <div><dt>Owner</dt><dd>{request.owner || "Unassigned"}</dd></div>
      <div><dt>Target date</dt><dd>{dateLabel(request.date)}</dd></div>
    </dl>
    {request.note && <div className={s.detailNote}>
      <h3>{request.missing.length ? "Missing details" : "Clarification note"}</h3>
      {request.missing.length > 0 && <p>{request.missing.join(" · ")}</p>}
      <p>{request.note}</p>
    </div>}
  </>;
}
