# Chef Travel Routes (CC-TRAVELER)

## Problem Overview
Chef is planning travel routes in a directed graph of $N \le 50$ cities connected by $M$ directed roads with positive lengths. For each planned route of $K$ cities:
1. Every city name in the route must exist among the given $N$ cities.
2. Chef hates visiting any city more than once: all $K$ cities must be distinct.
3. If $K > 1$, there must exist a valid directed road connecting consecutive cities $C_i \to C_{i+1}$.

If valid, we output the total distance along the route (or 0 if $K=1$). If any condition fails, output `ERROR`.

## Key Insight & Invariants
- Use a `Set` for $O(1)$ city existence lookup.
- Use a `Map` keyed by `C1 + '#' + C2` to store edge weights for directed roads.
- For each query route:
  - Check that all cities exist in the city set.
  - Check that all $K$ cities are mutually distinct via a visited set.
  - If valid so far, traverse consecutive pairs $(C_i, C_{i+1})$: if any edge is missing from the road map, return `ERROR`.
  - Otherwise, accumulate edge lengths and print the total.

## Complexity
- **Time Complexity:** $O(N + M + T \cdot K)$ where $N \le 50, M \le 2500, T \le 50, K \le 50$. Total operations $\approx 5000$, well under 1ms.
- **Space Complexity:** $O(N + M)$ for graph representation and city dictionary.
