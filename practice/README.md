# Daily Practice

Ten Codeforces problems a day. They start easy and get harder each week.

| Week | Set |
|------|-----|
| 1 | 10 × 800 |
| 2 | 7 × 900 + 3 × 1000 |
| 3 | 7 × 1000 + 3 × 1100 |
| … | +100 per week, capped at `maxRating` in `plan.json` |

## Daily loop

1. At 12:00, the `CP Daily Practice` scheduled task runs `remind.ps1`. It builds today's set, shows a notification and opens `days/<date>/README.md`.
2. Solve each problem at the repo root as `<file>.js`, starting from `cp.js`.
3. Check your attempts against the tests:

   ```
   node practice/verify            # latest day
   node practice/verify 2026-09-25 # a specific day
   node practice/verify --ref      # the reference solutions
   ```

4. Open `days/<date>/solutions/` only after an honest attempt.

## Files

```
practice/
├── plan.json      # per-day count, rating ramp, optional Codeforces handle
├── pick.js        # picks the day's problems from the Codeforces API
├── verify.js      # runs solutions against days/<date>/tests/*.json
├── remind.ps1     # daily 12:00 reminder (Windows Task Scheduler)
└── days/<date>/
    ├── README.md  # links and checklist
    ├── set.json
    ├── tests/     # sample + edge-case tests per problem
    └── solutions/ # reference solutions
```

Set `handle` in `plan.json` to your Codeforces handle to skip problems you've already solved.
Run `node practice/pick.js --date <date> --ids 4A,71A,...` to choose a set by hand.
