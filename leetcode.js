/**
 * Universal LeetCode Starter Template
 * 
 * Rules:
 * 1. NEVER commit or leave problem-specific solutions in leetcode.js.
 * 2. Keep this template clean as the universal starter boilerplate for LeetCode problems.
 * 3. When solving a LeetCode problem, copy this file to <problemName>.js (in camelCase/PascalCase).
 * 4. The solution function at the top can be directly copied into the LeetCode editor.
 */

// ============================================================================
// 1. Common LeetCode Data Structures & Helpers
// ============================================================================

/**
 * Singly-linked list node definition
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

const arrayToList = (arr) => {
  if (!arr || arr.length === 0) return null;
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
};

const listToArray = (head) => {
  const res = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  return res;
};

/**
 * Binary tree node definition
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const arrayToTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      cur.right = new TreeNode(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
};

const treeToArray = (root) => {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur !== null) {
      res.push(cur.val);
      queue.push(cur.left || null);
      queue.push(cur.right || null);
    } else {
      res.push(null);
    }
  }
  // Trim trailing nulls
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
};

/**
 * Generic Binary Heap (Priority Queue)
 * Default: Min-Heap ((a, b) => a - b). For Max-Heap, pass ((a, b) => b - a).
 */
class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }
  size() { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
  peek() { return this.heap[0] ?? null; }
  enqueue(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._bubbleDown(0);
    }
    return top;
  }
  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.comparator(this.heap[idx], this.heap[parent]) < 0) {
        [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
        idx = parent;
      } else break;
    }
  }
  _bubbleDown(idx) {
    const len = this.heap.length;
    while ((idx << 1) + 1 < len) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let best = idx;
      if (this.comparator(this.heap[left], this.heap[best]) < 0) best = left;
      if (right < len && this.comparator(this.heap[right], this.heap[best]) < 0) best = right;
      if (best !== idx) {
        [this.heap[idx], this.heap[best]] = [this.heap[best], this.heap[idx]];
        idx = best;
      } else break;
    }
  }
}

/**
 * Disjoint Set Union (DSU / Union-Find) with path compression and rank optimization
 */
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return false;
    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootJ] = rootI;
      this.rank[rootI]++;
    }
    this.components--;
    return true;
  }
  connected(i, j) {
    return this.find(i) === this.find(j);
  }
}

// ============================================================================
// 2. LeetCode Solution Implementation
// ============================================================================

/**
 * @param {any} args
 * @return {any}
 */
var solve = function(...args) {
  // LeetCode core solution logic goes here
};

// ============================================================================
// 3. Local Test Harness (executed via `node run <file>` or `node <file>.js`)
// ============================================================================

if (require.main === module) {
  const fs = require('fs');

  // Define sample test cases for quick local verification
  const testCases = [
    // { input: [...], expected: ... }
  ];

  let inputData = '';
  try {
    if (!process.stdin.isTTY) {
      inputData = fs.readFileSync(0, 'utf-8').trim();
    }
  } catch (_) {}

  if (inputData.length > 0) {
    // Mode A: Parse input from stdin (input.txt)
    const lines = inputData.split(/\r?\n/).filter(line => line.trim().length > 0);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(JSON.stringify(solve(...parsed)));
        } else {
          console.log(JSON.stringify(solve(parsed)));
        }
      } catch (_) {
        // Fallback for non-JSON lines
        const tokens = line.trim().split(/\s+/);
        console.log(solve(...tokens));
      }
    }
  } else {
    // Mode B: Run predefined test cases
    console.log(`Running ${testCases.length} sample test cases...\n`);
    let passed = 0;
    testCases.forEach((tc, idx) => {
      const actual = solve(...tc.input);
      const isMatch = JSON.stringify(actual) === JSON.stringify(tc.expected);
      if (isMatch) {
        passed++;
        console.log(`[PASS] Test #${idx + 1}: expected ${JSON.stringify(tc.expected)}, got ${JSON.stringify(actual)}`);
      } else {
        console.log(`[FAIL] Test #${idx + 1}: expected ${JSON.stringify(tc.expected)}, got ${JSON.stringify(actual)}`);
      }
    });
    console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
  }
}
