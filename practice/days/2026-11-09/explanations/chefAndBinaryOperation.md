# Chef And Binary Operation (CodeChef CC-BINOP)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-BINOP](https://www.codechef.com/problems/BINOP)
- **Difficulty / Rating:** 1544
- **Tags:** bitwise, greedy, strings
- **Solution File:** `chefAndBinaryOperation.js`

---

## 2. Core Intuition & Mathematical Rationale
Three operations can be performed on pairs of indices $(i, j)$:
1. **AND:** Sets both $A_i, A_j$ to $A_i \ \& \ A_j$. Can turn a `'1'` into a `'0'` if paired with an existing `'0'`.
2. **OR:** Sets both $A_i, A_j$ to $A_i \mid A_j$. Can turn a `'0'` into a `'1'` if paired with an existing `'1'`.
3. **XOR:** Sets both $A_i, A_j$ to $A_i \oplus A_j$ followed by $A_i = (A_i \oplus A_j) \oplus A_i = A_j$ and $A_j = (A_i \oplus A_j) \oplus A_j = A_i$.
   Thus, XOR is equivalent to swapping $A_i$ and $A_j$!

Feasibility:
- If $A$ contains only `'0'`s, no `'1'` can ever be created. Since $A \ne B$, it is impossible.
- If $A$ contains only `'1'`s, no `'0'` can ever be created. Since $A \ne B$, it is impossible.
- In either case, output `"Unlucky Chef"`.

Optimal Operation Count:
Count mismatches:
- $c_{01}$: count of positions where $A[i] = '0'$ and $B[i] = '1'$.
- $c_{10}$: count of positions where $A[i] = '1'$ and $B[i] = '0'$.
We can pair up one $(0 \to 1)$ mismatch with one $(1 \to 0)$ mismatch and fix both simultaneously using 1 XOR swap!
This uses $\min(c_{01}, c_{10})$ swap operations.
The remaining $|c_{01} - c_{10}|$ positions each require 1 operation (either OR to set to 1, or AND to set to 0).
Total minimum operations:
$$\min(c_{01}, c_{10}) + |c_{01} - c_{10}| = \max(c_{01}, c_{10})$$

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(|A|)$ linear scan over strings $A$ and $B$.
- **Space Complexity:** $O(1)$ auxiliary space.
