const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  const nums = [
    parseInt(data[0], 10),
    parseInt(data[1], 10),
    parseInt(data[2], 10),
    parseInt(data[3], 10),
  ];
  const ops = [data[4], data[5], data[6]];
  let ans = Infinity;

  function dfs(arr, step) {
    if (arr.length === 1) {
      if (arr[0] < ans) ans = arr[0];
      return;
    }
    const op = ops[step];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const next = [];
        for (let k = 0; k < arr.length; k++) {
          if (k !== i && k !== j) next.push(arr[k]);
        }
        next.push(op === '+' ? arr[i] + arr[j] : arr[i] * arr[j]);
        dfs(next, step + 1);
      }
    }
  }

  dfs(nums, 0);
  console.log(ans);
}

solve();
