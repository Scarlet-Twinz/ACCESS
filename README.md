# ACCESS

**Build for everyone.**

ACCESS is an interactive web-accessibility learning and inspection environment.

Instead of treating accessibility as a checklist, ACCESS lets you **experience an interface problem, identify it, understand why it matters, repair it, and verify the result.**

## What it is

ACCESS is designed for developers, frontend learners, and technical students who want practical accessibility understanding.

The core loop is:

```
Experience → Identify → Repair → Verify
```

The application includes interactive challenges, a guided inspector, a contrast tool, keyboard practice, learning material, and a local session report.

## Core areas

- **Learn** — concise explanations of accessibility fundamentals.
- **Challenges** — ten practical accessibility investigations.
- **Inspector** — structured findings from a sample interface.
- **Contrast** — live foreground/background contrast testing.
- **Keyboard** — keyboard-navigation practice with visible focus.
- **Report** — local progress and verified findings.
- **About** — product scope and standards references.

## The ten challenges

1. The Silent Button — accessible names
2. The Unnamed Field — form labels
3. Faint Text — contrast
4. Lost Focus — focus management
5. Invisible Focus — visible keyboard focus
6. Mouse Only — keyboard interaction
7. Wrong Turn — focus order
8. Where Did I Go Wrong? — error communication
9. Looks Like a Button — semantic HTML
10. Hover Is Not Enough — pointer-independent interaction

## Standards foundation

ACCESS uses WCAG 2.2 and W3C WAI guidance as reference material.

The project deliberately separates automated checks from human evaluation. A passing automated check is not presented as proof that an interface is universally accessible.

Official references:

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/fundamentals/accessibility-principles/
- https://www.w3.org/WAI/ARIA/apg/

## Technology

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- Responsive CSS
- GitHub Actions
- GitHub Pages

No backend, database, authentication, or external API is required for the core application.

## Run locally

Requirements:

- Node.js 20+
- npm
- Modern browser

```bash
git clone https://github.com/Scarlet-Twinz/ACCESS.git
cd ACCESS
npm install
npm run dev
```

For verification:

```bash
npm test
npm run build
```

## Project structure

```text
ACCESS/
├── docs/
│   └── LEVEL-1-PRODUCT-SPEC.md
├── src/
│   ├── data.ts
│   ├── types.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── test/
├── .github/workflows/
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── vitest.config.ts
```

## Privacy

ACCESS stores session progress locally in the browser using localStorage. The core application does not send session data to a backend.

## Status

**V1 — implemented and ready for verification.**

The product specification, interactive routes, challenge system, inspection tool, contrast calculator, keyboard exercise, local report, tests, CI, and deployment workflow are included in this repository.

## License

No open-source license is currently included. This is a personal portfolio project.
