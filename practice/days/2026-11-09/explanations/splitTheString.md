# Split The String (CodeChef CC-SPLSTR)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-SPLSTR](https://www.codechef.com/problems/SPLSTR)
- **Difficulty / Rating:** 1567
- **Tags:** greedy, math, strings
- **Solution File:** `splitTheString.js`

---

## 2. Core Intuition & Mathematical Rationale
The badness of a binary string is $|c_0 - c_1|$, the absolute difference between the count of zeros and ones.
We partition string $S$ into $K$ disjoint subsequences $S_1, \dots, S_K$ to minimize $\max_i |c_0(S_i) - c_1(S_i)|$.
Let $S$ contain $Z$ zeros and $O$ ones.
Total net difference is $Z - O = \sum_{i=1}^K (Z_i - O_i)$.
Without loss of generality, assume $Z \ge O$.
To minimize the maximum badness, it is optimal to ensure $Z_i \ge O_i$ for all $i$ (since having any $Z_i < O_i$ unnecessarily inflates the positive differences in the remaining groups).
Thus, the sum of badnesses is $\sum_{i=1}^K (Z_i - O_i) = Z - O = |Z - O|$.
The minimum possible maximum term among $K$ non-negative integers summing to $|Z - O|$ is given by ceiling division:
$$\lceil \frac{|Z - O|}{K} \rceil = \lfloor \frac{|Z - O| + K - 1}{K} \rfloor$$

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ to count zeros and ones in string $S$.
- **Space Complexity:** $O(1)$ auxiliary space.
