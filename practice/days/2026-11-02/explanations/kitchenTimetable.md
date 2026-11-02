# Kitchen Timetable (CodeChef CC-KTTABLE)

## 1. Problem Overview
- **Platform:** CodeChef
- **Problem ID:** [CC-KTTABLE](https://www.codechef.com/problems/KTTABLE)
- **Difficulty / Rating:** 950
- **Tags:** implementation, arrays
- **Solution File:** `kitchenTimetable.js`

---

## 2. Core Intuition & Mathematical Rationale
Student $i$ (with $1 \le i \le N$) is assigned a cooking time slot from $A_{i-1}$ to $A_i$ (where $A_0 = 0$).
The duration allocated to student $i$ is:
$$\Delta t_i = A_i - A_{i-1}$$
Student $i$ requires $B_i$ units of time to finish cooking. Therefore, student $i$ can complete their cooking if and only if:
$$B_i \le \Delta t_i = A_i - A_{i-1}$$
We iterate through all $N$ students, calculate the available window, and increment our counter whenever the condition holds.

---

## 3. Complexity
- **Time Complexity:** $O(N)$ per testcase, total $O(\sum N)$.
- **Space Complexity:** $O(N)$ to store array $A$.

