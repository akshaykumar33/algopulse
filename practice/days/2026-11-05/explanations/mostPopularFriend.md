# Most Popular Friend (CC-LOKBIL)

## Problem Overview
Given $T$ friend groups (graphs) with $N \le 100$ people. In each group, the $i$-th line gives the space-separated friend list of user $i$. The distance between users is the shortest path length in the friend graph (with self-distance $0$). A friend's notoriety is their average distance to all friends in the group. We must find the friend with minimum notoriety (with ties broken by smallest user ID) and their average distance formatted to 6 decimal places.

## Key Insight & Invariants
- Since $N \le 100$, we can run unweighted Breadth-First Search (BFS) from every node $i \in [1..N]$ to compute shortest path distances to all reachable nodes in $O(N + M)$ time.
- Accumulate the sum of distances $\sum_{j=1}^N \text{dist}[i][j]$.
- Find $i$ minimizing this sum. The average distance is $\frac{\sum \text{dist}[i][j]}{N}$.
- Formatting with `.toFixed(6)` provides the required 6 digits of decimal precision.

## Complexity
- **Time Complexity:** $O(N \cdot (N + M))$ per testcase, running in $< 5$ms for $N \le 100$.
- **Space Complexity:** $O(N + M)$ for adjacency list and BFS queue.
