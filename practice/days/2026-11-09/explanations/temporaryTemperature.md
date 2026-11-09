# Temporary Temperature (CodeChef CC-TMPTMP)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-TMPTMP](https://www.codechef.com/problems/TMPTMP)
- **Difficulty / Rating:** 1516
- **Tags:** binary search, greedy, intervals
- **Solution File:** `temporaryTemperature.js`

---

## 2. Core Intuition & Mathematical Rationale
We are given an array $A$ and allowed at most $K$ temperature changes.
If step $i$ is performed at temperature $B_i$, the unsavoriness is $\max_{i=1}^N |A_i - B_i|$.
We want to minimize the unsavoriness.
Let the maximum allowed difference be $M$. Then each $B_i$ must lie in $[A_i - M, A_i + M]$.
To keep the temperature constant across a contiguous segment of steps, the intersection of their intervals $[A_i - M, A_i + M]$ must be non-empty.
We can partition the array into the minimum number of contiguous segments such that within each segment, all intervals intersect.
This can be validated greedily:
Start with $[L, R] = [A_0 - M, A_0 + M]$.
For each subsequent element $A_i$, update $L = \max(L, A_i - M)$ and $R = \min(R, A_i + M)$.
If $L > R$, the intersection is empty, so a temperature change is required; increment changes and reset $[L, R] = [A_i - M, A_i + M]$.
If the required number of changes is $\le K$, then $M$ is feasible.
Since feasibility is monotonic with respect to $M$, we binary search for the minimum $M \in [0, 10^9]$.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N \log(\max A))$ per test case.
- **Space Complexity:** $O(N)$ to store array $A$.
