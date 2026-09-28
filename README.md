# ACCESS

**Build for everyone.**

ACCESS is an interactive web-accessibility learning and inspection environment built around one practical loop:

**Experience → Identify → Repair → Verify**

It turns common accessibility failures into focused investigations so developers and learners can see the problem, understand its impact, apply a repair, and verify the result.

> **Live app:** [Open ACCESS](https://scarlet-twinz.github.io/ACCESS/)

---

## What you can do

| Area | What to expect |
|---|---|
| **Home** | Product overview, learning loop, progress and entry points |
| **Learn** | Concise accessibility topics connected to practical exercises |
| **Challenges** | Structured scenarios with filtering, attempts and verified completion |
| **Inspector** | Guided inspection with structured, human-reviewable findings |
| **Contrast** | Live contrast ratio testing with text and non-text guidance |
| **Keyboard** | Keyboard-only practice, visible focus and focus-return behavior |
| **Report** | Local progress, findings, tool checks and recent activity |
| **About** | Scope, standards, self-audit notes and project boundaries |

## The learning loop

Every challenge follows the same sequence:

1. **Experience** — interact with the scenario.
2. **Identify** — determine the underlying accessibility problem.
3. **Repair** — review the appropriate implementation approach.
4. **Verify** — confirm that the repaired behavior addresses the issue.

Wrong answers do not silently mark a challenge complete. They return the learner to review and retry.

## Practical accessibility challenges

ACCESS includes ten structured scenarios covering common accessibility problems:

1. **The Silent Button** — accessible names
2. **The Unnamed Field** — form labels
3. **Faint Text** — contrast
4. **Lost Focus** — focus management
5. **Invisible Focus** — visible keyboard focus
6. **Mouse Only** — keyboard interaction
7. **Wrong Turn** — focus order
8. **Where Did I Go Wrong?** — error communication
9. **Looks Like a Button** — semantic HTML
10. **Hover Is Not Enough** — pointer-independent interaction

Each challenge contains a scenario, user impact, accessibility principle, investigation target, diagnosis, repair guidance, verification step and standards reference.

## Inspection

The Inspector is intentionally scoped as a **guided inspection environment**, not a universal accessibility scanner.

Findings include:

- severity
- affected element
- why the issue matters
- suggested repair
- verification method

ACCESS deliberately separates automated evidence from human evaluation.

## Contrast laboratory

The Contrast tool calculates relative contrast ratios and reports:

- normal text
- large text
- UI / non-text guidance
- live preview
- saved local checks
- useful presets

Reference pairs such as black-on-white and white-on-black are covered by automated tests.

## Keyboard laboratory

The Keyboard lab is designed to be completed without a pointer.

Practice includes:

- Tab
- Shift + Tab
- Enter
- Space
- Escape
- visible focus
- logical focus
- dialog focus return
- a clear completion condition

## Learning system

The Learn area covers:

- Perceivable
- Operable
- Understandable
- Robust
- Semantic HTML
- Accessible names
- Focus
- Forms and errors
- Navigation
- Motion and interaction

Every topic points directly to a related challenge so learning leads into practice.

## Progress and privacy

ACCESS is local-first.

The browser stores the session report in `localStorage`, including:

- challenge attempts
- verified challenges
- findings
- inspection findings
- contrast checks
- keyboard completion
- recent activity

There is no backend, database, account system or external API required for the core application.

Use **Report → Reset local report** to clear the stored ACCESS session from the current browser.

## Accessibility of ACCESS itself

ACCESS is also treated as an accessibility engineering exercise.

The application has been reviewed for:

- keyboard navigation
- visible focus
- heading structure
- accessible names and labels
- contrast and status feedback
- reduced-motion support
- skip navigation
- responsive behavior
- appropriate human-review boundaries

The self-audit documents engineering checks; it is not a claim of universal WCAG conformance.

## Standards and references

ACCESS uses official W3C/WAI material as its standards foundation:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [WCAG Keyboard Understanding](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)

## Architecture

ACCESS is intentionally frontend-only.

The application separates the user interface, accessibility exercises, inspection logic, local reporting and verification behavior so the core experience remains testable without a backend service.

The project includes:

- React application components
- TypeScript application and domain types
- accessibility exercise data
- automated unit and component tests
- end-to-end browser verification
- Vite production builds
- GitHub Actions CI
- GitHub Pages deployment

The project deliberately stays static and focused. No infrastructure is added unless it improves the learning or inspection experience.

## Technology

| Area | Technology |
|---|---|
| Interface | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Testing | Vitest |
| Component testing | React Testing Library |
| Browser verification | Playwright |
| Styling | Responsive CSS |
| CI | GitHub Actions |
| Deployment | GitHub Pages |
| Data storage | Browser `localStorage` |
| Backend | None |
| Database | None |
| External API | None |

## Run locally

Requirements:

- Node.js 20+
- npm
- modern browser

Clone the repository:

```bash
git clone https://github.com/Scarlet-Twinz/ACCESS.git
cd ACCESS
npm install
npm run dev
```

## Testing

Run the automated test suite:

```bash
npm test
```

Create the production build:

```bash
npm run build
```

Run the browser verification suite when the required browser environment is available:

```bash
npx playwright test
```

The project uses GitHub Actions to validate the automated tests and production build.

## Deployment

ACCESS is deployed as a static site through GitHub Pages using GitHub Actions.

**Live app:** https://scarlet-twinz.github.io/ACCESS/

The deployment workflow builds the Vite application, uploads the production artifact and publishes it through the GitHub Pages deployment environment.

## Design principles

### Experience before explanation

The learner should encounter the accessibility problem before being given the answer.

### Evidence before assumptions

The Inspector provides structured evidence while keeping human evaluation in the loop.

### Repair before completion

A challenge is not complete merely because a diagnosis is correct. The repaired behavior must also be verified.

### Accessibility is part of the product

ACCESS applies the same accessibility principles to its own interface that it teaches through its exercises.

### Small scope, complete experience

The project focuses on practical accessibility learning and inspection rather than adding unnecessary infrastructure.

## Current status

**Complete — tested, production-built, browser-verified, and deployed.**

The current application includes:

- ten practical accessibility challenges
- guided inspection
- contrast testing
- keyboard-only practice
- learning topics connected to exercises
- local progress and reporting
- accessibility self-audit
- automated tests
- production build verification
- browser verification
- GitHub Actions CI
- GitHub Pages deployment

## Author

**Anthony Emmanuella Mmasinachi**

Full-stack and systems-focused developer building projects across web applications, backend systems, SaaS architecture, automation, AI integration, and practical software engineering.

## Project links

- **Live App:** https://scarlet-twinz.github.io/ACCESS/
- **Repository:** https://github.com/Scarlet-Twinz/ACCESS
- **GitHub:** https://github.com/Scarlet-Twinz

## License

No open-source license is included. ACCESS is a personal portfolio project.
