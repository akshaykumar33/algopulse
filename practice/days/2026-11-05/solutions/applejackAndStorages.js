const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const cnt = new Int32Array(100005);
  let totalPairs = 0;
  let count4 = 0;

  for (let i = 0; i < n; i++) {
    const x = parseInt(input[ptr++], 10);
    totalPairs -= cnt[x] >> 1;
    if (cnt[x] >= 4) count4--;
    cnt[x]++;
    totalPairs += cnt[x] >> 1;
    if (cnt[x] >= 4) count4++;
  }

  const q = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < q; i++) {
    const type = input[ptr++];
    const x = parseInt(input[ptr++], 10);
    totalPairs -= cnt[x] >> 1;
    if (cnt[x] >= 4) count4--;

    if (type === '+') {
      cnt[x]++;
    } else {
      cnt[x]--;
    }

    totalPairs += cnt[x] >> 1;
    if (cnt[x] >= 4) count4++;

    if (count4 >= 1 && totalPairs >= 4) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

