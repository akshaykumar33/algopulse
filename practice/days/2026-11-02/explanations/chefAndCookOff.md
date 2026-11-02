# Chef and Cook-Off (CodeChef CC-CCOOK)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-CCOOK](https://www.codechef.com/problems/CCOOK)
- **Difficulty / Rating:** 961
- **Tags:** implementation, strings
- **Solution File:** `chefAndCookOff.js`

---

## 2. Core Intuition & Mathematical Rationale
For each contestant, 5 binary outcomes are provided representing problems solved ($1$) or unsolved ($0$).
We compute the sum $S = \sum_{j=1}^5 A_j$.
The category mapping is direct:
- $S = 0 \implies$ `Beginner`
- $S = 1 \implies$ `Junior Developer`
- $S = 2 \implies$ `Middle Developer`
- $S = 3 \implies$ `Senior Developer`
- $S = 4 \implies$ `Hacker`
- $S = 5 \implies$ `Jeff Dean`

---

## 3. Complexity
- **Time Complexity:** $O(N)$ for $N$ contestants (5 checks each).
- **Space Complexity:** $O(1)$ auxiliary.

