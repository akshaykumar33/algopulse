# Professor And Directions (CodeChef CC-DIRECTN)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-DIRECTN](https://www.codechef.com/problems/DIRECTN)
- **Difficulty / Rating:** 1420
- **Tags:** codechef, strings, geometry
- **Solution File:** `professorAndDirections.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
The Professor starts facing North and Tokyo is facing South.
A turn of $180^\circ$ is required to face South.
Each instruction `'L'` or `'R'` rotates orientation by $\pm 90^\circ$.
A net rotation of $180^\circ$ (mod $360^\circ$) across a contiguous substring occurs if and only if two identical consecutive turns appear anywhere in the sequence (`"LL"` or `"RR"`), rotating $90^\circ + 90^\circ = 180^\circ$.
Hence, scanning for adjacent identical characters determines feasibility in $O(N)$ time.

```mermaid
flowchart TD
    A[Start: Read string S of length N] --> B[Scan adjacent characters S_i, S_{i+1}]
    B --> C{Is pair LL or RR?}
    C -- Yes --> D[Output YES]
    C -- No --> E[Continue scan]
    E --> F[End of string reached?]
    F -- No --> B
    F -- Yes --> G[Output NO]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ | Single linear scan of string $S$ per testcase. |
| **Space Complexity** | $O(1)$ | Constant variables. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/professorAndDirections.js
```
