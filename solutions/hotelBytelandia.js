const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(input[ptr++], 10);
    }
    const dep = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      dep[i] = parseInt(input[ptr++], 10);
    }

    const events = [];
    for (let i = 0; i < n; i++) {
      events.push((arr[i] << 1) | 1);
      events.push((dep[i] << 1) | 0);
    }

    events.sort((a, b) => {
      const timeA = a >> 1;
      const timeB = b >> 1;
      if (timeA !== timeB) return timeA - timeB;
      return (a & 1) - (b & 1);
    });

    let current = 0;
    let maxGuests = 0;
    for (let i = 0; i < events.length; i++) {
      if ((events[i] & 1) === 1) {
        current++;
        if (current > maxGuests) maxGuests = current;
      } else {
        current--;
      }
    }

    out.push(maxGuests);
  }

  console.log(out.join('\n'));
}

solve();
