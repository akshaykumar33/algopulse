# Two Pointers & Sliding Window — Algorithmic Patterns & Knowledge Base

## 1. Core Principles & Mental Model
The Two Pointers technique leverages monotonic properties of intervals or sequences to reduce $O(N^2)$ brute-force searches across pairs or subarrays down to $O(N)$ linear time. Instead of nested loops, two index pointers navigate the data structure, advancing in a single direction without resetting.

---

## 2. Recognition Signals ("When you see X, think Y")
- **"Find a contiguous subarray with sum / condition $\le K$":** $\implies$ Dynamic sliding window $[L, R]$.
- **"Find two numbers in a sorted array that sum to $Target$":** $\implies$ Inward-facing pointers $(L = 0, R = N-1)$.
- **"Remove elements from either end (deque) to maximize score":** $\implies$ Two pointers tracking left and right boundaries.
- **"Check if string is a palindrome":** $\implies$ Inward-facing pointers comparing $S[L]$ and $S[R]$.
- **"Subarray with at most $K$ distinct elements":** $\implies$ Sliding window with frequency map.

---

## 3. Key Mathematical Theorems & Invariants
1. **Window Monotonicity Invariant:**
   If a subarray $[L, R]$ violates a monotonic constraint (e.g. sum $> K$ for positive integers), expanding $R$ further cannot fix it. Incrementing $L$ is strictly required.
2. **Amortized Complexity Proof:**
   Each pointer $L$ and $R$ starts at $0$ and increments at most $N$ times. Total pointer operations: at most $2N \implies O(N)$ time complexity.

---

## 4. Node.js / JavaScript Implementation Patterns & Traps

### Pattern 1: Inward-Facing Two Pointers (Game / Greedy Selection)
```javascript
// Example: Sereja and Dima (Codeforces 381A)
let left = 0;
let right = arr.length - 1;
let turn = 0;
let scoreA = 0, scoreB = 0;

while (left <= right) {
  let chosen;
  if (arr[left] >= arr[right]) {
    chosen = arr[left++];
  } else {
    chosen = arr[right--];
  }
  if (turn % 2 === 0) scoreA += chosen;
  else scoreB += chosen;
  turn++;
}
```

### Pattern 2: Dynamic Sliding Window (Variable Size)
```javascript
let left = 0;
let currentSum = 0;
let maxLen = 0;

for (let right = 0; right < arr.length; right++) {
  currentSum += arr[right];
  while (currentSum > targetSum && left <= right) {
    currentSum -= arr[left++];
  }
  maxLen = Math.max(maxLen, right - left + 1);
}
```

### Critical Traps:
- **Negative Numbers in Sliding Window:** Standard sliding window *only* works if array values are non-negative. If elements can be negative, the sum is no longer monotonic with window expansion! Use a Prefix Sum + Hash Map instead.
- **Off-By-One Length:** Window length between indices $L$ and $R$ inclusive is always `R - L + 1`.

---

## 5. Sub-Patterns & Archetypes
1. **Opposing Ends:** Moving toward each other ($L \to \dots \leftarrow R$).
2. **Fast & Slow / Same Direction:** Sliding window expanding $R$ and contracting $L$.
3. **Merging Two Sorted Arrays:** Two pointers advancing through two independent arrays.

---

## 6. Solved Problems Catalog & Takeaways

| Problem | Platform | Rating | Solution File | Core Insight / Takeaway |
|---|---|---|---|---|
| [Sereja and Dima](https://codeforces.com/problemset/problem/381/A) | `Codeforces` | `800` | `serejaAndDima.js` | Opposing two pointers taking $\max(A[L], A[R])$ at each turn until pointers cross. |
| [Favorite Sequence](https://codeforces.com/problemset/problem/1462/A) | `Codeforces` | `800` | `favoriteSequence.js` | Key algorithmic application from Day 2026-09-30. |
| [Game of Mathletes](https://codeforces.com/problemset/problem/2060/C) | `Codeforces` | `900` | `gameOfMathletes.js` | Key algorithmic application from Day 2026-10-08. |
| [Black and White Stripe](https://codeforces.com/problemset/problem/1690/D) | `Codeforces` | `1000` | `blackAndWhiteStripe.js` | Key algorithmic application from Day 2026-10-10. |

---

## 7. Common Pitfalls & Anti-Patterns
- **Array Slicing Inside Window:** Never do `arr.slice(left, right + 1)` inside the loop — slicing is $O(N)$, which degrades your $O(N)$ algorithm to $O(N^2)$. Track sums and frequencies incrementally.
