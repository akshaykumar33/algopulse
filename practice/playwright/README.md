# Playwright Platform Submission Engine

Automated browser submission pipeline for competitive programming platforms: **Codeforces**, **LeetCode**, and **CodeChef**.

Built with Playwright and stealth anti-detection evasions to automate submitting daily solved solutions, selecting Node.js / JavaScript compilers, and tracking judge verdicts.

---

## 1. Quick Start

### Check Session Authentication Status
```bash
npm run submit:status
# or
node practice/playwright/auth.js --status
```

### Save Persistent Login Sessions
Opens a visible browser window for you to log in (solve any captcha or 2FA). Sessions are automatically saved into `.auth/<platform>.json` and never committed to git:
```bash
# Authenticate all platforms interactively:
npm run submit:auth

# Or authenticate a specific platform:
node practice/playwright/auth.js --platform codeforces
node practice/playwright/auth.js --platform leetcode
node practice/playwright/auth.js --platform codechef
```

### Preview Day-Wise Submissions (Dry-Run)
Inspects the active practice day, matches solution files, checks auth, and displays the submission matrix without touching the live platform:
```bash
npm run submit:dry
# or
node practice/playwright/submit.js --dry-run
```

### Perform Automated Submissions
Submits the active practice day's solutions to each respective platform:
```bash
npm run submit
# Or run for a specific day:
node practice/playwright/submit.js --date 2026-09-30

# Filter by platform:
node practice/playwright/submit.js --platform codeforces
node practice/playwright/submit.js --platform leetcode
node practice/playwright/submit.js --platform codechef

# Submit a single problem:
node practice/playwright/submit.js --problem calculatingFunction

# Run in headless mode:
node practice/playwright/submit.js --headless

# Mirror / organize day-wise solutions into contests/<platform>/<date>/:
node practice/playwright/submit.js --mirror
```

---

## 2. Platform Engine Capabilities

| Platform | Authentication | Compiler Selection | Code Delivery | Verdict Monitoring |
|:---:|:---:|:---:|:---:|:---:|
| **Codeforces** | Cookie / storageState `.auth/codeforces.json` | Selects `Node.js` (`programTypeId`) | Sidebar submit form or `/problemset/submit` | Polls `/problemset/status?my` for Accepted / WA / TLE / Memory / Time |
| **LeetCode** | `LEETCODE_SESSION` & avatar check | Selects `JavaScript` | Monaco Editor model injection (strips local test harness) | Monitors `[data-e2e-locator="submission-result"]` for Accepted, runtime & memory percentiles |
| **CodeChef** | `codechef_session` / user check | Selects `JavaScript (Node.js)` | Monaco / Ace Editor injection | Polls IDE submission banner for Correct Answer, execution time |

---

## 3. Directory Layout

```
practice/playwright/
├── README.md               # Engine documentation & CLI guide
├── config.js               # Platform metadata, URLs, storage paths
├── browser.js              # Stealth browser launcher & evasion context
├── auth.js                 # Interactive login CLI & status inspector
├── submit.js               # Master day-wise submission CLI runner
├── submit.test.js          # Unit & integration test suite
└── platforms/
    ├── codeforces.js       # Codeforces submission engine
    ├── leetcode.js         # LeetCode Monaco editor & submission engine
    └── codechef.js         # CodeChef IDE submission engine
```

---

## 4. Security & Best Practices

1. **Credentials & Cookies are strictly local:** All session tokens and cookies are saved in `.auth/` which is ignored by `.gitignore`. Never commit `.auth/`.
2. **Anti-Detection Evasions:** Injects evasions to remove `navigator.webdriver`, mock `window.chrome.runtime`, and match desktop Chrome/Edge viewport fingerprints.
3. **Safe Cooldown:** Includes a configurable `--cooldown <ms>` delay between submissions (default 4000ms) to respect platform rate limits and avoid spam flags.
