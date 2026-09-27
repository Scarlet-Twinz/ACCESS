# ACCESS

**Build for everyone.**

ACCESS is an interactive web-accessibility learning and inspection environment built around one practical loop:

**Experience → Identify → Repair → Verify**

It turns common accessibility failures into focused investigations so developers and learners can see the problem, understand its impact, apply a repair, and verify the result.

> **Live app:** [Open ACCESS](https://scarlet-twinz.github.io/ACCESS/)

## What you can do

| Area | What to expect |
|---|---|
| **Home** | Product overview, learning loop, progress and entry points |
| **Learn** | Ten concise accessibility topics, each connected to a practical exercise |
| **Challenges** | Ten structured scenarios with filtering, attempts and verified completion |
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

## Ten practical challenges

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

The browser stores the session report in \`localStorage\`, including:

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

The Level 2 self-audit covers:

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

## Technology

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- Responsive CSS
- GitHub Actions
- GitHub Pages

The project intentionally stays static and focused. Level 2 does not add infrastructure that does not improve the learning experience.

## Run locally

Requirements:

- Node.js 20+
- npm
- modern browser

\`\`\`bash
git clone https://github.com/Scarlet-Twinz/ACCESS.git
cd ACCESS
npm install
npm run dev
\`\`\`

Verification:

\`\`\`bash
npm test
npm run build
\`\`\`

Production preview:

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project structure

\`\`\`text
ACCESS/
├── .github/
│   └── workflows/
│       ├── node-tests.yml
│       └── deploy-pages.yml
├── docs/
│   ├── LEVEL-1-PRODUCT-SPEC.md
│   └── LEVEL-2-COMPLETION.md
├── src/
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── data.ts
│   ├── types.ts
│   ├── main.tsx
│   ├── styles.css
│   └── test/
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── vitest.config.ts
\`\`\`

## Documentation

- [Level 1 product specification](docs/LEVEL-1-PRODUCT-SPEC.md)
- [Level 2 completion record](docs/LEVEL-2-COMPLETION.md)

## Deployment

ACCESS is deployed as a static site through GitHub Pages using GitHub Actions.

The deployment workflow builds the Vite application, uploads the \`dist\` artifact and publishes it through the GitHub Pages deployment environment.

## Status

**Level 2 — Complete**

Final verification is enforced by CI and browser deployment checks.

The final Level 2 gate covers:

- Challenge Engine
- Real Scenarios
- Inspection Engine
- Contrast Laboratory
- Keyboard Laboratory
- Learning System
- Progress & Reporting
- ACCESS Self-Audit
- Automated Tests
- Production Build
- Browser Verification
- Deployment

This is the final planned project level. No Level 3 is part of the project scope.

## License

No open-source license is included. ACCESS is a personal portfolio project.
