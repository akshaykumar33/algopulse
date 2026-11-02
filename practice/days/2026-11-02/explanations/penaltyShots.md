# Penalty Shots (CodeChef CC-PENALTY)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-PENALTY](https://www.codechef.com/problems/PENALTY)
- **Difficulty / Rating:** 925
- **Tags:** math, implementation
- **Solution File:** `penaltyShots.js`

---

## 2. Core Intuition & Mathematical Rationale
In soccer penalty shootouts, 10 shots are taken alternately:
- Odd-indexed shots (1, 3, 5, 7, 9 in 1-based indexing, or 0, 2, 4, 6, 8 in 0-based indexing) are taken by Team 1.
- Even-indexed shots (2, 4, 6, 8, 10 in 1-based indexing, or 1, 3, 5, 7, 9 in 0-based indexing) are taken by Team 2.

We maintain two counters $T_1$ and $T_2$ for goals scored by Team 1 and Team 2 respectively. After processing all 10 shots:
- If $T_1 > T_2$, Team 1 wins: output `1`.
- If $T_2 > T_1$, Team 2 wins: output `2`.
- If $T_1 = T_2$, draw: output `0`.

---

## 3. Complexity
- **Time Complexity:** $O(1)$ per testcase (fixed 10 shots), total $O(T)$ for $T$ testcases.
- **Space Complexity:** $O(1)$ auxiliary space.

