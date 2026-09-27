# ACCESS — Level 1 Product Specification

**Project:** ACCESS  
**Version:** V1  
**Stage:** Level 1 — Product Definition  
**Status:** Complete  
**Repository:** Scarlet-Twinz/ACCESS

---

## 1. Product Definition

ACCESS is an interactive web-accessibility learning and inspection application.

Its purpose is to help developers and learners understand accessibility by letting them **experience accessibility problems, identify what is wrong, understand why it matters, repair the interface, and verify the result**.

ACCESS is not intended to be a static accessibility article, a generic checklist, or a replacement for professional accessibility auditing.

The product is built around a simple loop:

```
DISCOVER
   ↓
LEARN
   ↓
EXPERIENCE
   ↓
IDENTIFY
   ↓
REPAIR
   ↓
VERIFY
   ↓
REPORT
```

The application itself must follow the same accessibility principles that it teaches.

---

## 2. The Problem ACCESS Solves

Accessibility is often presented as a list of rules.

That approach can teach terminology without giving a developer a strong understanding of what an inaccessible interface actually feels like.

ACCESS takes a different approach.

Instead of only saying:

> "This button needs an accessible name."

ACCESS can show a broken interface, ask the user to investigate it, explain the underlying problem, let them repair it, and then demonstrate the corrected behavior.

The goal is to turn accessibility knowledge into practical engineering understanding.

---

## 3. Primary Audience

### Primary

**Web developers and frontend learners**

People who build interfaces and want to understand accessibility through practical examples.

### Secondary

**Students and technical learners**

People learning web development, frontend engineering, QA, or UI engineering.

### Secondary

**Developers preparing for accessibility-focused work**

People who want a practical environment for reviewing common accessibility problems and their fixes.

ACCESS should remain understandable to someone who knows basic HTML/CSS/JavaScript but does not already know accessibility terminology.

---

## 4. Product Goals

ACCESS V1 must:

1. Make accessibility understandable through interaction rather than documentation alone.
2. Demonstrate common accessibility failures using realistic interface examples.
3. Teach users how to identify the underlying problem.
4. Show why the problem affects real users.
5. Let users apply or select an appropriate repair.
6. Verify whether the repair solves the problem.
7. Provide a structured accessibility report.
8. Demonstrate good accessibility in ACCESS itself.
9. Work responsively across desktop and mobile layouts.
10. Remain small enough to be maintained as a focused portfolio project.

---

## 5. Non-Goals

ACCESS V1 will not attempt to become:

- A commercial accessibility scanning service.
- A browser extension.
- A replacement for professional accessibility audits.
- A complete WCAG conformance certification platform.
- An automated system that claims to detect every accessibility issue.
- A backend-heavy SaaS product.
- An AI-powered accessibility assistant.
- A database-driven account platform.
- A marketplace or community platform.

The product's value comes from **interactive learning and verification**, not infrastructure complexity.

---

## 6. Accessibility Foundation

ACCESS will use **WCAG 2.2** as its primary standards reference.

WCAG 2.2 is a W3C Recommendation and organizes accessibility around four foundational principles:

- **Perceivable**
- **Operable**
- **Understandable**
- **Robust**

WCAG 2.2 is also designed to be testable using a combination of automated testing and human evaluation.

ACCESS will therefore distinguish between:

- automated checks,
- observable interface behavior,
- and human evaluation.

ACCESS will not make an unsupported claim that an interface is universally accessible simply because an automated checker passes.

Reference: https://www.w3.org/TR/WCAG22/

---

## 7. Core Product Principle

The central design principle is:

> **Do not only tell the user what is wrong. Let the user experience, investigate, repair, and verify it.**

Every major learning interaction should answer four questions:

### What is wrong?

Identify the observed accessibility problem.

### Why does it matter?

Explain the effect on users and interaction.

### How is it fixed?

Show or apply an appropriate implementation approach.

### How do we know it is fixed?

Provide a meaningful verification step.

---

## 8. Primary User Journey

A typical user journey is:

### Step 1 — Enter ACCESS

The Home page explains the product and gives the user a clear starting point.

### Step 2 — Learn the concept

The user can read a concise explanation before attempting an exercise.

### Step 3 — Choose a challenge

The Challenges page presents practical accessibility problems.

### Step 4 — Experience the interface

The selected challenge presents a realistic interface containing a specific accessibility issue.

### Step 5 — Investigate

The user interacts with the interface and observes what happens.

### Step 6 — Identify

The user selects or describes the accessibility problem.

### Step 7 — Understand

ACCESS explains the underlying reason and the affected interaction.

### Step 8 — Repair

The user selects, applies, or demonstrates the appropriate repair.

### Step 9 — Verify

The corrected interface is tested again.

### Step 10 — Report

The result is recorded in the user's accessibility report.

---

## 9. Page Architecture

ACCESS V1 will contain **nine primary routes/pages**.

| Page | Purpose |
|---|---|
| Home | Introduce ACCESS and provide clear entry points |
| Learn | Teach core accessibility concepts |
| Challenges | Browse interactive accessibility exercises |
| Challenge | Investigate and repair a selected problem |
| Inspector | Inspect a sample interface for accessibility findings |
| Contrast | Test foreground/background contrast |
| Keyboard | Practice and understand keyboard interaction |
| Report | Review completed findings and verification results |
| About | Explain the project, standards, scope, and methodology |

These are product areas, not nine pages created merely for size.

---

## 10. Home

The Home page is the product entry point.

It must communicate three things immediately:

1. What ACCESS is.
2. Why it exists.
3. What the user can do next.

Primary actions:

- **Explore Challenges**
- **Inspect an Interface**
- **Learn Accessibility**

The page should also introduce the central product loop:

**Experience → Identify → Repair → Verify**

The Home page must remain concise and should not become a documentation wall.

---

## 11. Learn

The Learn area provides short, practical explanations.

Initial topics include:

- Accessibility fundamentals
- Semantic HTML
- Accessible names and labels
- Keyboard accessibility
- Focus management
- Color and contrast
- Forms and error handling
- Navigation and structure
- Motion and interaction
- Responsive accessibility

Each topic should connect to an interactive example or challenge whenever practical.

---

## 12. Challenges

Challenges are the main educational library.

V1 should contain approximately **10 carefully designed challenges**, rather than many shallow examples.

Initial challenge themes:

1. Missing accessible name
2. Unclear form labeling
3. Insufficient text contrast
4. Lost keyboard focus
5. Invisible focus indicator
6. Incorrect keyboard interaction
7. Illogical focus order
8. Poor error communication
9. Incorrect semantic structure
10. Interaction that depends unnecessarily on a pointer

The final challenge list may be refined during Level 3 when the individual challenge mechanics are designed.

---

## 13. Challenge Experience

Each challenge follows a consistent structure:

### Brief

Explain the scenario without immediately revealing the answer.

### Interface

Present a realistic interactive interface containing the accessibility issue.

### Investigation

Let the user interact with the interface.

### Finding

Ask the user to identify the problem.

### Explanation

Explain the problem in clear language.

### Repair

Provide an appropriate correction or repair interaction.

### Verification

Allow the user to repeat the interaction and confirm the improvement.

### Result

Record the challenge outcome.

A challenge should never depend only on guessing a multiple-choice answer.

---

## 14. Inspector

The Inspector is the developer-oriented part of ACCESS.

It presents a sample interface and reports accessibility findings.

A finding should contain:

- Issue
- Location
- Why it matters
- User impact
- Suggested repair
- Verification method

Automated checks may be used where appropriate, but ACCESS will make clear that automated results do not represent the entire accessibility evaluation.

---

## 15. Contrast

The Contrast tool allows users to test foreground and background colors.

The tool should provide:

- Foreground color
- Background color
- Calculated contrast ratio
- Normal-text result
- Large-text result
- Clear pass/fail states
- Preview of the selected combination
- Explanation of why contrast matters

The tool should use the applicable WCAG 2.2 contrast requirements rather than inventing its own thresholds.

---

## 16. Keyboard

The Keyboard area is an interactive exercise.

Users should be able to navigate a sample interface using the keyboard and observe:

- Current focus
- Focus order
- Interactive controls
- Keyboard activation
- Focus movement
- Dialog behavior
- Escape behavior where applicable

The purpose is not merely to display a keyboard shortcut list.

The user should **feel the difference between a usable and broken keyboard experience**.

W3C guidance states that functionality available by mouse should also be available by keyboard, and that keyboard focus should remain usable and visible. Reference: https://www.w3.org/WAI/fundamentals/accessibility-principles/

---

## 17. Report

The Report page summarizes the user's work.

It should show:

- Challenges attempted
- Findings identified
- Repairs completed
- Verification results
- Areas requiring review
- Learning progress

The report is educational and diagnostic.

It must not claim legal or formal accessibility compliance unless a future implementation is explicitly designed and validated for that purpose.

---

## 18. About

The About page explains:

- What ACCESS is.
- Who it is for.
- Why it was created.
- How the interactive challenges work.
- Which standards inform the project.
- What the project does not claim.
- Technology used.
- Repository information.
- Author information.

It should also link users to the official WCAG and WAI resources used as references.

---

## 19. Core Accessibility Topics

ACCESS V1 will concentrate on practical issues that can be demonstrated clearly.

### Semantic structure

Users should understand why native HTML semantics matter.

### Accessible names

Interactive controls need meaningful names so their purpose can be communicated to assistive technologies. W3C's Accessible Rich Internet Applications Authoring Practices describes accessible names as a core responsibility for authors of accessible interfaces.

Reference: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

### Keyboard access

Users should be able to complete supported interactions without requiring a mouse.

### Focus

Focus should be visible, logical, and appropriately managed during interface changes.

### Forms

Controls should have clear labels, useful instructions, and understandable error communication.

### Contrast

Text and important interface information should remain distinguishable.

### Navigation

Users should be able to determine where they are and move through the interface predictably.

### Responsive accessibility

Accessibility must remain intact when the viewport changes, including on mobile devices.

---

## 20. ACCESS Must Be Accessible

This is a product requirement, not a marketing statement.

The ACCESS application itself must be developed with accessibility as an engineering constraint.

The project will target:

- semantic HTML
- keyboard accessibility
- visible focus
- meaningful accessible names
- correctly associated form labels
- logical heading hierarchy
- sufficient contrast
- predictable navigation
- responsive layouts
- reduced-motion considerations
- accessible status and feedback messages
- appropriate use of ARIA only when native HTML is insufficient

W3C emphasizes native HTML techniques where possible and identifies accessible names and descriptions as an important responsibility when building interactive experiences.

---

## 21. Technical Direction

The current product definition intentionally keeps infrastructure simple.

### Frontend

- React
- TypeScript
- CSS

### Testing

- Vitest
- React Testing Library
- axe-core or equivalent automated accessibility testing where appropriate
- Manual keyboard testing

### Backend

None planned for V1.

### Database

None planned for V1.

### Authentication

None planned for V1.

### External APIs

None required for the core experience.

### Deployment

A static web deployment is sufficient for V1.

---

## 22. Product Data Model — Conceptual

Challenges should be represented as structured data rather than hard-coded independently into every page.

Conceptually, a challenge contains:

```text
Challenge
├── id
├── title
├── category
├── difficulty
├── scenario
├── affectedPrinciple
├── brokenInterface
├── expectedFinding
├── explanation
├── repair
├── verification
└── references
```

This allows additional challenges to be added without redesigning the application architecture.

The exact TypeScript types will be defined during the architecture phase.

---

## 23. Design Direction

ACCESS should feel like a **professional learning and inspection tool**, not a school worksheet.

The interface should be:

- clean
- modern
- focused
- highly readable
- visually distinctive
- responsive
- calm rather than overloaded
- interactive where interaction adds learning value

The design should avoid unnecessary dashboard cards, excessive gradients, meaningless statistics, and decorative complexity.

Visual hierarchy should serve comprehension.

---

## 24. Product Voice

ACCESS should speak clearly and directly.

Prefer:

> "Your button has no accessible name."

Over:

> "Oops! Something seems to be wrong with this button."

Prefer:

> "Try navigating this interface using only your keyboard."

Over:

> "Let's have some fun with keyboard magic!"

The project can be visually engaging without becoming childish.

---

## 25. V1 Success Criteria

Level 1 is considered successful when the following are clearly defined:

- Product purpose
- Target audience
- Problem being solved
- Product goals
- Non-goals
- Standards foundation
- Core learning loop
- Primary user journey
- Nine-page information architecture
- Initial challenge categories
- Inspector concept
- Contrast tool concept
- Keyboard exercise concept
- Reporting concept
- Accessibility requirements for ACCESS itself
- Technical direction
- Conceptual challenge data model
- Design direction
- Product voice
- V1 boundaries

All of these are now defined in this specification.

---

## 26. Level 1 Exit Gate

**LEVEL 1 — COMPLETE**

The project is now ready to move into **Level 2: Information Architecture and UX Design**.

Level 2 must not begin by randomly creating components.

It must first translate this specification into:

1. Route structure.
2. Navigation model.
3. Page-to-page relationships.
4. User flows.
5. Component responsibilities.
6. Challenge interaction flow.
7. Responsive behavior.
8. Accessibility requirements per page.
9. Empty, loading, success, error, and verification states.
10. A clear wireframe-level layout for every primary route.

Only after that should implementation begin.

---

## 27. Reference Standards

ACCESS uses the following authoritative resources as its accessibility foundation:

- W3C Web Content Accessibility Guidelines (WCAG) 2.2  
  https://www.w3.org/TR/WCAG22/

- W3C Web Accessibility Initiative — Accessibility Principles  
  https://www.w3.org/WAI/fundamentals/accessibility-principles/

- W3C WAI-ARIA Authoring Practices — Names and Descriptions  
  https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

These references are used to inform the product. ACCESS does not claim to replace the standards or professional accessibility evaluation.

---

## Final Product Definition

ACCESS is a practical accessibility learning environment built around one idea:

> **Don't just learn accessibility rules. Experience the interface, find the problem, fix it, and prove that the experience improved.**

That principle governs the product, the challenge system, the tools, and the way ACCESS itself is built.
