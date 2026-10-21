# Sale (CodeChef CC-FINALSALE)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-FINALSALE](https://www.codechef.com/problems/FINALSALE)
- **Difficulty / Rating:** 1180
- **Tags:** greedy, prefix-sums, math
- **Solution File:** `sale.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
### Problem Statement Summary
Chef knows projected sales $A_1, A_2, \dots, A_N$ for $N$ days. On any chosen day $i$ ($1 \le i \le N$), Chef can announce the shop is closing:
- Sales on day $i$ are doubled ($2 \times A_i$).
- All previous days $1 \dots i-1$ yield regular projected sales ($A_j$).
- No sales are made after day $i$ (days $i+1 \dots N$ yield 0).

Total sales if closing on day $i$:
$$\text{Total}(i) = \sum_{j=1}^{i-1} A_j + 2 \times A_i$$

### Key Observations
1. **Prefix Sum Formulation:**
   Let $P_k = \sum_{j=1}^k A_j$ with $P_0 = 0$. Then:
   $$\text{Total}(i) = P_{i-1} + 2 A_i = P_i + A_i$$
2. **Optimal Choice:**
   We want to find $\max_{1 \le i \le N} (P_{i-1} + 2 A_i)$.
3. **Single-Pass $O(N)$ Greedy Computation:**
   We maintain running prefix sum `pref` and running maximum `maxSales`. As we iterate through each day $i$, compute `pref + 2 * A[i]`, update `maxSales`, and then add `A[i]` to `pref`.

```mermaid
flowchart TD
    A[Start: Test Case with N days] --> B[Initialize pref = 0, maxSales = 0]
    B --> C[For each day i from 0 to N-1]
    C --> D[cur = pref + 2 * A[i]]
    D --> E{cur > maxSales?}
    E -- Yes --> F[maxSales = cur]
    E -- No --> G[Keep maxSales]
    F --> H[pref = pref + A[i]]
    G --> H
    H --> I{More days?}
    I -- Yes --> C
    I -- No --> J[Output maxSales]
```

---

## 3. Visual Step-by-Step Walkthrough
### Example: $A = [7, 1, 2]$
1. Day 1 ($A_1 = 7$):
   - Closing on Day 1: $\text{pref}(0) + 2 \times 7 = 14$.
   - $\text{maxSales} = 14$.
   - $\text{pref} = 7$.
2. Day 2 ($A_2 = 1$):
   - Closing on Day 2: $\text{pref}(7) + 2 \times 1 = 9$.
   - $\text{maxSales} = \max(14, 9) = 14$.
   - $\text{pref} = 7 + 1 = 8$.
3. Day 3 ($A_3 = 2$):
   - Closing on Day 3: $\text{pref}(8) + 2 \times 2 = 12$.
   - $\text{maxSales} = \max(14, 12) = 14$.
   - $\text{pref} = 8 + 2 = 10$.

Result: $14$. Closing on Day 1 is optimal.

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ per test case, $\sum O(N) \le 3 \cdot 10^5$ | Single pass over array $A$ doing $O(1)$ operations per element. |
| **Space Complexity** | $O(1)$ auxiliary | Only scalar variables `pref` and `maxSales` maintained. |
| **Numeric Range** | $\le 3 \cdot 10^{14}$ | Well within JavaScript `Number.MAX_SAFE_INTEGER` ($9 \cdot 10^{15}$). |

---

## 5. Edge Cases & Boundary Conditions
- **$N = 1$:** Closing on Day 1 yields $2 \times A_1$.
- **All elements equal:** Early days vs late days: $P_{i-1} + 2 A = (i + 1) A$, which monotonically increases, so closing on day $N$ gives $(N+1) A$.
- **Decreasing values:** Day 1 is often optimal when the first element is huge (e.g. $[10^9, 1, 1]$).
