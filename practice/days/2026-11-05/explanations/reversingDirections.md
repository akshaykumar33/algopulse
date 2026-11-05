# Reversing directions (CodeChef CC-DIRECTI)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-DIRECTI](https://www.codechef.com/problems/DIRECTI)
- **Difficulty / Rating:** 1426
- **Tags:** codechef
- **Solution File:** `reversingDirections.js`
- **Starter Template:** `templates/codechef.js`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Mathematical Invariant:** Reversing a route means traversing road segments in reverse order with complementary turns.
2. **Algorithmic Strategy:** Invert turn directions: 'Left' becomes 'Right', 'Right' becomes 'Left'. The first step always begins with 'Begin'.
3. **Optimality Trade-off:** Simple stack reversal runs in linear O(N) time and O(N) space.

---

## 3. Algorithmic Complexity
| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ | Linear traversal of road segments. |
| **Space Complexity** | $O(N)$ | Auxiliary storage for segment descriptors. |

---

## 4. Idiomatic Implementation
```javascript
// Reference: solutions/reversingDirections.js
```
