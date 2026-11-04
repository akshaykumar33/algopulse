# Approximately II (CodeChef CC-APPROX2)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-APPROX2](https://www.codechef.com/problems/APPROX2)
- **Difficulty / Rating:** 1471
- **Tags:** codechef, brute force, pairs
- **Solution File:** `approximatelyII.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
Given $N \le 1000$ integers, there are $\binom{N}{2} \le 5 \cdot 10^5$ unordered pairs $(i, j)$ with $i < j$.
Evaluating $|a_i + a_j - K|$ across all pairs within an optimized flat nested loop allows computing both the global minimum distance and the multiplicity of pairs matching that minimum in a single pass.

```mermaid
flowchart TD
    A[Start: Read N, K and array a] --> B[Initialize minDiff = Infinity, count = 0]
    B --> C[Loop i from 0 to N-1]
    C --> D[Loop j from i+1 to N-1]
    D --> E[Compute diff = |a_i + a_j - K|]
    E --> F{diff < minDiff?}
    F -- Yes --> G[minDiff = diff, count = 1]
    F -- No --> H{diff == minDiff?}
    H -- Yes --> I[count++]
    H -- No --> J[Continue]
    G --> J
    I --> J
    J --> K[All pairs checked?]
    K -- No --> D
    K -- Yes --> L[Output minDiff and count]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N^2)$ | Exhaustive scan over $\approx N^2 / 2 \le 5 \cdot 10^5$ pairs per testcase. |
| **Space Complexity** | $O(N)$ | Int32Array storing the input numbers. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/approximatelyII.js
```
