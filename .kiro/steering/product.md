# Product Steering

## What this is

Haunted Mansion AI — a Halloween web app for Kiroween 2026 (Frankenstein track).
One app stitched from four incompatible pieces: an interactive horror-story
generator, a haunted-mansion room explorer, a trick-or-treat map, and a spooky UI.

## Who it is for

- Trick-or-treaters and parents planning a Halloween route.
- Anyone who wants a 5-minute interactive horror story.
- Hackathon judges: the app must run with `npm start`, no accounts, no keys.

## Principles

- **Honest labelling**: the story "AI" is a deterministic seeded template
  generator. Never claim a hosted LLM is involved.
- **No accounts, no keys, no tracking.** All data is fictional and local.
- **Deterministic**: same seed → same story. Judges can reproduce any story.
- **Graceful degradation**: the map works as a list when tiles/CDN are offline.
- **Family-friendly horror**: spooky, not gory. No graphic content.
