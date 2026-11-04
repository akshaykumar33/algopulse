# Reach The Point (CodeChef CC-RETPO)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-RETPO](https://www.codechef.com/problems/RETPO)
- **Difficulty / Rating:** 1495
- **Tags:** codechef, math, geometry
- **Solution File:** `reachThePoint.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
The robot alternates between movements along axes:
- Initially facing $+X$, its first turn forces a step along the $Y$-axis.
- Odd steps $1, 3, 5, \dots$ move along the $Y$-axis.
- Even steps $2, 4, 6, \dots$ move along the $X$-axis.

Let $X = |x|, Y = |y|$.
- If $X = Y$, steps strictly alternate, giving $2X$ total moves.
- If $Y > X$, $Y$ steps along the $Y$-axis are required. If $(Y - X)$ is odd, the traversal concludes on a $Y$-step taking $2Y - 1$ moves. If $(Y - X)$ is even, an extra $X$-step is required to balance parity, giving $2Y$ moves.
- If $X > Y$, $X$ steps along the $X$-axis take up to step $2X$. If $(X - Y)$ is even, the intermediate $Y$-steps balance net displacement $Y$, giving $2X$ moves. If $(X - Y)$ is odd, an additional $Y$-step is required, taking $2X + 1$ moves.

```mermaid
flowchart TD
    A[Start: Read x, y] --> B[X = |x|, Y = |y|]
    B --> C{Is X == Y?}
    C -- Yes --> D[ans = 2 * X]
    C -- No --> E{Is Y > X?}
    E -- Yes --> F{Is (Y - X) % 2 == 1?}
    F -- Yes --> G[ans = 2 * Y - 1]
    F -- No --> H[ans = 2 * Y]
    E -- No --> I{Is (X - Y) % 2 == 1?}
    I -- Yes --> J[ans = 2 * X + 1]
    I -- No --> K[ans = 2 * X]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(1)$ | Direct closed-form arithmetic per test case. |
| **Space Complexity** | $O(1)$ | No memory allocated. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/reachThePoint.js
```
