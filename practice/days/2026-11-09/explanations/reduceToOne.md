# Reduce to One (CodeChef CC-REDONE)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-REDONE](https://www.codechef.com/problems/REDONE)
- **Difficulty / Rating:** 1507
- **Tags:** math, number theory, modular arithmetic
- **Solution File:** `reduceToOne.js`

---

## 2. Core Intuition & Mathematical Rationale
Given the initial set $L = \{1, 2, \dots, N\}$.
At each step, two numbers $X$ and $Y$ are removed and replaced by $X + Y + X \cdot Y$.
Notice that:
$$(X + Y + X \cdot Y) + 1 = (X + 1)(Y + 1)$$
Thus, if we define the invariant value of any element $Z$ as $Z + 1$, combining two numbers multiplies their invariant values!
Starting with elements $1, 2, \dots, N$, the product of all invariants is:
$$\prod_{i=1}^N (i + 1) = (N + 1)!$$
When only one element $Ans$ remains in the list, its invariant is $Ans + 1 = (N + 1)!$.
Therefore, the final answer regardless of the sequence of choices is:
$$Ans = (N + 1)! - 1 \pmod{10^9 + 7}$$

---

## 3. Algorithmic Complexity
- **Precomputation:** $O(N)$ to precalculate factorials up to $N = 1,000,001$.
- **Per Test Case:** $O(1)$ lookup.
- **Space Complexity:** $O(N)$ for the precomputed factorial array.
