# The Old Saint And Three Questions (CodeChef CC-THREEQ)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-THREEQ](https://www.codechef.com/problems/THREEQ)
- **Difficulty / Rating:** 954
- **Tags:** implementation, math
- **Solution File:** `theOldSaintAndThreeQuestions.js`

---

## 2. Core Intuition & Mathematical Rationale
The saint only remembers the multiset of correct answers: how many were `1` (Yes) and how many were `0` (No).
Since there are exactly 3 questions:
- Count of `1`s in correct answers: $S_A = A_1 + A_2 + A_3$.
- Count of `1`s in hero's answers: $S_B = B_1 + B_2 + B_3$.

Because the total count of answers is fixed at 3, if $S_A = S_B$, the number of zeros is $(3 - S_A) = (3 - S_B)$, meaning both the counts of `1`s and `0`s match identically.
The saint cannot distinguish the two sets if and only if $S_A = S_B$. If true, output `Pass`, otherwise `Fail`.

---

## 3. Complexity
- **Time Complexity:** $O(1)$ per testcase, total $O(T)$.
- **Space Complexity:** $O(1)$ auxiliary.

