# Two Cakes (Codeforces 1130B)

## 1. Problem Overview
- **Platform:** Codeforces
- **Problem ID:** [1130B](https://codeforces.com/problemset/problem/1130/B)
- **Difficulty / Rating:** 1200
- **Tags:** greedy, implementation, math
- **Solution File:** `twoCakes1130B.js`
- **Starter Template:** `templates/codeforces.js`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Ingredient Pairing:** There are $n$ ingredients, and each ingredient $x \in \{1, \dots, n\}$ appears exactly twice among $2n$ houses.
2. **Two Independent Collectors:** Sasha and Dima each need to visit houses containing ingredients $1, 2, \dots, n$ in strictly increasing order.
3. **Greedy Transition Property:** At step $x$, the two houses containing ingredient $x$ are at positions $p_1 < p_2$. If person A is at $curA$ and person B is at $curB$, the two options are:
   - Person A goes to $p_1$ and Person B goes to $p_2$: distance is $|p_1 - curA| + |p_2 - curB|$
   - Person A goes to $p_2$ and Person B goes to $p_1$: distance is $|p_2 - curA| + |p_1 - curB|$
   Since paths do not need to cross, maintaining the order $curA \le curB$ and matching $p_1$ to the smaller and $p_2$ to the larger is always optimal and minimizes total distance.

```mermaid
flowchart TD
    A[Start: Both at House 1] --> B[Group Positions for each Ingredient 1..N]
    B --> C[For i = 1 to N: Assign p1 to PosA and p2 to PosB]
    C --> D[Accumulate Distances: |p1 - curA| + |p2 - curB|]
    D --> E[Update curA = p1, curB = p2]
    E --> F[Print Total Minimal Walking Distance]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ | Single pass to bucket house indices followed by an $O(N)$ loop over ingredients. |
| **Space Complexity** | $O(N)$ | Array of size $N+1$ storing the two positions per ingredient. |
| **Numeric Safety** | $O(N^2)$ max distance | Sum of distances can reach up to $\approx 2 \cdot 10^{10}$, well within JS safe integer limit ($9 \cdot 10^{15}$). |

---

## 4. Edge Cases & Boundary Conditions
- **$N = 1$:** Both start at 1, immediate 0 or minimal offset.
- **Sorted inputs:** Ingredients already appearing consecutively ($1, 1, 2, 2, \dots$).
- **Reverse inputs:** Maximum dispersion across the $2n$ shops.

---

## 5. Idiomatic Implementation
```javascript
// Reference: solutions/twoCakes1130B.js
```
