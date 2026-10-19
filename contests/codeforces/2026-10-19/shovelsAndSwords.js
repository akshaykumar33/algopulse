const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const t = parseInt(input[line++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const [a, b] = input[line++].split(' ').map(Number);

    let low = 0;
    let high = Math.floor((a + b) / 3);
    let ans = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      // To make 'mid' items, we need to find non-negative x, y such that x+y = mid
      // and 2x+y <= a, x+2y <= b.
      // Substitute y = mid - x:
      // 2x + (mid - x) <= a  => x + mid <= a  => x <= a - mid
      // x + 2(mid - x) <= b  => 2*mid - x <= b => x >= 2*mid - b
      // Also, x >= 0 and y >= 0 => x <= mid.
      // So, we need to find an x such that:
      // max(0, 2*mid - b) <= x <= min(mid, a - mid)
      // Such an x exists if and only if:
      // max(0, 2*mid - b) <= min(mid, a - mid)

      // This simplifies to two conditions:
      // 1. max(0, 2*mid - b) <= mid
      //    This is always true if mid >= 0, because 2*mid - b <= mid is equivalent to mid <= b, which is handled by the overall resource check.
      //    And 0 <= mid is true.
      // 2. max(0, 2*mid - b) <= a - mid
      //    This means 0 <= a - mid (i.e., mid <= a) AND 2*mid - b <= a - mid (i.e., 3*mid <= a + b).
      //    The condition mid <= a is implicitly handled by the overall resource check.
      //    The condition 3*mid <= a + b is already used to set the 'high' bound.

      // The most restrictive constraint is that we must have enough of both resources.
      // If we make 'mid' items, we need at least 'mid' sticks (if all are swords) and at least 'mid' ingots (if all are shovels).
      // More precisely, we need to be able to make 'mid' items given 'a' and 'b'.
      // The minimum sticks needed for 'mid' items is 'mid' (if all are swords). The maximum is '2*mid' (if all are shovels).
      // The minimum ingots needed for 'mid' items is 'mid' (if all are shovels). The maximum is '2*mid' (if all are swords).
      // The total resources are a+b. Each item uses 3 total resources. So mid <= (a+b)/3.
      // Also, we cannot make more items than we have of the less abundant resource type, considering the 1:2 or 2:1 ratio.
      // If a is much smaller than b, we are limited by a. We can make at most 'a' swords (using 2 ingots each) or 'a/2' shovels (using 1 ingot each).
      // If b is much smaller than a, we are limited by b. We can make at most 'b' shovels (using 2 sticks each) or 'b/2' swords (using 1 stick each).
      // The number of items 'mid' must be less than or equal to 'a' AND less than or equal to 'b'.
      // This is because even if we make all swords (1 stick, 2 ingots), we need at least 1 stick per sword. So mid <= a.
      // And if we make all shovels (2 sticks, 1 ingot), we need at least 1 ingot per shovel. So mid <= b.
      // So, mid <= min(a, b).

      // Combining these, a valid 'mid' must satisfy:
      // mid <= (a + b) / 3
      // mid <= a
      // mid <= b
      // Therefore, mid <= min(a, b, (a + b) / 3).
      // This is equivalent to mid <= min(a, b) AND mid <= (a + b) / 3.
      // Since a, b >= 0, we know that min(a, b) <= (a + b) / 2. And (a + b) / 3 <= (a + b) / 2.
      // It's always true that min(a, b) <= (a + b) / 3 if a and b are somewhat balanced.
      // For example, if a=1, b=100, then min(a,b)=1, (a+b)/3 = 101/3 = 33. So min(a,b) is the tighter bound.
      // If a=10, b=10, then min(a,b)=10, (a+b)/3 = 20/3 = 6. So (a+b)/3 is the tighter bound.

      // The actual check for 'mid' items is simpler: we need to ensure that we have enough resources for *some* combination.
      // We need to be able to satisfy: 2x + y <= a and x + 2y <= b for some x, y >= 0 with x + y = mid.
      // This is equivalent to: mid <= a AND mid <= b AND 3*mid <= a + b.
      // The first two conditions (mid <= a and mid <= b) ensure that we have enough of the 'single' resource type for 'mid' items.
      // The third condition (3*mid <= a + b) ensures we have enough total resources.
      // If all three are true, then it's possible to make 'mid' items.
      // Example: a=1, b=100. mid=1. 1<=1 (T), 1<=100 (T), 3*1 <= 1+100 (T). Possible.
      // Example: a=10, b=10. mid=6. 6<=10 (T), 6<=10 (T), 3*6 <= 10+10 (18 <= 20) (T). Possible.
      // Example: a=10, b=10. mid=7. 7<=10 (T), 7<=10 (T), 3*7 <= 10+10 (21 <= 20) (F). Not possible.

      if (mid <= a && mid <= b && 3 * mid <= a + b) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
