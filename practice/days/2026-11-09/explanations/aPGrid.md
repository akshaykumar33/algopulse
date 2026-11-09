# AP Grid (CodeChef CC-APGRID)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-APGRID](https://www.codechef.com/problems/APGRID)
- **Difficulty / Rating:** 1562
- **Tags:** constructive algorithms, math, arithmetic progression
- **Solution File:** `aPGrid.js`

---

## 2. Core Intuition & Mathematical Rationale
We must construct an $N \times M$ matrix of positive integers such that:
- Each row $i$ is an AP with common difference $d_i > 0$.
- Each column $j$ is an AP with common difference $c_j > 0$.
- All $N$ row common differences and all $M$ column common differences are pairwise distinct.
- The maximum element of the matrix is minimized.

Notice that if every entry is defined multiplicatively as:
$$A[i][j] = (2i + 1) \cdot (j + 1) \quad (0 \le i < N, 0 \le j < M)$$
Then:
- Row $i$ has difference $A[i][j+1] - A[i][j] = 2i + 1$. Thus, the row differences are all the odd integers $\{1, 3, 5, \dots, 2N - 1\}$.
- Column $j$ has difference $A[i+1][j] - A[i][j] = 2(j + 1)$. Thus, the column differences are all the even integers $\{2, 4, 6, \dots, 2M\}$.
Because odd numbers and even numbers are disjoint, no row difference can ever equal any column difference! Furthermore, within rows and within columns, differences are strictly increasing, so all $N + M$ differences are pairwise distinct.
All entries are strictly positive integers.
When $N \le M$, this yields maximum element $(2N - 1) \cdot M$.
When $N > M$, we swap the parity roles to maintain the minimal maximum element:
$$A[i][j] = (i + 1) \cdot (2j + 1)$$
yielding row differences $2(i + 1)$ (even) and column differences $2j + 1$ (odd), with maximum element $N \cdot (2M - 1)$.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N \cdot M)$ to generate the matrix entries.
- **Space Complexity:** $O(M)$ buffer for each printed line.
