# Bella ciao (CodeChef CC-CHFHEIST)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-CHFHEIST](https://www.codechef.com/problems/CHFHEIST)
- **Difficulty / Rating:** 1410
- **Tags:** codechef, math, arithmetic progression
- **Solution File:** `bellaCiao.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
The bank is hijacked for $D$ days. The money printing rate starts at $P$ dollars/day and increases by $Q$ dollars/day every $d$ days.
Let $k = \lfloor D / d \rfloor$ denote the number of complete $d$-day epochs, and $rem = D \pmod d$ the remaining days.
- During the $i$-th epoch ($0 \le i < k$), the rate is $P + i \cdot Q$. The sum printed during all $k$ full epochs is:
  $$\sum_{i=0}^{k-1} d \cdot (P + i \cdot Q) = d \cdot k \cdot P + d \cdot Q \cdot \frac{k(k-1)}{2}$$
- During the remaining $rem$ days, the rate is $P + k \cdot Q$, yielding:
  $$rem \cdot (P + k \cdot Q)$$
Combining both terms in $O(1)$ arithmetic using `BigInt` guarantees overflow immunity for $10^9$ scale variables.

```mermaid
flowchart TD
    A[Start: Read D, d, P, Q] --> B[Compute k = D / d, rem = D % d]
    B --> C[complete = d * k * P + d * Q * k * (k - 1) / 2]
    C --> D[remaining = rem * (P + k * Q)]
    D --> E[total = complete + remaining]
    E --> F[Output total in O 1]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(1)$ | Direct closed-form arithmetic progression formula evaluation per testcase. |
| **Space Complexity** | $O(1)$ | BigInt arithmetic variables. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/bellaCiao.js
```
