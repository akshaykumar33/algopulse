# 🧠 Competitive Programming Knowledge Base

Welcome to the **Algorithmic Knowledge Base**. This repository section serves as a centralized, living reference of algorithmic paradigms, mathematical proofs, mental models, idiomatic JavaScript (Node.js) implementations, and solved problem catalogs.

Whenever problems are solved across **Codeforces**, **LeetCode**, or **CodeChef**, their underlying concepts, invariants, and takeaways are cataloged into their respective tag guides. When an unfamiliar tag or pattern is encountered, a new topic guide is added to this section.

---

## 🧭 Topic Navigation Matrix

| Tag / Topic | Core Paradigm | Key Recognition Signals | Guide Reference |
|---|---|---|---|
| **Greedy** | Local optimality implies global optimality | "Minimize maximum", sorting by ratio/deadline, exchange arguments | [greedy.md](file:///d:/pro/CP/knowledge/greedy.md) |
| **Math** | Parity, invariants, closed-form series | "Count operations", modular bounds, pigeonhole principle, arithmetic sums | [math.md](file:///d:/pro/CP/knowledge/math.md) |
| **Number Theory** | Divisibility, primes, modular arithmetic | GCD/LCM, prime factors, coprimality, $a^b \pmod m$, modular inverse | [number-theory.md](file:///d:/pro/CP/knowledge/number-theory.md) |
| **Two Pointers** | Monotonic interval contraction / expansion | "Subarray with sum $\le K$", sorted pair sums, palindrome checks | [two-pointers.md](file:///d:/pro/CP/knowledge/two-pointers.md) |
| **Dynamic Programming** | Optimal substructure & overlapping subproblems | "Count ways to reach", min cost with state transitions, subset sum | [dynamic-programming.md](file:///d:/pro/CP/knowledge/dynamic-programming.md) |
| **Strings** | Lexicographical order, character frequencies | Palindromes, anagrams, substring matching, character encoding | [strings.md](file:///d:/pro/CP/knowledge/strings.md) |
| **Binary Search** | Monotonic predicate testing | "Minimize the maximum $X$", monotonic answer spaces, sorted arrays | [binary-search.md](file:///d:/pro/CP/knowledge/binary-search.md) |
| **Bitmasks** | Bitwise manipulation & subsets | Power of two, parity bit counting, XOR basis, $N \le 20$ subset states | [bitmasks.md](file:///d:/pro/CP/knowledge/bitmasks.md) |
| **Constructive Algorithms** | Invariant synthesis & pattern generation | "Construct any valid configuration", matrix tiling, parity balancing | [constructive-algorithms.md](file:///d:/pro/CP/knowledge/constructive-algorithms.md) |
| **Data Structures** | Query optimization & state tracking | Prefix sums, monotonic stacks, frequency maps, heaps, DSU | [data-structures.md](file:///d:/pro/CP/knowledge/data-structures.md) |
| **Trees & Graphs** | Reachability, traversals, connectivity | Connected components, shortest paths in unweighted graphs, DAGs | [trees-and-graphs.md](file:///d:/pro/CP/knowledge/trees-and-graphs.md) |
| **Game Theory** | Impartial games & state classification | Two-player alternating turns, winning ($N$) vs losing ($P$) positions | [game-theory.md](file:///d:/pro/CP/knowledge/game-theory.md) |
| **Sorting** | Total order establishment & compression | Custom multi-key orderings, coordinate compression, inversion parity | [sorting.md](file:///d:/pro/CP/knowledge/sorting.md) |
| **Brute Force & Backtracking** | Exhaustive search with state pruning | Small constraint bounds ($N \le 10$, $N \le 20$), permutation generation | [brute-force.md](file:///d:/pro/CP/knowledge/brute-force.md) |
| **Implementation** | Simulation, grid navigation, edge safety | Matrix coordinates, direction vectors (`dx`/`dy`), strict boundary rules | [implementation.md](file:///d:/pro/CP/knowledge/implementation.md) |

---

## ⚡ Knowledge Base Protocol (Mandatory Workflow)

When solving any competitive programming problem in this repository:

1. **Tag Extraction:** Extract all algorithmic tags associated with the problem (e.g., `greedy`, `math`, `two-pointers`).
2. **Catalog Update:** Open the corresponding `knowledge/<tag>.md` file and append the problem under **Section 6: Solved Problems Catalog & Takeaways** with:
   - Problem name and link.
   - Platform & difficulty rating.
   - Reference solution filename.
   - Core algorithmic insight or mathematical invariant leveraged.
3. **New Pattern Ingestion:** If a problem introduces an unfamiliar pattern, theorem, or tag not currently present:
   - Create a dedicated `knowledge/<new-tag>.md` using the standard Knowledge Base structure.
   - Register the new guide in the table above.
4. **Automated Audit & Sync:**
   ```bash
   # Inspect coverage and verify all tags are mapped
   node src/cli/knowledge
   
   # Synchronize references across all guides
   node src/cli/knowledge --sync
   ```

---

## 🛡️ Universal Node.js Competitive Programming Rules

1. **Numeric Precision:** Standard JavaScript numbers are IEEE-754 double precision floats with exact integer safety up to $2^{53} - 1 \approx 9 \times 10^{15}$ (`Number.MAX_SAFE_INTEGER`). For values exceeding $9 \times 10^{15}$ ($10^{18}$ bounds), switch to `BigInt`.
2. **Lexicographical Sort Trap:** `arr.sort()` in JavaScript sorts alphabetically by default (`[10, 2, 5]` becomes `[10, 2, 5]`). **Always** provide a numeric comparator: `arr.sort((a, b) => a - b)`.
3. **Fast Buffer I/O:** Always read `fs.readFileSync(0, 'utf-8')` once, buffer outputs into an array (`output.push(...)`), and flush using `console.log(output.join('\n'))`.
4. **Call Stack Limit:** V8 call stack limit is $\approx 10,000$ frames. For deep DFS/Tree traversals where $N = 2 \cdot 10^5$, always implement an iterative stack or queue.
