# Trees & Graphs — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
Graphs model pairwise relationships between objects (vertices connected by edges). Trees are connected acyclic graphs with $N$ vertices and $N - 1$ edges. In competitive programming, key graph algorithms include Breadth-First Search (BFS), Depth-First Search (DFS), Topological Sort, Shortest Paths (Dijkstra), and Minimum Spanning Trees (Kruskal/Prim).

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find shortest path in an unweighted graph or grid":** $\implies$ BFS with a queue.
- **"Count connected components or check bipartite coloring":** $\implies$ BFS or DFS.
- **"Tree with $N$ nodes and $N-1$ edges":** $\implies$ Tree DP, LCA, or Euler Tour.
- **"Course schedule / dependency ordering":** $\implies$ Topological Sort (Kahn's in-degree BFS).
- **"Shortest path with non-negative edge weights":** $\implies$ Dijkstra's Algorithm with Min-Heap.

---

## 3. Key Mathematical Theorems & Graph Invariants
1. **Tree Properties:**
   - Any connected graph with $V$ vertices and $E = V - 1$ edges is a tree.
   - Exactly one unique simple path exists between any two vertices in a tree.
2. **Handshaking Lemma:**
   $$\sum_{v \in V} \deg(v) = 2 |E|$$
3. **Bipartite Graph Theorem:**
   A graph is bipartite (2-colorable) if and only if it contains **no odd-length cycles**.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Fast Adjacency List Representation
```javascript
// Build adjacency list for undirected graph
function buildGraph(n, edges) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
}
```

### Pattern 2: Iterative BFS (Avoids Call Stack Limits)
```javascript
function bfs(startNode, adj, n) {
  const dist = new Int32Array(n + 1).fill(-1);
  const queue = new Int32Array(n + 1); // Fast flat array ring/pointer queue
  let head = 0, tail = 0;

  dist[startNode] = 0;
  queue[tail++] = startNode;

  while (head < tail) {
    const u = queue[head++];
    for (const v of adj[u]) {
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        queue[tail++] = v;
      }
    }
  }
  return dist;
}
```

### Pattern 3: Explicit Stack DFS (Overcoming Call Stack Limit)
```javascript
// DFS using an explicit array stack to safely handle N = 200,000
function dfsIterative(start, adj, n) {
  const visited = new Uint8Array(n + 1);
  const stack = [start];
  visited[start] = 1;

  while (stack.length > 0) {
    const u = stack.pop();
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        stack.push(v);
      }
    }
  }
}
```

### Critical Traps:
- **Node.js Recursion Depth Limit (~10,000 frames):** A recursive `function dfs(node)` will throw `RangeError: Maximum call stack size exceeded` on linear trees (chains) when $N \ge 10^4$. **Always use iterative DFS/BFS with an array for large graphs.**
- **`Array.prototype.shift()` Performance Trap:** `queue.shift()` is $O(N)$ because it re-indexes the entire array. A loop using `shift()` inside BFS takes $O(N^2)$ time! Use a pointer (`let head = 0; const u = queue[head++];`) or a flat `Int32Array`.

---

## 5. Sub-Patterns & Archetypes
1. **Grid BFS:** Traversing 2D maze with 4-directional steps: `dr = [-1, 1, 0, 0]`, `dc = [0, 0, -1, 1]`.
2. **Topological Sort:** Queueing vertices with in-degree 0 and decrementing neighbors.
3. **Tree Center / Diameter:** Two BFS passes: BFS from arbitrary node $A$ finds furthest node $B$; BFS from $B$ finds diameter.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) | `LeetCode` | `Easy` | `symmetricTree.js` | Mirror equality check: left child of Left must equal right child of Right. |
| [Search in a BST](https://leetcode.com/problems/search-in-a-binary-search-tree/) | `LeetCode` | `Easy` | `searchInABinarySearchTree.js` | Binary Search Tree property: compare value and traverse strictly left or right in $O(H)$ time. |
| [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | `LeetCode` | `Easy` | `maximumDepthOfBinaryTree.js` | Tree recursion or level-order BFS returning max level depth. |
| [Sum in Binary Tree](https://codeforces.com/problemset/problem/1843/C) | `Codeforces` | `800` | `sumInBinaryTree.js` | Key algorithmic application from Day 2026-10-01. |
| [Make it Divisible by 25](https://codeforces.com/problemset/problem/1593/B) | `Codeforces` | `900` | `makeItDivisibleBy25.js` | Key algorithmic application from Day 2026-10-01. |
| [Gold Rush](https://codeforces.com/problemset/problem/1829/D) | `Codeforces` | `1000` | `goldRush.js` | Key algorithmic application from Day 2026-10-02. |
| [Distance between two nodes](https://www.codechef.com/problems/DIST2NODES) | `CodeChef` | `Easy` | `distanceBetweenTwoNodes.js` | Single-query shortest distance on a tree via iterative BFS / shortest path traversal. |
| [LCA of two nodes](https://www.codechef.com/problems/LCA2NODES) | `CodeChef` | `Easy` | `lcaOfTwoNodes.js` | Root tree at node 1 via BFS, then equalize depths and lift node pointers to find Lowest Common Ancestor. |
| [Party](https://codeforces.com/problemset/problem/115/A) | `Codeforces` | `900` | `party.js` | Key algorithmic application from Day 2026-10-06. |
| [Vicious Labyrinth](https://codeforces.com/problemset/problem/2078/B) | `Codeforces` | `1100` | `viciousLabyrinth.js` | Key algorithmic application from Day 2026-10-17. |
| [BerSU Ball](https://codeforces.com/problemset/problem/489/B) | `Codeforces` | `1200` | `berSUBall.js` | Key algorithmic application from Day 2026-10-17. |
| [Yet Another Card Deck](https://codeforces.com/problemset/problem/1511/C) | `Codeforces` | `1100` | `yetAnotherCardDeck.js` | Key algorithmic application from Day 2026-10-22. |
| [Christmas Spruce](https://codeforces.com/problemset/problem/913/B) | `Codeforces` | `1200` | `christmasSpruce.js` | Key algorithmic application from Day 2026-10-22. |
| [Fall Down](https://codeforces.com/problemset/problem/1669/G) | `Codeforces` | `1200` | `fallDown.js` | Key algorithmic application from Day 2026-10-23. |
| [Permutation Transformation](https://codeforces.com/problemset/problem/1490/D) | `Codeforces` | `1200` | `permutationTransformation.js` | Key algorithmic application from Day 2026-10-23. |
| [Forever Winter](https://codeforces.com/problemset/problem/1829/F) | `Codeforces` | `1300` | `foreverWinter.js` | Key algorithmic application from Day 2026-10-23. |
| [Inversion Graph](https://codeforces.com/problemset/problem/1638/C) | `Codeforces` | `1300` | `inversionGraph.js` | Key algorithmic application from Day 2026-10-24. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Unvisited Array Re-initialization:** In multi-test case problems, avoid `new Array(N)` per testcase if $\sum N$ is large; clear only visited elements or use testcase ID tracking.
