# CLAUDE.md

## Project Overview

This project is a **client-side only React application** that manages a list of frontend challenges based on Figma community files.

The input is a JSON file containing an ordered list of challenges. Each challenge represents a frontend UI to be implemented separately (outside the scope of this app).

This application acts as a **challenge tracker**, allowing users to manage progress and metadata for each challenge.

No backend or server-side code is allowed.

---

## Core Requirements

### Data Source

The application must start from a JSON file with the following structure:

```json
[
  {
    "id": 1,
    "title": "Player de Música",
    "url": "https://www.figma.com/community/file/1195050524500542670/player-de-musica-desafio-01"
  }
]
```

Rules:

- `id` is unique and already ordered.
- Initial status for all items is `todo`.
- Initial `githubRepoUrl` is `null`.

---

### Functional Requirements

The application must support:

#### 1. Listing Challenges

- Display all items from the JSON file.
- Always keep items ordered by `id` (ascending).
- Do **not** allow manual reordering.

#### 2. Status Management

Each item must have a status:

- `todo`
- `doing`
- `done`

Users must be able to:

- Change the status of an item.
- See the current status clearly in the UI.

#### 3. Filtering

Allow filtering the list by:

- All
- Todo
- Doing
- Done

Filtering must not affect the underlying data order.

#### 4. GitHub Repository Attachment

Each item must allow:

- Attaching a GitHub repository URL.
- Editing or clearing the URL.
- Validating that the value looks like a GitHub repository URL (basic validation is sufficient).

#### 5. Import / Export State

The application must support:

- Exporting the current state (including status and GitHub URLs) as a JSON file.
- Importing a previously exported JSON file to restore state.

Imported data must:

- Match existing challenge IDs.
- Override only user-managed fields (`status`, `githubRepoUrl`).
- Preserve the original challenge list structure.

---

## Data Model

Internally, each challenge should be represented as:

```ts
{
  id: number;
  title: string;
  url: string;
  status: "todo" | "doing" | "done";
  githubRepoUrl: string | null;
}
```

---

## Technical Constraints

### Stack

- React (required)
- Additional libraries are allowed if they add clear value
- No backend
- No authentication
- No database

### State Management

- Use React state, context, or a lightweight state library.
- Avoid overengineering.
- Persistence should rely on:
  - Import/export JSON
  - Optional: localStorage for convenience

### Routing

- Optional
- A single-page layout is acceptable and preferred.

---

## UI / UX Guidelines

- Keep the UI simple and functional.
- Prioritize clarity over visual complexity.
- Status should be visually distinguishable.
- Filtering should be immediate (no page reloads).
- Import/export actions should be explicit and safe (avoid accidental overwrites).

---

## Suggested Architecture

The following structure is recommended but not mandatory:

```
src/
  components/
    ChallengeList.tsx
    ChallengeItem.tsx
    StatusFilter.tsx
    ImportExport.tsx
  data/
    challenges.json
  hooks/
    useChallenges.ts
  types/
    Challenge.ts
  utils/
    importExport.ts
  App.tsx
  main.tsx
```

---

## Implementation Steps (Suggested)

1. Bootstrap a React project.
2. Load the initial JSON file.
3. Define the challenge data model.
4. Implement listing and ordering.
5. Add status management.
6. Implement filtering.
7. Add GitHub repo URL editing.
8. Implement import/export functionality.
9. Add localStorage persistence.
10. Polish UI and edge cases.

---

## Non-Goals

The following are explicitly out of scope:

- Backend APIs
- User accounts
- Real-time collaboration
- Hosting or deployment
- Editing the original challenge list itself

---

## Quality Expectations

- Clean, readable React code.
- Functional components and hooks.
- Reasonable separation of concerns.
- No unused dependencies.
- No dead code.

---

## Final Note

This project should be treated as a **developer productivity tool**, not a design showcase.
Focus on correctness, simplicity, and maintainability.
