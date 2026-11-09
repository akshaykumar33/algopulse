# Fast Food (CodeChef CC-FASTFOOD)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-FASTFOOD](https://www.codechef.com/problems/FASTFOOD)
- **Difficulty / Rating:** 1530
- **Tags:** prefix sums, greedy, dynamic programming
- **Solution File:** `fastFood.js`

---

## 2. Core Intuition & Mathematical Rationale
Chef operates his shop in Chefland on days $1 \dots k$, earning $\sum_{i=1}^k A_i$, and in Chefabad on days $k+1 \dots N$, earning $\sum_{i=k+1}^N B_i$, for some choice of transition day $k \in \{0, 1, \dots, N\}$.
Once moved, he cannot return to Chefland.
We want to maximize:
$$P(k) = \sum_{i=1}^k A_i + \sum_{i=k+1}^N B_i$$
Notice that:
- $P(0) = \sum_{i=1}^N B_i$
- $P(k) = P(k-1) + A_k - B_k$
By initializing $P(0) = \sum_{i=1}^N B_i$ and iterating $k$ from $1$ to $N$, we can update the profit in $O(1)$ per step and maintain the global maximum.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ single pass per test case.
- **Space Complexity:** $O(1)$ auxiliary space.
