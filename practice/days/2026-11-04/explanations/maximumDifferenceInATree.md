# Maximum Difference in a Tree (CodeChef CC-MDIT)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-MDIT](https://www.codechef.com/problems/MDIT)
- **Difficulty / Rating:** 1450
- **Tags:** codechef, trees, bfs, tree dp
- **Solution File:** `maximumDifferenceInATree.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
We must find $\max |W[u] - W[v]|$ across all pairs $(u, v)$ such that $u$ is an ancestor of $v$.
During a top-down tree traversal from the root, for each node $v$, the optimal ancestor value to pair with $v$ is either the minimum ancestor weight $\min_{a \in Anc(v)} W[a]$ or the maximum ancestor weight $\max_{a \in Anc(v)} W[a]$.
By propagating the running minimum and running maximum along tree branches using BFS with typed arrays, each node evaluates the optimal pair difference in $O(1)$ time, yielding an optimal $O(N)$ overall time complexity.

```mermaid
flowchart TD
    A[Start: Build Tree from Parent Array] --> B[Find Root node where P == -1]
    B --> C[BFS from Root tracking minAnc and maxAnc]
    C --> D[For child v, diff = max |W_v - minAnc|, |W_v - maxAnc|]
    D --> E[Update maxDiff = max maxDiff, diff]
    E --> F[Propagate min minAnc, W_v and max maxAnc, W_v]
    F --> G[All nodes visited?]
    G -- No --> C
    G -- Yes --> H[Output maxDiff]
```

---

## 3. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ | Linear forward-star graph construction and single BFS pass. |
| **Space Complexity** | $O(N)$ | Typed arrays for tree edges, node weights, and queue states. |
| **Recursion Depth** | $O(1)$ | Fully iterative BFS avoiding call stack overflow. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/maximumDifferenceInATree.js
```
