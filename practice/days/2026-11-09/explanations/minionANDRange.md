# Minion AND Range (CodeChef CC-MINIAND)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-MINIAND](https://www.codechef.com/problems/MINIAND)
- **Difficulty / Rating:** 1567
- **Tags:** bitwise, prefix sums, parity
- **Solution File:** `minionANDRange.js`

---

## 2. Core Intuition & Mathematical Rationale
In each query $(L, R)$, we need to determine whether the bitwise AND of $A[L \dots R]$ is EVEN or ODD.
A number is odd if and only if its least significant bit (bit 0) is 1.
The bitwise AND of a set of numbers has bit 0 equal to 1 if and only if every number in the set has bit 0 equal to 1 (i.e. all numbers are odd).
If there is at least one even number in $A[L \dots R]$, its bit 0 is 0, which forces bit 0 of the bitwise AND to be 0 (even).
Therefore:
- If range $[L, R]$ contains at least one even integer: the answer is `"EVEN"`.
- If all elements in range $[L, R]$ are odd: the answer is `"ODD"`.
We maintain a prefix sum array of the counts of even integers in $A$. For each query $[L, R]$, the count of even integers is $\text{pref}[R] - \text{pref}[L - 1]$, answering each query in $O(1)$.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(N)$ preprocessing, $O(1)$ per query. Total $O(N + Q)$ per testcase.
- **Space Complexity:** $O(N)$ for prefix count array.
