# Structure Steering

```
kiroween/
├── README.md                  How to run, features, honesty note
├── LICENSE                    MIT
├── SUBMISSION.md              Devpost draft (English)
├── KIRO-USAGE.md              How Kiro was (actually) used — honest log
├── package.json               scripts: start, test (zero dependencies)
├── server.js                  Zero-dep static server + /healthz
├── .gitignore                 Must NOT ignore .kiro/ (Devpost disqualifies that)
├── .kiro/
│   ├── steering/              product.md, tech.md, structure.md
│   ├── specs/haunted-mansion-ai/
│   │   ├── requirements.md    EARS-style acceptance criteria
│   │   ├── design.md
│   │   └── tasks.md
│   └── hooks/                 hooks.json (run tests on save — Kiro hook example)
├── public/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── story-engine.js    Deterministic engine (browser)
│       ├── data.js            Settings, monsters, twists, rooms, houses
│       └── app.js             UI wiring
├── lib/
│   └── story.js               Node re-export of the engine (for tests)
├── test/
│   ├── story.test.js
│   ├── server.test.js
│   └── browser-parity.test.js
└── docs/
    └── DEMO-SCRIPT.md         <3 min demo video script
```

## Conventions

- Spec first: `requirements.md` → `design.md` → `tasks.md` → code.
- Every requirement has numbered acceptance criteria; tests map to them.
- `.kiro/` is committed. Never add it to `.gitignore`.
