# The Tricky Deal (CodeChef CC-TRICKYDL)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-TRICKYDL](https://www.codechef.com/problems/TRICKYDL)
- **Difficulty / Rating:** 1431
- **Tags:** codechef, math, greedy, simulation
- **Solution File:** `theTrickyDeal.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
On day $d$, Chef receives $A$ rupees and pays $2^{d-1}$ rupees.
The cumulative net profit after $d$ days is:
$$Profit(d) = d \cdot A - (2^d - 1)$$
Because $2^{d-1}$ doubles each day, it quickly overtakes $A$. For any $A \le 10^9$, $2^{d-1} > A$ by $d = 31$, and cumulative profit turns permanently negative by $d \le 40$.
Simulating day by day using `BigInt` allows:
- Tracking $D_1$: the latest day $d$ with $Profit(d) > 0$.
- Tracking $D_2$: the day $d$ maximizing $Profit(d)$ (which occurs when $2^{d-1} < A$ just before the daily contribution turns negative).

```mermaid
flowchart TD
    A[Start: Read A] --> B[Initialize cumProfit = 0, pay = 1, d = 1]
    B --> C[cumProfit += A - pay]
    C --> D{cumProfit > 0?}
    D -- Yes --> E[D1 = d]
    D -- No --> F[Check termination]
    E --> G{cumProfit > maxProfit?}
    G -- Yes --> H[maxProfit = cumProfit, D2 = d]
    G -- No --> I[Advance day]
    H --> I
    I --> J{cumProfit <= 0 and d > 1?}
    J -- Yes --> K[Break loop]
    J -- No --> L[pay *= 2, d++, repeat loop]
    L --> C
    K --> M[Output D1, D2]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(\log A)$ | Loop terminates in at most $\approx 40$ steps per testcase. |
| **Space Complexity** | $O(1)$ | BigInt accumulators. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/theTrickyDeal.js
```
