# Sum of Nodes with Even-Valued Grandparent (LeetCode LC-1315)

## 1. Problem Overview
- **Platform:** LeetCode
- **Problem ID:** [LC-1315](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/)
- **Difficulty / Rating:** Medium
- **Algorithmic Paradigm:** `dp`
- **Tags:** algorithms
- **Solution File:** `solutions/sumOfNodesWithEvenValuedGrandparent.js`
- **Starter Template:** `templates/leetcode.js`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Mathematical Invariant:** Identify the quantity conserved or strictly monotonic across operations.
2. **Strategy (dp):** Evaluate how the algorithm guarantees optimality without exploring the full exponential search space.
3. **Optimality Trade-off:** Naive brute force would exceed constraints; the dp approach reduces complexity to feasible bounds.

```mermaid
flowchart TD
    Base["Initialize Base Cases: dp[0] or memo cache"] --> Sub["Iterate Over Subproblems i = 1..N"]
    Sub --> Transitions["Evaluate Transitions: dp[i] = optimal(dp[prev] + cost)"]
    Transitions --> StateUpdate["Update State Table / Rolling Buffers"]
    StateUpdate --> BoundCheck{"Subproblems Completed?"}
    BoundCheck -- No --> Sub
    BoundCheck -- Yes --> Result["Extract Optimal Value from dp[Target]"]
```

---

## 3. Visual Step-by-Step Walkthrough
### State Progression Matrix
Tracing state transitions on a representative sample input:

```mermaid
sequenceDiagram
    participant In as Input Data
    participant Engine as Algorithmic Engine (LeetCode)
    participant State as State Tracker / Invariant
    participant Out as Output Buffer

    In->>Engine: Stream Problem Instance
    Engine->>State: Initialize Boundary Pointers & State
    loop Processing Steps
        Engine->>State: Evaluate Feasibility & Optimal Transition
        State-->>Engine: Updated Invariant / Bound
    end
    Engine->>Out: Append Computed Optimal Result
```

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ or $O(\log N)$ | Paradigm (dp) processes inputs within standard CP time limits ($< 1.0$s). |
| **Space Complexity** | $O(1)$ or $O(N)$ auxiliary | Memory footprint fits within typical 256MB/512MB limits. |
| **Recursion Depth** | $O(1)$ | Iterative loop avoids Node.js call stack limit (~10,000 frames). |

---

## 5. Edge Cases & Boundary Conditions
- **Minimum Bounds:** $N = 1$, minimal values, single-element configurations.
- **Maximum Bounds:** Extreme input bounds ($10^9$ or $\sum N = 2\cdot 10^5$).
- **Numeric Precision:** Plain JavaScript numbers are safe integers up to $2^{53} - 1 \approx 9 \times 10^{15}$.
- **Alternating / Degenerate:** Identical values, alternating parity, sorted vs reverse-sorted arrays.

---

## 6. Idiomatic Implementation
```javascript
// Reference: solutions/sumOfNodesWithEvenValuedGrandparent.js
```
