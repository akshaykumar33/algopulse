# Add Two Numbers (Linked List) (CodeChef CC-ADDTWOLL)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-ADDTWOLL](https://www.codechef.com/problems/ADDTWOLL)
- **Difficulty / Rating:** 1150
- **Tags:** linked-list, simulation, big-integer-addition, math
- **Solution File:** `addTwoNumbersLinkedList.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
### Problem Statement Summary
Given two non-negative integers represented as linked lists, where digits are stored in reverse order (least significant digit at the head):
- Compute their sum and return the resulting linked list in reverse order.
- Each node contains a single decimal digit ($0 \le d \le 9$).
- If a carry remains after the most significant digits, append an additional node.

### Key Observations
1. **Direct Column Addition:**
   Because both lists store digits least-significant first, the $k$-th node in each list represents the $10^k$ position.
2. **Carry Propagation:**
   At position $k$:
   $$\text{sum} = \text{carry} + d_1[k] + d_2[k]$$
   $$\text{digit} = \text{sum} \pmod{10}$$
   $$\text{carry} = \lfloor \text{sum} / 10 \rfloor$$
3. **No Explicit Test Case Count $T$:**
   Input format starts directly with $N_1$, followed by $L_1$ digits, then $N_2$, followed by $L_2$ digits. A streaming pointer `while (ptr < input.length)` processes inputs cleanly without crashing.

```mermaid
flowchart TD
    A[Start: Read N1, digits L1, N2, digits L2] --> B[Initialize p1=0, p2=0, carry=0, res=[]]
    B --> C{p1 < N1 OR p2 < N2 OR carry > 0?}
    C -- Yes --> D[sum = carry]
    D --> E[Add L1[p1] if p1 < N1, increment p1]
    E --> F[Add L2[p2] if p2 < N2, increment p2]
    F --> G[res.push sum % 10]
    G --> H[carry = Math.floor sum / 10]
    H --> C
    C -- No --> I[Output res joined by space]
```

---

## 3. Visual Step-by-Step Walkthrough
### Example: $L_1 = [5, 9, 9, 9]$ (9995), $L_2 = [5, 0, 0]$ (5)
1. Position 0:
   - Sum = $0 + 5 + 5 = 10 \implies \text{digit} = 0, \text{carry} = 1$.
   - Result: `[0]`.
2. Position 1:
   - Sum = $1 + 9 + 0 = 10 \implies \text{digit} = 0, \text{carry} = 1$.
   - Result: `[0, 0]`.
3. Position 2:
   - Sum = $1 + 9 + 0 = 10 \implies \text{digit} = 0, \text{carry} = 1$.
   - Result: `[0, 0, 0]`.
4. Position 3:
   - Sum = $1 + 9 + 0 = 10 \implies \text{digit} = 0, \text{carry} = 1$.
   - Result: `[0, 0, 0, 0]`.
5. Remaining carry:
   - Sum = $1 \implies \text{digit} = 1, \text{carry} = 0$.
   - Result: `[0, 0, 0, 0, 1]`.

Output: `0 0 0 0 1` (representing $10000$ in reverse order).

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(\max(N_1, N_2))$ | Single simultaneous linear scan of both lists. |
| **Space Complexity** | $O(\max(N_1, N_2))$ | Array to store result digits. |
| **Memory Limit** | 1.5 GB | Far within limits ($N_1, N_2 \le 100$). |

---

## 5. Edge Cases & Boundary Conditions
- **Different lengths:** One list is much longer than the other (e.g. $[9, 9]$ and $[1]$). Handled by `p1 < N1` and `p2 < N2` checks.
- **Carry at the end:** $99 + 1 = 100$ produces an extra node at the end. Handled by `carry > 0` condition in loop.
- **Leading/Trailing zeros:** Problem statement notes node values can be 0.
