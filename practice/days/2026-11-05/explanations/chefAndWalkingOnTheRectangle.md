# Chef and Walking on the Rectangle (CC-CHRECT)

## Problem Overview
Chef moves from $(1, 1)$ to $(N, M)$ on an $N \times M$ grid using only Right and Down moves, exactly $K$ times. On each journey, he places a stone on all cells visited except the start $(1, 1)$ and destination $(N, M)$. We want to minimize the maximum number of stones in any intermediate cell.

## Key Insight & Invariants
- If the grid has dimensions $1 \times 1, 1 \times 2,$ or $2 \times 1$, there are no intermediate cells at all, so the answer is $0$.
- If $N = 1$ and $M > 2$ (or $M = 1$ and $N > 2$), there is strictly one path through the grid, which visits all intermediate cells. Every single journey of the $K$ journeys must pass through these cells, so the answer is $K$.
- For any $N \ge 2$ and $M \ge 2$:
  - Every path must begin by stepping on either $(1, 2)$ or $(2, 1)$.
  - By the Pigeonhole Principle, at least one of these two cells will be visited $\lceil K / 2 \rceil$ times.
  - Furthermore, two completely node-disjoint paths exist (one hugging the top-right border, one hugging the bottom-left border).
  - Distributing the $K$ paths equally across these two disjoint routes ensures no intermediate cell is visited more than $\lceil K / 2 \rceil$ times.
  - Thus, the exact answer is $\lfloor (K + 1) / 2 \rfloor$.

## Complexity
- **Time Complexity:** $O(1)$ per testcase.
- **Space Complexity:** $O(1)$.
