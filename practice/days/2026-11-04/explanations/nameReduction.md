# Name Reduction (CodeChef CC-NAME1)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-NAME1](https://www.codechef.com/problems/NAME1)
- **Difficulty / Rating:** 1404
- **Tags:** codechef, strings, hashing, counting
- **Solution File:** `nameReduction.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
The problem asks whether the multiset of letters comprising all $N$ children's names is a sub-multiset of the letters present in the parents' names $A$ and $B$.
A substring of a permutation of a string $X$ is formed if and only if each letter `'a'` through `'z'` appears in $Y$ at most as many times as it appears in $X$:
$$\forall c \in ['a' \dots 'z']: \text{count}_Y(c) \le \text{count}_X(c)$$
We maintain frequency tables of size 26 for parents and children. If every character frequency in the children's pool is bounded by the parents' pool, the answer is `YES`, else `NO`.

```mermaid
flowchart TD
    A[Start: Read parents A, B] --> B[Build letter frequency table for A + B]
    B --> C[Read N children names]
    C --> D[Build letter frequency table for all children]
    D --> E{childFreq[c] <= parentFreq[c] for all 26 letters?}
    E -- Yes --> F[Output YES]
    E -- No --> G[Output NO]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(|A| + |B| + \sum |C_i|)$ | Linear counting pass over all characters per testcase. |
| **Space Complexity** | $O(1)$ | Size 26 Int32Array for frequency bins. |
| **Recursion Depth** | $O(1)$ | Fully iterative execution. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/nameReduction.js
```
