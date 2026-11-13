# Haunted Mansion AI — Spec: Requirements

> Spec-driven development (Kiro style). Written 2026-11-12, before any code.
> Track: **Frankenstein** — stitch together seemingly incompatible pieces into one
> app: (1) a deterministic interactive horror-story generator, (2) a trick-or-treat
> neighbourhood map, (3) a haunted-mansion room explorer, (4) a spooky UI shell.
> All client-side logic, zero API keys, zero accounts, works offline except map tiles.

## Introduction

A Halloween web app for trick-or-treat night. A visitor picks a setting, a monster
and a twist, gets a multi-chapter interactive horror story with choices that branch,
explores a haunted mansion room by room, and plans a trick-or-treat route on a map
of decorated houses with candy ratings. Everything runs locally; no backend, no
login, no tracking.

## Glossary

- **Story seed**: the triple (setting, monster, twist) plus a numeric seed that
  deterministically drives story generation.
- **Chapter**: one story beat: title, prose (2–4 paragraphs), and 2 choices.
- **Choice**: a decision that advances to the next chapter and changes the ending.
- **Ending**: one of 3 endings (Escape / Haunted / Tricked) determined by choices.
- **House**: a trick-or-treat stop: name, coordinates, candy rating (1–5 pumpkins),
  scare level, treats offered, open hours.
- **Room**: one explorable mansion room with description, clue, and item.

## Requirements

### Requirement 1 — Story generator (deterministic)

**User Story:** As a visitor, I want to generate an interactive horror story from a
setting, monster and twist, so I can play a short spooky adventure in minutes.

#### Acceptance Criteria

1. WHEN the user picks a setting, monster and twist and presses Generate, THE
   Haunted_Mansion_AI SHALL produce a story of exactly 5 chapters plus 1 ending.
2. WHEN the same seed (setting + monster + twist + numeric seed) is used twice, THE
   Haunted_Mansion_AI SHALL produce identical chapter text (deterministic).
3. WHEN the user changes only the numeric seed, THE Haunted_Mansion_AI SHALL produce
   different chapter text.
4. WHEN a chapter is shown, THE Haunted_Mansion_AI SHALL show exactly 2 choices,
   except the final chapter which shows the ending instead.
5. WHEN the user picks a choice, THE Haunted_Mansion_AI SHALL advance to the next
   chapter and record the choice in a visible story log.
6. WHEN all 5 chapters are complete, THE Haunted_Mansion_AI SHALL show one of the
   endings Escape, Haunted, or Tricked, derived from the choices made.
7. WHEN the user picks "Surprise me", THE Haunted_Mansion_AI SHALL randomise
   setting, monster, twist and seed.

### Requirement 2 — Mansion explorer

**User Story:** As a visitor, I want to explore the haunted mansion room by room, so
the story world feels like a place.

#### Acceptance Criteria

1. WHEN the mansion view loads, THE Haunted_Mansion_AI SHALL show at least 6 rooms
   (Foyer, Library, Kitchen, Cellar, Attic, Ballroom).
2. WHEN a room is selected, THE Haunted_Mansion_AI SHALL show its description, one
   clue, and one collectible item.
3. WHEN an item is collected, THE Haunted_Mansion_AI SHALL add it to the inventory
   and mark the room as looted (collecting twice SHALL NOT duplicate the item).
4. WHEN all 6 rooms are looted, THE Haunted_Mansion_AI SHALL show the "Master of
   the Mansion" badge.

### Requirement 3 — Trick-or-treat map

**User Story:** As a parent or trick-or-treater, I want a map of nearby decorated
houses with candy ratings, so I can plan a route.

#### Acceptance Criteria

1. WHEN the map view loads, THE Haunted_Mansion_AI SHALL show at least 8 houses
   as markers on an interactive map.
2. WHEN a marker is clicked, THE Haunted_Mansion_AI SHALL show the house name,
   candy rating (1–5), scare level, treats, and hours.
3. WHEN the user filters by minimum candy rating, THE Haunted_Mansion_AI SHALL hide
   houses below that rating in both map and list.
4. WHEN map tiles cannot load (offline), THE Haunted_Mansion_AI SHALL still show
   the full house list with the same details (graceful degradation).
5. WHEN the user picks "Best route", THE Haunted_Mansion_AI SHALL order the visible
   houses by candy rating descending and show the ordered list.

### Requirement 4 — Spooky UI shell

**User Story:** As a visitor, I want a polished Halloween interface, so the app feels
haunting rather than generic.

#### Acceptance Criteria

1. WHEN the app loads, THE Haunted_Mansion_AI SHALL show a dark theme with
   pumpkin-orange accents and a visible title.
2. WHEN the user switches tabs (Story / Mansion / Map), THE Haunted_Mansion_AI
   SHALL switch views without a page reload.
3. WHEN the user toggles sound, THE Haunted_Mansion_AI SHALL remember the choice
   in localStorage (no audio files are required; toggle state only).

### Requirement 5 — Zero-dependency local run

**User Story:** As a judge, I want to run the app with one command and no accounts,
so I can verify it in under a minute.

#### Acceptance Criteria

1. WHEN a judge runs `npm start`, THE Haunted_Mansion_AI SHALL serve the app on
   http://localhost:3000 with no build step and no npm install step (zero
   dependencies).
2. WHEN a judge runs `npm test`, THE Haunted_Mansion_AI SHALL run the full test
   suite with Node's built-in test runner and exit 0.
3. WHEN the app is served, THE Haunted_Mansion_AI SHALL respond 200 on `/` and on
   `/healthz` (JSON `{"status":"ok"}`).

## Non-Goals

- No user accounts, no database, no server-side AI calls (no API keys).
- No real geolocation: house coordinates are fictional, centred on a demo
  neighbourhood (Salem, MA area) so the map works anywhere.
- No audio files shipped; sound toggle is state-only (future enhancement).
