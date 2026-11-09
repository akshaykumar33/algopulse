# Minimum Distinct (CodeChef CC-MINDIS6)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-MINDIS6](https://www.codechef.com/problems/MINDIS6)
- **Difficulty / Rating:** 1586
- **Tags:** greedy, sorting, frequency map
- **Solution File:** `minimumDistinct.js`

---

## 2. Core Intuition & Mathematical Rationale
In one operation, we can pick $1 \le i < j \le N$ and set $A_j = A_i$.
Because $i < j$, the first element $A_1$ can never be overwritten by any operation. Thus, $A_1$ must always remain in the final array.
For any value $x \ne A_1$, we can completely eliminate $x$ by choosing $i = 1$ and overwriting every occurrence of $x$ using $A_1$.
To eliminate value $x$ entirely from the array, exactly $\text{freq}[x]$ operations are needed.
To minimize the count of distinct elements within $K$ operations, it is optimal to greedily eliminate values with the smallest frequencies first.
We count frequencies of all distinct elements, collect the frequencies of all elements $x \ne A_1$, sort them in ascending order, and greedily subtract from $K$ while $K \ge \text{freq}[x]$, decrementing the distinct count by 1 each time.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N \log N)$ to sort distinct frequencies.
- **Space Complexity:** $O(N)$ for the frequency map and list.
