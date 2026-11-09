# Dish Of Life (CodeChef CC-DISHLIFE)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-DISHLIFE](https://www.codechef.com/problems/DISHLIFE)
- **Difficulty / Rating:** 1543
- **Tags:** greedy, frequency counting, sets
- **Solution File:** `dishOfLife.js`

---

## 2. Core Intuition & Mathematical Rationale
There are $N$ islands and $K$ required ingredients.
1. If any ingredient in $\{1, \dots, K\}$ does not appear on any island (its overall frequency is 0), Chef cannot make the dish: output `"sad"`.
2. Otherwise, all $K$ ingredients can be collected. An island $i$ can be skipped if and only if removing island $i$ leaves all $K$ ingredients available.
An ingredient is critical if its total frequency across all islands is exactly 1.
If an island contains at least one critical ingredient, removing that island would lose that ingredient, so it cannot be skipped.
Conversely, if an island contains NO critical ingredients (all its ingredients have global frequency $\ge 2$), then removing that island leaves every ingredient present elsewhere!
Thus, if there exists at least one island with no critical ingredients, output `"some"`; otherwise, every island is indispensable, so output `"all"`.

---

## 3. Algorithmic Complexity
- **Time Complexity:** $O(\sum P_i + K)$ per testcase.
- **Space Complexity:** $O(K + \sum P_i)$ to store frequency counts and island ingredient lists.
