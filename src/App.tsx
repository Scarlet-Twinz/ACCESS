import { useEffect, useMemo, useState } from "react";
import { challenges, learnTopics } from "./data";
import type { Activity, Challenge, Finding, InspectionFinding, Page, ReportState } from "./types";

const STORAGE_KEY = "access-report-v2";
const emptyReport: ReportState = {
  completed: [], attempts: {}, findings: [], inspectionFindings: [], contrastChecks: 0,
  contrastHistory: [], keyboardCompleted: false, activity: [],
};

const pages: Page[] = ["home", "learn", "challenges", "challenge", "inspector", "contrast", "keyboard", "report", "about"];

function getPage(): Page {
  const raw = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return pages.includes(raw as Page) ? raw as Page : "home";
}
function getChallengeId() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/");
  return parts[1] || challenges[0].id;
}
function navigate(page: Page, id?: string) {
  window.location.hash = id ? "#/" + page + "/" + id : "#/" + page;
}
function loadReport(): ReportState {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    if (!stored || !Array.isArray(stored.completed)) return emptyReport;
    return { ...emptyReport, ...stored, attempts: stored.attempts || {}, findings: stored.findings || [], inspectionFindings: stored.inspectionFindings || [], contrastHistory: stored.contrastHistory || [], activity: stored.activity || [] };
  } catch { return emptyReport; }
}
function addActivity(current: ReportState, item: Activity) {
  return [item, ...current.activity.filter((entry) => entry.id !== item.id)].slice(0, 12);
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage());
  const [report, setReport] = useState<ReportState>(loadReport);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPage(getPage());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", sync);
    if (!window.location.hash) navigate("home");
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(report)); }, [report]);

  const startChallenge = (id: string) => setReport((current) => ({
    ...current,
    attempts: { ...current.attempts, [id]: (current.attempts[id] || 0) + 1 },
    activity: addActivity(current, { id: "start-" + id, type: "challenge", label: "Challenge started", detail: challenges.find((c) => c.id === id)?.title || id, at: new Date().toISOString() }),
  }));

  const completeChallenge = (challenge: Challenge) => {
    const finding: Finding = { id: challenge.id, challengeId: challenge.id, title: challenge.title, status: "verified", detail: challenge.verification };
    setReport((current) => ({
      ...current,
      completed: current.completed.includes(challenge.id) ? current.completed : [...current.completed, challenge.id],
      findings: [...current.findings.filter((item) => item.challengeId !== challenge.id), finding],
      activity: addActivity(current, { id: "complete-" + challenge.id, type: "challenge", label: "Challenge verified", detail: challenge.title, at: new Date().toISOString() }),
    }));
  };

  const recordInspection = (findings: InspectionFinding[]) => setReport((current) => ({
    ...current, inspectionFindings: findings,
    activity: addActivity(current, { id: "inspection", type: "inspection", label: "Guided inspection completed", detail: findings.length + " structured findings returned", at: new Date().toISOString() }),
  }));

  const recordContrast = (check: { foreground: string; background: string; ratio: number; normal: boolean; large: boolean; nonText: boolean }) => {
    const item = { ...check, id: "contrast-" + Date.now(), at: new Date().toISOString() };
    setReport((current) => ({
      ...current, contrastChecks: current.contrastChecks + 1, contrastHistory: [item, ...current.contrastHistory].slice(0, 10),
      activity: addActivity(current, { id: item.id, type: "contrast", label: "Contrast check recorded", detail: item.ratio.toFixed(2) + ":1", at: item.at }),
    }));
  };

  const completeKeyboard = () => setReport((current) => ({
    ...current, keyboardCompleted: true,
    activity: addActivity(current, { id: "keyboard", type: "keyboard", label: "Keyboard lab verified", detail: "Final keyboard interaction completed", at: new Date().toISOString() }),
  }));

  const resetReport = () => { setReport(emptyReport); localStorage.removeItem(STORAGE_KEY); };

  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#/home" aria-label="ACCESS home"><span className="brand-mark" aria-hidden="true">A</span><span><strong>ACCESS</strong><small>build for everyone</small></span></a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      <nav id="primary-nav" className={"primary-nav " + (menuOpen ? "open" : "")} aria-label="Primary navigation">
        {pages.filter((item) => item !== "challenge").map((key) => <a key={key} className={page === key ? "active" : ""} href={"#/" + key}>{key[0].toUpperCase() + key.slice(1)}</a>)}
      </nav>
    </header>
    <main id="main-content" tabIndex={-1}>
      {page === "home" && <Home report={report} />}
      {page === "learn" && <Learn />}
      {page === "challenges" && <Challenges completed={report.completed} attempts={report.attempts} />}
      {page === "challenge" && <ChallengePage id={getChallengeId()} completed={report.completed} onStart={startChallenge} onComplete={completeChallenge} />}
      {page === "inspector" && <Inspector onComplete={recordInspection} />}
      {page === "contrast" && <Contrast onCheck={recordContrast} />}
      {page === "keyboard" && <Keyboard done={report.keyboardCompleted} onComplete={completeKeyboard} />}
      {page === "report" && <Report report={report} onReset={resetReport} />}
      {page === "about" && <About report={report} />}
    </main>
    <footer className="site-footer"><span>ACCESS · interactive accessibility learning</span><span>Built with accessibility as an engineering requirement.</span></footer>
  </div>;
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>;
}
function Home({ report }: { report: ReportState }) {
  const progress = Math.round(report.completed.length / challenges.length * 100);
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">INTERACTIVE ACCESSIBILITY LABORATORY</span><h1>Build for <em>everyone.</em></h1><p className="hero-lede">Experience accessibility problems, identify what is wrong, repair the interface, and verify the result.</p><div className="hero-actions"><a className="button primary" href="#/challenges">Explore challenges</a><a className="button secondary" href="#/learn">Learn the fundamentals</a></div><div className="home-progress"><strong>{report.completed.length}/10</strong><span>challenges verified</span><div className="report-bar"><span style={{ width: progress + "%" }} /></div></div></div>
      <div className="hero-panel" aria-labelledby="loop-title"><div className="panel-label" id="loop-title">THE ACCESS LOOP</div>{["Experience","Identify","Repair","Verify"].map((item, i) => <div className="loop-step" key={item}><span>0{i + 1}</span><strong>{item}</strong><i aria-hidden="true">→</i></div>)}</div>
    </section>
    <section className="section"><div className="section-heading"><span className="eyebrow">WHY ACCESS</span><h2>Accessibility becomes easier to understand when you can experience the problem.</h2></div><div className="feature-grid"><Feature n="01" title="Experience" text="Interact with deliberately flawed interface patterns instead of reading about them in isolation." /><Feature n="02" title="Understand" text="Connect observable behavior to the people and interaction needs it affects." /><Feature n="03" title="Verify" text="Repair the problem and repeat the interaction to see whether the experience actually improved." /></div></section>
    <section className="section compact"><div className="section-heading"><span className="eyebrow">START HERE</span><h2>Choose a learning path.</h2></div><div className="path-grid"><a className="path-card" href="#/learn"><strong>Learn</strong><span>Build the mental model first.</span>→</a><a className="path-card" href="#/challenges"><strong>Practice</strong><span>Work through ten focused scenarios.</span>→</a><a className="path-card" href="#/inspector"><strong>Inspect</strong><span>Review structured findings.</span>→</a><a className="path-card" href="#/report"><strong>Report</strong><span>See what you have verified locally.</span>→</a></div></section>
  </>;
}
function Feature({ n, title, text }: { n: string; title: string; text: string }) { return <article className="feature"><span>{n}</span><h3>{title}</h3><p>{text}</p></article>; }

function Learn() {
  return <><PageIntro eyebrow="01 / LEARN" title="Understand the foundations." text="Short, practical lessons connect accessibility concepts to the interactions you will test in ACCESS." /><section className="content-grid">{learnTopics.map((topic, i) => <article className="lesson" key={topic.id}><span className="lesson-index">{String(i + 1).padStart(2, "0")}</span><h2>{topic.title}</h2><p>{topic.text}</p><a className="text-link" href={"#/challenge/" + topic.challengeId}>Practice this concept →</a></article>)}</section><Callout title="A useful mental model" text="Ask four questions: What is wrong? Why does it matter? How is it fixed? How do we know it is fixed?" /></>;
}

function Challenges({ completed, attempts }: { completed: string[]; attempts: Record<string, number> }) {
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const categories = ["All", ...Array.from(new Set(challenges.map((c) => c.category)))];
  const filtered = challenges.filter((c) => (category === "All" || c.category === category) && (difficulty === "All" || c.difficulty === difficulty));
  return <><PageIntro eyebrow="02 / CHALLENGES" title="Find the problem." text="Ten focused exercises turn common accessibility failures into practical investigations." /><section className="filter-bar" aria-label="Challenge filters"><label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label>Difficulty<select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>All</option><option>Beginner</option><option>Intermediate</option></select></label><span className="filter-count" aria-live="polite">{filtered.length} of {challenges.length} challenges</span></section><section className="challenge-grid">{filtered.map((c) => <article className="challenge-card" key={c.id}><div className="card-top"><span>{c.category}</span><span className="pill">{c.difficulty}</span></div><h2>{c.title}</h2><p>{c.summary}</p><div className="card-meta"><span>{completed.includes(c.id) ? "✓ Verified" : "Not verified"}</span><span>{attempts[c.id] || 0} attempt{attempts[c.id] === 1 ? "" : "s"}</span></div><a className="text-link" href={"#/challenge/" + c.id}>{completed.includes(c.id) ? "Review challenge →" : "Start challenge →"}</a></article>)}</section></>;
}

function ChallengePage({ id, completed, onStart, onComplete }: { id: string; completed: string[]; onStart: (id: string) => void; onComplete: (c: Challenge) => void }) {
  const challenge = challenges.find((c) => c.id === id) || challenges[0];
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState("");
  const [started, setStarted] = useState(false);
  const [repaired, setRepaired] = useState(false);
  const done = completed.includes(challenge.id);
  useEffect(() => { setStep(0); setChoice(""); setStarted(false); setRepaired(false); }, [challenge.id]);
  const options = useMemo(() => [challenge.issue, "The interface needs a larger heading.", "The browser needs to load the page again."], [challenge.issue]);
  const begin = () => { if (!started) onStart(challenge.id); setStarted(true); setStep(1); };
  return <><PageIntro eyebrow={"CHALLENGE / " + challenge.category.toUpperCase()} title={challenge.title} text={challenge.summary} /><div className="challenge-workspace"><aside className="challenge-sidebar" aria-label="Challenge progress">{["Scenario","Investigate","Identify","Repair","Verify"].map((label, i) => <div className={"side-step " + (step === i ? "current " : "") + (step > i ? "done" : "")} key={label}><span>{i + 1}</span>{label}</div>)}</aside><section className="challenge-main">
    {step === 0 && <div className="exercise"><span className="eyebrow">SCENARIO</span><h2>{challenge.scenario}</h2><div className="scenario-grid"><div><strong>User impact</strong><p>{challenge.impact}</p></div><div><strong>Principle</strong><p>{challenge.principle}</p></div></div><SampleInterface type={challenge.id} /><button className="button primary" type="button" onClick={begin}>I have investigated →</button></div>}
    {step === 1 && <div className="exercise"><span className="eyebrow">IDENTIFY</span><h2>What is the accessibility problem?</h2><p>{challenge.investigation}</p><div className="choice-list" role="radiogroup" aria-label="Possible findings">{options.map((option) => <label className={"choice " + (choice === option ? "selected" : "")} key={option}><input type="radio" name={"finding-" + challenge.id} value={option} checked={choice === option} onChange={() => setChoice(option)} /><span>{option}</span></label>)}</div><button className="button primary" type="button" disabled={!choice} onClick={() => setStep(choice === challenge.issue ? 3 : 2)}>Check finding</button></div>}
    {step === 2 && <div className="exercise result-wrong" role="alert"><span className="status-badge">REVIEW</span><h2>Look again.</h2><p>The selected finding does not describe the core accessibility issue in this exercise.</p><p><strong>Observation:</strong> {challenge.issue}</p><button className="button secondary" type="button" onClick={() => setStep(1)}>Try again</button></div>}
    {step === 3 && <div className="exercise"><span className="status-badge">REPAIR</span><h2>Apply the repair.</h2><p><strong>Why it matters:</strong> {challenge.why}</p><div className="repair-box"><span className="eyebrow">RECOMMENDED REPAIR</span><p>{challenge.repair}</p></div><button className="button primary" type="button" onClick={() => { setRepaired(true); setStep(4); onComplete(challenge); }}>Apply repair →</button></div>}
    {step === 4 && <div className="exercise result-right" role="status"><span className="status-badge">VERIFIED</span><h2>{repaired ? "Repair verified." : "Challenge complete."}</h2><p>{challenge.verification}</p><div className="repair-box"><span className="eyebrow">RESULT</span><p>The finding was identified, the repair was applied, and the verification step was completed.</p></div><div className="hero-actions"><a className="button primary" href="#/challenges">{done ? "Back to challenges" : "Continue →"}</a><a className="button secondary" href="#/report">View report</a></div></div>}
  </section></div></>;
}

function SampleInterface({ type }: { type: string }) {
  if (type === "form-label") return <div className="sample-ui"><label htmlFor="sample-email">Email address</label><input id="sample-email" placeholder="name@example.com" /><button type="button">Continue</button></div>;
  if (type === "contrast") return <div className="sample-ui contrast-sample"><p>Important account information</p><span>Some supporting information is difficult to perceive.</span></div>;
  if (type === "error-message") return <div className="sample-ui"><label htmlFor="error-email">Email</label><input id="error-email" aria-invalid="true" aria-describedby="error-text" /><p id="error-text">Please correct this field.</p></div>;
  if (type === "focus-loss") return <div className="sample-ui"><button type="button">Edit address</button><p>Observe where focus should return after an interface change.</p></div>;
  if (type === "pointer-dependence") return <div className="sample-ui"><button type="button">Show information</button><p>Use keyboard interaction to reach the same information.</p></div>;
  return <div className="sample-ui"><button type="button" aria-label="Open settings">⚙</button><p>Interact with the sample and consider what is communicated.</p></div>;
}

const inspectionFindings: InspectionFinding[] = [
  { id: "missing-name", title: "Button has no accessible name", severity: "Serious", element: "<button> icon control", why: "An unnamed control can be announced without a useful purpose.", repair: "Provide visible text or an appropriate accessible name for the button action.", verification: "Check the computed accessible name and operate the control with assistive technology." },
  { id: "missing-label", title: "Input requires an explicit label", severity: "Serious", element: "<input> field", why: "A placeholder is not a durable replacement for a form label.", repair: "Associate a <label> with the input using native HTML.", verification: "Focus the input and confirm its accessible name is the intended label." },
  { id: "focus-visibility", title: "Focus indicator needs stronger visual distinction", severity: "Moderate", element: "Focusable controls", why: "Keyboard users need to identify the current focus position.", repair: "Provide a clearly visible focus indicator.", verification: "Tab through the sample and identify each focused control." },
  { id: "heading-structure", title: "Heading structure should match the information hierarchy", severity: "Moderate", element: "Page headings", why: "Logical headings help users navigate and understand page structure.", repair: "Use heading levels according to document hierarchy.", verification: "Review the heading outline and confirm it communicates the intended structure." },
];

function Inspector({ onComplete }: { onComplete: (findings: InspectionFinding[]) => void }) {
  const [checked, setChecked] = useState(false);
  return <><PageIntro eyebrow="03 / INSPECTOR" title="Inspect an interface." text="Run a guided inspection against a deliberately scoped sample and turn observations into structured, human-reviewable findings." /><section className="inspector-layout"><div className="sample-frame"><div className="sample-toolbar"><span>sample-app.local</span><span>INSPECTION TARGET</span></div><div className="sample-page"><h2>Account settings</h2><p>Update your contact details.</p><label htmlFor="inspect-email">Email address</label><input id="inspect-email" placeholder="Email address" /><button type="button">Save changes</button></div></div><div className="inspector-panel"><span className="eyebrow">GUIDED CHECKS</span><p>ACCESS surfaces common concerns as evidence. It does not claim that a finite inspection proves universal accessibility.</p>{!checked ? <button className="button primary" type="button" onClick={() => { setChecked(true); onComplete(inspectionFindings); }}>Run inspection</button> : <div className="finding-list">{inspectionFindings.map((f) => <article className="finding structured-finding" key={f.id}><div className="finding-head"><span>{f.severity}</span><strong>{f.title}</strong></div><p><b>Element:</b> {f.element}</p><p><b>Why:</b> {f.why}</p><p><b>Repair:</b> {f.repair}</p><p><b>Verify:</b> {f.verification}</p></article>)}</div>}</div></section><Callout title="Automation has limits" text="A checker can surface evidence. It cannot prove every accessibility requirement, every user journey, or every assistive-technology interaction." /></>;
}

export function contrastRatio(a: string, b: string) {
  const luminance = (hex: string) => {
    const value = hex.replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(value)) return 0;
    const rgb = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
    const linear = rgb.map((v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function Contrast({ onCheck }: { onCheck: (check: { foreground: string; background: string; ratio: number; normal: boolean; large: boolean; nonText: boolean }) => void }) {
  const [foreground, setForeground] = useState("#3f4652");
  const [background, setBackground] = useState("#ffffff");
  const ratio = contrastRatio(foreground, background);
  const valid = /^#[0-9a-fA-F]{6}$/.test(foreground) && /^#[0-9a-fA-F]{6}$/.test(background);
  const normal = valid && ratio >= 4.5, large = valid && ratio >= 3, nonText = valid && ratio >= 3;
  return <><PageIntro eyebrow="04 / CONTRAST" title="Make contrast measurable." text="Test a foreground/background combination against the WCAG contrast thresholds relevant to text and meaningful interface graphics." /><section className="tool-layout"><div className="contrast-preview" style={valid ? { color: foreground, backgroundColor: background } : undefined}><span>LIVE PREVIEW</span><h2>Readable interface text</h2><p>Supporting text should remain distinguishable from its background.</p>{!valid && <strong>Enter two six-digit hex colors.</strong>}</div><div className="tool-panel"><label>Foreground<input value={foreground} onChange={(e) => setForeground(e.target.value)} aria-describedby="color-help" /></label><label>Background<input value={background} onChange={(e) => setBackground(e.target.value)} /></label><p id="color-help" className="helper">Use #RRGGBB values.</p><div className={"ratio " + (normal ? "pass" : "fail")} aria-live="polite"><span>CONTRAST RATIO</span><strong>{valid ? ratio.toFixed(2) + " : 1" : "—"}</strong><b>{normal ? "PASS — normal text" : "REVIEW — normal text"}</b></div><div className="threshold-list"><span>Normal text <b>{normal ? "PASS" : "REVIEW"}</b></span><span>Large text <b>{large ? "PASS" : "REVIEW"}</b></span><span>UI / non-text <b>{nonText ? "PASS" : "REVIEW"}</b></span></div><div className="preset-row">{[["High contrast","#000000","#ffffff"],["Dark text","#3f4652","#ffffff"],["Review","#777777","#ffffff"]].map(([label,fg,bg]) => <button className="button secondary" type="button" key={label} onClick={() => { setForeground(fg); setBackground(bg); }}>{label}</button>)}</div><button className="button primary" type="button" disabled={!valid} onClick={() => onCheck({ foreground, background, ratio, normal, large, nonText })}>Record this check</button></div></section></>;
}

function Keyboard({ done, onComplete }: { done: boolean; onComplete: () => void }) {
  const items = ["Overview","Projects","Settings","Support"];
  const [focused, setFocused] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [returnButton, setReturnButton] = useState<HTMLButtonElement | null>(null);
  const [complete, setComplete] = useState(done);
  useEffect(() => setComplete(done), [done]);
  useEffect(() => { if (!dialogOpen && returnButton) { returnButton.focus(); setReturnButton(null); } }, [dialogOpen, returnButton]);
  const activate = (index: number) => { if (index === items.length - 1) { setComplete(true); onComplete(); } };
  return <><PageIntro eyebrow="05 / KEYBOARD" title="Put the mouse down." text="Practice Tab, Shift+Tab, Enter, Space, Escape, visible focus, and predictable focus return." /><section className="keyboard-lab"><div className="keyboard-window"><div className="window-top"><span>KEYBOARD PRACTICE</span><span>FOCUS: {focused + 1}/4</span></div><nav aria-label="Practice navigation" className="practice-nav">{items.map((item,i) => <button type="button" key={item} onFocus={() => setFocused(i)} onClick={() => activate(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(i); } }}>{item}</button>)}</nav><div className="practice-content"><h2>Keyboard focus is information.</h2><p>Every focusable control should have a clear place in the interaction sequence and a visible indication when it receives focus.</p><button className="button secondary" type="button" onClick={(e) => { setReturnButton(e.currentTarget); setDialogOpen(true); }}>Open focus-return dialog</button>{complete && <p className="success-text" role="status">Practice complete. You reached the final control.</p>}</div></div><div className="keyboard-notes"><span className="eyebrow">TRY THIS</span><ol><li>Press Tab to move forward.</li><li>Press Shift + Tab to move backward.</li><li>Use Enter or Space to activate.</li><li>Open the dialog and press Escape.</li><li>Reach Support to record completion.</li></ol></div></section>{dialogOpen && <div className="modal-backdrop"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="keyboard-dialog-title"><h2 id="keyboard-dialog-title">Focus return</h2><p>Press Escape or activate Close. Focus should return to the control that opened this dialog.</p><button autoFocus className="button primary" type="button" onClick={() => setDialogOpen(false)} onKeyDown={(e) => { if (e.key === "Escape") setDialogOpen(false); }}>Close dialog</button></section></div>}</>;
}

function Report({ report, onReset }: { report: ReportState; onReset: () => void }) {
  const percent = Math.round(report.completed.length / challenges.length * 100);
  const categories = Array.from(new Set(challenges.map((c) => c.category)));
  const completedCategories = categories.filter((category) => challenges.filter((c) => c.category === category).every((c) => report.completed.includes(c.id))).length;
  return <><PageIntro eyebrow="06 / REPORT" title="See what you verified." text="Your local session report records challenges, findings, tool activity, and recent work. Nothing is sent to a server." /><section className="report-hero"><div><span className="eyebrow">SESSION PROGRESS</span><strong>{percent}%</strong><p>{report.completed.length} of {challenges.length} challenges verified</p></div><div className="report-bar"><span style={{ width: percent + "%" }} /></div></section><section className="report-grid"><ReportMetric label="Challenges" value={report.completed.length + "/" + challenges.length} /><ReportMetric label="Categories" value={completedCategories + "/" + categories.length} /><ReportMetric label="Findings" value={String(report.findings.length + report.inspectionFindings.length)} /><ReportMetric label="Tool checks" value={String(report.contrastChecks + (report.keyboardCompleted ? 1 : 0))} /></section><section className="section compact"><div className="section-heading"><span className="eyebrow">RECENT ACTIVITY</span><h2>What happened in this session.</h2></div>{report.activity.length ? <ol className="activity-list">{report.activity.map((item) => <li key={item.id}><span>{item.type}</span><div><strong>{item.label}</strong><p>{item.detail}</p></div><time dateTime={item.at}>{new Date(item.at).toLocaleString()}</time></li>)}</ol> : <p>No activity yet. Start with a challenge, the Inspector, Contrast, or Keyboard lab.</p>}</section><section className="section compact"><div className="section-heading"><span className="eyebrow">VERIFIED FINDINGS</span><h2>Evidence recorded in this session.</h2></div>{report.findings.length ? <div className="finding-list">{report.findings.map((f) => <div className="finding" key={f.id}><span>✓</span><p><strong>{f.title}</strong><br />{f.detail}</p><strong>{f.status.toUpperCase()}</strong></div>)}</div> : <p>No challenge findings yet.</p>}</section><button className="button secondary" type="button" onClick={onReset}>Reset local report</button></>;
}
function ReportMetric({ label, value }: { label: string; value: string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div>; }

function About({ report }: { report: ReportState }) {
  const audit = ["Keyboard navigation","Visible focus","Heading hierarchy","Accessible names and labels","Contrast and status feedback","Reduced-motion support","Skip navigation","Responsive layout","Human-review boundary"];
  return <><PageIntro eyebrow="07 / ABOUT" title="A practical way to learn accessibility." text="ACCESS is a focused portfolio project built around interaction, verification, and responsible accessibility education." /><section className="about-grid"><article><span className="eyebrow">WHAT IT IS</span><h2>Experience the problem. Fix the interface.</h2><p>ACCESS turns common web accessibility failures into focused investigations for developers and learners.</p></article><article><span className="eyebrow">WHAT IT IS NOT</span><h2>Not a compliance certificate.</h2><p>Passing an automated check does not prove that every user can use an interface. ACCESS keeps automated evidence, observable behavior, and human evaluation distinct.</p></article></section><section className="section compact"><div className="section-heading"><span className="eyebrow">ACCESS SELF-AUDIT</span><h2>The product should practice what it teaches.</h2></div><div className="audit-grid">{audit.map((item) => <div className="audit-item" key={item}><span aria-hidden="true">✓</span><strong>{item}</strong><b>Checked</b></div>)}</div><p className="audit-note">This documents the project's engineering checks; it is not a claim of universal accessibility conformance.</p></section><section className="section compact"><div className="section-heading"><span className="eyebrow">FOUNDATION</span><h2>Built around W3C accessibility guidance.</h2></div><p>ACCESS uses WCAG 2.2 and WAI guidance as reference material.</p><div className="reference-list"><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">WCAG 2.2 ↗</a><a href="https://www.w3.org/WAI/fundamentals/accessibility-principles/" target="_blank" rel="noreferrer">WAI Accessibility Principles ↗</a><a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noreferrer">ARIA Authoring Practices ↗</a></div></section><section className="section compact"><div className="section-heading"><span className="eyebrow">LOCAL-FIRST</span><h2>Your learning report stays in your browser.</h2></div><p>{report.completed.length} challenge{report.completed.length === 1 ? "" : "s"} verified in the current local session. Resetting the report removes the stored ACCESS session data from this browser.</p></section></>;
}
function Callout({ title, text }: { title: string; text: string }) { return <aside className="callout"><strong>{title}</strong><p>{text}</p></aside>; }

export { contrastRatio };