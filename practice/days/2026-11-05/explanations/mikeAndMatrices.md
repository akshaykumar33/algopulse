# Mike and Matrices (CC-MIKE1)

## Problem Overview
Given an $N \times M$ matrix $A$ of non-negative integers and $L$ coordinate pairs $(i_k, j_k)$. Mike forgot whether $A_{i, j}$ represents row $i$, column $j$ or row $j$, column $i$. We must compute:
- $E_1 = \sum_{k=1}^L A[i_k][j_k]$ (or $-1$ if any coordinate is out of bounds $1 \le i_k \le N, 1 \le j_k \le M$)
- $E_2 = \sum_{k=1}^L A[j_k][i_k]$ (or $-1$ if any coordinate is out of bounds $1 \le j_k \le N, 1 \le i_k \le M$)

The task is to find $\max(E_1, E_2)$.

## Key Insight & Invariants
- Direct $O(L)$ scan over all queries for both interpretations.
- Maintain independent boolean flags `ok1` and `ok2`. If either coordinate pair in a path exceeds matrix boundaries, flag it as invalid ($-1$).
- Accumulate valid entries into 64-bit numbers (max possible sum $\le 250,000 \times 10^9 = 2.5 \times 10^{14} < 2^{53}-1$).

## Complexity
- **Time Complexity:** $O(N \cdot M + L)$ — reading matrix $N \times M$ and scanning $L$ query pairs.
- **Space Complexity:** $O(N \cdot M)$ to store the matrix.
