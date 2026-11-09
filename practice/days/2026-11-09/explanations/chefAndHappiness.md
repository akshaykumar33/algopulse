# Chef and Happiness (CodeChef CC-CHHAPPY)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-CHHAPPY](https://www.codechef.com/problems/CHHAPPY)
- **Difficulty / Rating:** 1594
- **Tags:** implementation, arrays, functional graph
- **Solution File:** `chefAndHappiness.js`

---

## 2. Core Intuition & Mathematical Rationale
We are given an array $A_1, \dots, A_N$ (1-indexed) and want to find two indices $i \ne j$ such that:
$A_i \ne A_j \quad \text{and} \quad A_{A_i} = A_{A_j}$
Let $u = A_i$ and $v = A_j$.
The condition is equivalent to:
1. $u \ne v$.
2. $A_u = A_v$.
3. Both $u$ and $v$ must appear as values in array $A$ (so that there exist indices $i, j$ with $A_i = u$ and $A_j = v$).
Let $\text{has}[x]$ be a boolean array indicating whether value $x$ appears in $A$.
We only need to check if there exist two distinct values $u, v \in \{1, \dots, N\}$ such that $\text{has}[u] = \text{true}$, $\text{has}[v] = \text{true}$, and $A_u = A_v$.
We iterate through all $x \in \{1, \dots, N\}$ where $\text{has}[x] = \text{true}$, mapping each to target value $A_x$.
If any target value is mapped to more than once, we have found a valid pair $(u, v)$: output `"Truly Happy"`.
If every target value appears at most once, output `"Poor Chef"`.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ single pass over array $A$.
- **Space Complexity:** $O(N)$ for boolean lookup arrays `has` and `seen`.
