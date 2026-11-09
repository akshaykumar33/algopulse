# Chef Teams (CodeChef CC-CTEAMS)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-CTEAMS](https://www.codechef.com/problems/CTEAMS)
- **Difficulty / Rating:** 1577
- **Tags:** data structures, heap, priority queue, running median
- **Solution File:** `chefTeams.js`

---

## 2. Core Intuition & Mathematical Rationale
Chefs arrive one by one. After the $k$-th chef arrives, they are partitioned by age:
- The young team gets the $\lceil k / 2 \rceil = \lfloor (k + 1) / 2 \rfloor$ youngest chefs.
- The old team gets the $\lfloor k / 2 \rfloor$ oldest chefs.
We need to report $| \sum_{i \in \text{young}} R_i - \sum_{j \in \text{old}} R_j |$ dynamically after each chef arrives.

This is the classic dynamic median maintenance problem, solvable via two heaps:
1. `young`: A Max-Heap by age, storing chefs in the young team. Target size is $\lfloor (k + 1) / 2 \rfloor$.
2. `old`: A Min-Heap by age, storing chefs in the old team. Target size is $\lfloor k / 2 \rfloor$.
Along with the heaps, we maintain `youngSum` and `oldSum`.
For each new chef $(A, R)$:
- If $A \le \text{max age in young}$ (or young is empty), insert into `young` and add $R$ to `youngSum`.
- Else, insert into `old` and add $R$ to `oldSum`.
- Rebalance the heaps so `young.size()` equals $\lfloor (k + 1) / 2 \rfloor$.
- Append $|\text{youngSum} - \text{oldSum}|$ to the output buffer.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N \log N)$ total time for $N$ chef arrivals.
- **Space Complexity:** $O(N)$ for the two binary heaps.
