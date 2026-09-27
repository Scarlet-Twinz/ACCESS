import { useEffect, useMemo, useState } from "react";
import { challenges, learnTopics } from "./data";
import type { Finding, Page, ReportState } from "./types";

const initialReport: ReportState = {
  completed: [],
  findings: [],
  contrastChecks: 0,
  keyboardCompleted: false,
};

function getPage(): Page {
  const value = window.location.hash.replace("#/", "").split("/")[0] as Page;
  return value || "home";
}

function navigate(page: Page, id?: string) {
  window.location.hash = id ? `#/${page}/${id}` : `#/${page}`;
}

function getChallengeId() {
  const parts = window.location.hash.replace("#/", "").split("/");
  return parts[1] || challenges[0].id;
}

function loadReport(): ReportState {
  try {
    return JSON.parse(localStorage.getItem("access-report") || "") as ReportState;
  } catch {
    return initialReport;
  }
}

function App() {
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

  useEffect(() => {
    localStorage.setItem("access-report", JSON.stringify(report));
  }, [report]);

  const completedCount = report.completed.length;

  const completeChallenge = (id: string, finding: Finding) => {
    setReport((current) => ({
      ...current,
      completed: current.completed.includes(id) ? current.completed : [...current.completed, id],
      findings: [...current.findings.filter((item) => item.challengeId !== id), finding],
    }));
  };

  const updateReport = (patch: Partial<ReportState>) => {
    setReport((current) => ({ ...current, ...patch }));
  };

  const resetReport = () => {
    setReport(initialReport);
    localStorage.removeItem("access-report");
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#/home" aria-label="ACCESS home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>
            <strong>ACCESS</strong>
            <small>build for everyone</small>
          </span>
        </a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>
          Menu
        </button>
        <nav id="primary-nav" className={`primary-nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {[
            ["home", "Home"], ["learn", "Learn"], ["challenges", "Challenges"],
            ["inspector", "Inspector"], ["contrast", "Contrast"], ["keyboard", "Keyboard"],
            ["report", "Report"], ["about", "About"],
          ].map(([key, label]) => (
            <a key={key} className={page === key ? "active" : ""} href={`#/${key}`}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        {page === "home" && <Home completed={completedCount} />}
        {page === "learn" && <Learn />}
        {page === "challenges" && <Challenges completed={report.completed} />}
        {page === "challenge" && (
          <ChallengePage
            id={getChallengeId()}
            completed={report.completed}
            onComplete={completeChallenge}
          />
        )}
        {page === "inspector" && <Inspector onComplete={(finding) => updateReport({ findings: [...report.findings.filter((f) => f.id !== finding.id), finding] })} />}
        {page === "contrast" && <Contrast onCheck={() => updateReport({ contrastChecks: report.contrastChecks + 1 })} />}
        {page === "keyboard" && <Keyboard onComplete={() => updateReport({ keyboardCompleted: true })} />}
        {page === "report" && <Report report={report} onReset={resetReport} />}
        {page === "about" && <About />}
      </main>

      <footer className="site-footer">
        <span>ACCESS · interactive accessibility learning</span>
        <span>Built with accessibility as an engineering requirement.</span>
      </footer>
    </div>
  );
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function Home({ completed }: { completed: number }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">INTERACTIVE ACCESSIBILITY LABORATORY</span>
          <h1>Build for <em>everyone.</em></h1>
          <p className="hero-lede">Experience accessibility problems, identify what is wrong, repair the interface, and verify the result.</p>
          <div className="hero-actions">
            <a className="button primary" href="#/challenges">Explore challenges</a>
            <a className="button secondary" href="#/learn">Learn the fundamentals</a>
          </div>
          <p className="progress-note">{completed}/10 challenges verified</p>
        </div>
        <div className="hero-panel" aria-label="ACCESS learning loop">
          <div className="panel-label">THE ACCESS LOOP</div>
          {["Experience", "Identify", "Repair", "Verify"].map((item, index) => (
            <div className="loop-step" key={item}><span>0{index + 1}</span><strong>{item}</strong><i aria-hidden="true">→</i></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading"><span className="eyebrow">WHY ACCESS</span><h2>Accessibility is easier to understand when you can experience the problem.</h2></div>
        <div className="feature-grid">
          <Feature n="01" title="Experience" text="Interact with deliberately flawed interface patterns instead of reading about them in isolation." />
          <Feature n="02" title="Understand" text="Connect the visible behavior to the people and interaction needs it affects." />
          <Feature n="03" title="Verify" text="Repair the problem and repeat the interaction to see whether the experience actually improved." />
        </div>
      </section>
    </>
  );
}

function Feature({ n, title, text }: { n: string; title: string; text: string }) {
  return <article className="feature"><span>{n}</span><h3>{title}</h3><p>{text}</p></article>;
}

function Learn() {
  return (
    <>
      <PageIntro eyebrow="01 / LEARN" title="Understand the foundations." text="Short, practical lessons connect accessibility concepts to the interactions you will test in ACCESS." />
      <section className="content-grid">
        {learnTopics.map(([title, text]) => (
          <article className="lesson" key={title}>
            <span className="lesson-index">{String(learnTopics.findIndex((x) => x[0] === title) + 1).padStart(2, "0")}</span>
            <h2>{title}</h2><p>{text}</p>
          </article>
        ))}
      </section>
      <Callout title="A useful mental model" text="Ask four questions: What is wrong? Why does it matter? How is it fixed? How do we know it is fixed?" />
    </>
  );
}

function Challenges({ completed }: { completed: string[] }) {
  return (
    <>
      <PageIntro eyebrow="02 / CHALLENGES" title="Find the problem." text="Ten focused exercises turn common accessibility failures into practical investigations." />
      <section className="challenge-grid">
        {challenges.map((challenge, index) => (
          <article className="challenge-card" key={challenge.id}>
            <div className="card-top"><span>CHALLENGE {String(index + 1).padStart(2, "0")}</span><span className="pill">{challenge.difficulty}</span></div>
            <h2>{challenge.title}</h2><p>{challenge.summary}</p>
            <div className="card-meta"><span>{challenge.category}</span><span>{completed.includes(challenge.id) ? "✓ Verified" : "Not started"}</span></div>
            <a className="text-link" href={`#/challenge/${challenge.id}`}>{completed.includes(challenge.id) ? "Review challenge →" : "Start challenge →"}</a>
          </article>
        ))}
      </section>
    </>
  );
}

function ChallengePage({ id, completed, onComplete }: { id: string; completed: string[]; onComplete: (id: string, finding: Finding) => void }) {
  const challenge = challenges.find((item) => item.id === id) || challenges[0];
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState("");
  const [repaired, setRepaired] = useState(false);
  const done = completed.includes(challenge.id);

  const options = useMemo(() => {
    if (challenge.id === "contrast") return ["The text/background combination lacks sufficient contrast.", "The page has too many headings.", "The browser is loading slowly."];
    if (challenge.id === "form-label") return ["The input is not programmatically associated with its label.", "The input is too wide.", "The page needs more animation."];
    if (challenge.id === "focus-loss") return ["Focus is not returned to a sensible control after the dialog closes.", "The dialog uses too much space.", "The close button is too colorful."];
    return [challenge.issue, "The interface needs a larger heading.", "The page needs a different font."];
  }, [challenge]);

  const finish = () => {
    if (choice === options[0]) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const verifyRepair = () => {
    setRepaired(true);
    setStep(4);
    onComplete(challenge.id, {
      id: challenge.id,
      challengeId: challenge.id,
      title: challenge.title,
      status: "verified",
      detail: challenge.issue,
    });
  };

  return (
    <>
      <PageIntro eyebrow={`CHALLENGE / ${challenge.category.toUpperCase()}`} title={challenge.title} text={challenge.summary} />
      <div className="challenge-workspace">
        <aside className="challenge-sidebar" aria-label="Challenge progress">
          {["Scenario", "Investigate", "Identify", "Repair", "Verify"].map((label, index) => (
            <div className={`side-step ${step === index ? "current" : ""} ${step > index ? "done" : ""}`} key={label}><span>{index + 1}</span>{label}</div>
          ))}
        </aside>
        <section className="challenge-main">
          {step === 0 && (
            <div className="exercise">
              <span className="eyebrow">SCENARIO</span><h2>Something about this interface is harder to use than it should be.</h2>
              <p>Interact with the sample below. Do not worry about knowing the answer yet. Your job is to observe the behavior.</p>
              <SampleInterface type={challenge.id} />
              <button className="button primary" onClick={() => setStep(1)}>I have investigated →</button>
            </div>
          )}
          {step === 1 && (
            <div className="exercise">
              <span className="eyebrow">IDENTIFY</span><h2>What is the accessibility problem?</h2>
              <div className="choice-list" role="radiogroup" aria-label="Possible findings">
                {options.map((option) => (
                  <label className={`choice ${choice === option ? "selected" : ""}`} key={option}>
                    <input type="radio" name="finding" value={option} checked={choice === option} onChange={() => setChoice(option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <button className="button primary" disabled={!choice} onClick={finish}>Check finding</button>
            </div>
          )}
          {step === 2 && (
            <div className="exercise result-wrong">
              <span className="status-badge">REVIEW</span><h2>Look again.</h2>
              <p>The selected finding does not describe the core accessibility issue in this exercise.</p>
              <p><strong>Observation:</strong> {challenge.issue}</p>
              <button className="button secondary" onClick={() => setStep(1)}>Try again</button>
            </div>
          )}
          {step === 3 && (
            <div className="exercise">
              <span className="status-badge">REPAIR</span>
              <h2>Apply the repair.</h2>
              <p><strong>Why it matters:</strong> {challenge.why}</p>
              <div className="repair-box">
                <span className="eyebrow">RECOMMENDED REPAIR</span>
                <p>{challenge.repair}</p>
              </div>
              <button className="button primary" onClick={verifyRepair}>Apply repair →</button>
            </div>
          )}
          {step === 4 && (
            <div className="exercise result-right">
              <span className="status-badge">VERIFIED</span>
              <h2>{repaired ? "Repair verified." : "Challenge complete."}</h2>
              <p>{challenge.verification}</p>
              <div className="repair-box">
                <span className="eyebrow">RESULT</span>
                <p>The finding was identified, the recommended repair was applied, and the verification step was completed.</p>
              </div>
              <a className="button primary" href="#/challenges">{done ? "Back to challenges" : "Continue →"}</a>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function SampleInterface({ type }: { type: string }) {
  if (type === "form-label") return <div className="sample-ui"><label htmlFor="good-email">Email address</label><input id="good-email" type="email" placeholder="name@example.com" /><button type="button">Continue</button></div>;
  if (type === "contrast") return <div className="sample-ui contrast-sample"><p>Important account information</p><span>Some supporting information is difficult to perceive.</span></div>;
  if (type === "focus-loss") return <div className="sample-ui"><button type="button" onClick={(e) => (e.currentTarget.textContent = "Dialog opened")}>Edit address</button><p>Use the keyboard to observe where focus goes after an interface change.</p></div>;
  return <div className="sample-ui"><button type="button" aria-label={type === "accessible-name" ? "Open settings" : undefined}>{type === "accessible-name" ? "⚙" : "Continue"}</button><p>Try interacting with the sample and observe what is communicated.</p></div>;
}

function Inspector({ onComplete }: { onComplete: (finding: Finding) => void }) {
  const [checked, setChecked] = useState(false);
  const findings = ["Button has no accessible name", "Input requires an explicit label", "Focus indicator is difficult to distinguish"];
  return (
    <>
      <PageIntro eyebrow="03 / INSPECTOR" title="Inspect an interface." text="Review a sample component and turn observations into structured accessibility findings." />
      <section className="inspector-layout">
        <div className="sample-frame">
          <div className="sample-toolbar"><span>sample-app.local</span><span>INSPECTION TARGET</span></div>
          <div className="sample-page"><h2>Account settings</h2><p>Update your contact details.</p><input aria-label="Email address" placeholder="Email address" /><button type="button" aria-label="Save changes">Save changes</button></div>
        </div>
        <div className="inspector-panel">
          <span className="eyebrow">STATIC FINDINGS</span>
          {!checked ? <><p>Run a guided inspection to see the findings ACCESS is designed to surface.</p><button className="button primary" onClick={() => { setChecked(true); onComplete({ id: "inspector-demo", challengeId: "inspector-demo", title: "Guided inspection", status: "verified", detail: "Sample inspection completed." }); }}>Run inspection</button></> : <div className="finding-list">{findings.map((finding, i) => <div className="finding" key={finding}><span>{String(i + 1).padStart(2, "0")}</span><p>{finding}</p><strong>REVIEW</strong></div>)}</div>}
        </div>
      </section>
      <Callout title="Automation has limits" text="ACCESS uses automated checks as evidence, not as a universal declaration of accessibility. Human review still matters." />
    </>
  );
}

function Contrast({ onCheck }: { onCheck: () => void }) {
  const [foreground, setForeground] = useState("#3f4652");
  const [background, setBackground] = useState("#ffffff");
  const ratio = contrastRatio(foreground, background);
  const pass = ratio >= 4.5;
  return (
    <>
      <PageIntro eyebrow="04 / CONTRAST" title="Make contrast measurable." text="Test a foreground/background combination and see how the ratio changes as you tune the colors." />
      <section className="tool-layout">
        <div className="contrast-preview" style={{ color: foreground, backgroundColor: background }}>
          <span>LIVE PREVIEW</span><h2>Readable interface text</h2><p>Supporting text should remain distinguishable from its background.</p>
        </div>
        <div className="tool-panel">
          <label>Foreground <input value={foreground} onChange={(e) => setForeground(e.target.value)} /></label>
          <label>Background <input value={background} onChange={(e) => setBackground(e.target.value)} /></label>
          <div className={`ratio ${pass ? "pass" : "fail"}`} aria-live="polite"><span>CONTRAST RATIO</span><strong>{ratio.toFixed(2)} : 1</strong><b>{pass ? "PASS — normal text threshold" : "REVIEW — normal text threshold"}</b></div>
          <button className="button primary" onClick={onCheck}>Record this check</button>
        </div>
      </section>
    </>
  );
}

function Keyboard({ onComplete }: { onComplete: () => void }) {
  const [focused, setFocused] = useState(0);
  const items = ["Overview", "Projects", "Settings", "Support"];
  const [done, setDone] = useState(false);
  return (
    <>
      <PageIntro eyebrow="05 / KEYBOARD" title="Put the mouse down." text="Move through the controls below with Tab and Shift+Tab. The visible focus ring is part of the experience." />
      <section className="keyboard-lab">
        <div className="keyboard-window">
          <div className="window-top"><span>KEYBOARD PRACTICE</span><span>FOCUS: {focused + 1}/4</span></div>
          <nav aria-label="Practice navigation" className="practice-nav">
            {items.map((item, i) => <button type="button" key={item} autoFocus={i === focused && focused === 0} onFocus={() => setFocused(i)} onClick={() => { setFocused(i); if (i === items.length - 1) { setDone(true); onComplete(); } }}>{item}</button>)}
          </nav>
          <div className="practice-content"><h2>Keyboard focus is information.</h2><p>Every focusable control should have a clear place in the interaction sequence and a visible indication when it receives focus.</p>{done && <p className="success-text" role="status">Practice complete. You reached the final control.</p>}</div>
        </div>
        <div className="keyboard-notes"><span className="eyebrow">TRY THIS</span><ol><li>Press Tab to move forward.</li><li>Press Shift + Tab to move backward.</li><li>Watch the focus indicator.</li><li>Activate the final control to record completion.</li></ol></div>
      </section>
    </>
  );
}

function Report({ report, onReset }: { report: ReportState; onReset: () => void }) {
  const percent = Math.round((report.completed.length / challenges.length) * 100);
  return (
    <>
      <PageIntro eyebrow="06 / REPORT" title="See what you verified." text="Your local session report records completed challenges and tool activity. Nothing is sent to a server." />
      <section className="report-hero"><div><span className="eyebrow">SESSION PROGRESS</span><strong>{percent}%</strong><p>{report.completed.length} of {challenges.length} challenges verified</p></div><div className="report-bar"><span style={{ width: `${percent}%` }} /></div></section>
      <section className="report-grid">
        <ReportMetric label="Challenges" value={String(report.completed.length)} />
        <ReportMetric label="Findings" value={String(report.findings.length)} />
        <ReportMetric label="Contrast checks" value={String(report.contrastChecks)} />
        <ReportMetric label="Keyboard" value={report.keyboardCompleted ? "Verified" : "Pending"} />
      </section>
      <section className="section compact"><div className="section-heading"><span className="eyebrow">FINDINGS</span><h2>Evidence recorded in this session.</h2></div>{report.findings.length ? <div className="finding-list">{report.findings.map((f) => <div className="finding" key={f.id}><span>✓</span><p><strong>{f.title}</strong><br />{f.detail}</p><strong>{f.status.toUpperCase()}</strong></div>)}</div> : <p>No findings yet. Start a challenge or run the Inspector.</p>}</section>
      <button className="button secondary" onClick={onReset}>Reset local report</button>
    </>
  );
}

function ReportMetric({ label, value }: { label: string; value: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>;
}

function About() {
  return (
    <>
      <PageIntro eyebrow="07 / ABOUT" title="A practical way to learn accessibility." text="ACCESS is a portfolio project built around interaction, verification, and responsible accessibility education." />
      <section className="about-grid">
        <article><span className="eyebrow">WHAT IT IS</span><h2>Experience the problem. Fix the interface.</h2><p>ACCESS turns common web accessibility failures into focused investigations. It is designed for developers and learners who want practical understanding rather than a checklist alone.</p></article>
        <article><span className="eyebrow">WHAT IT IS NOT</span><h2>Not a compliance certificate.</h2><p>Passing an automated check does not prove that every user can use an interface. ACCESS keeps automated evidence, observable behavior, and human evaluation distinct.</p></article>
      </section>
      <section className="section compact"><div className="section-heading"><span className="eyebrow">FOUNDATION</span><h2>Built around W3C accessibility guidance.</h2></div><p>ACCESS uses WCAG 2.2 and WAI guidance as reference material. The application is educational and does not replace professional accessibility evaluation.</p><div className="reference-list"><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">WCAG 2.2 ↗</a><a href="https://www.w3.org/WAI/fundamentals/accessibility-principles/" target="_blank" rel="noreferrer">WAI Accessibility Principles ↗</a><a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noreferrer">ARIA Authoring Practices ↗</a></div></section>
    </>
  );
}

function Callout({ title, text }: { title: string; text: string }) {
  return <aside className="callout"><strong>{title}</strong><p>{text}</p></aside>;
}

function contrastRatio(a: string, b: string) {
  const luminance = (hex: string) => {
    const value = hex.replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(value)) return 0;
    const rgb = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
    const linear = rgb.map((v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}


export { contrastRatio };
export default App;
