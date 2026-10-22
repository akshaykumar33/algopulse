const fs = require('fs');

const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);

let lineIdx = 0;
const [n, k] = input[lineIdx++].split(' ').map(Number);

const participants = [];
for (let i = 0; i < n; i++) {
  const [p, t] = input[lineIdx++].split(' ').map(Number);
  participants.push({ p, t });
}

participants.sort((a, b) => {
  if (a.p !== b.p) {
    return b.p - a.p; // More problems first (descending)
  } else {
    return a.t - b.t; // Less penalty first (ascending)
  }
});

const kthParticipant = participants[k - 1];
let count = 0;
for (let i = 0; i < n; i++) {
  if (participants[i].p === kthParticipant.p && participants[i].t === kthParticipant.t) {
    count++;
  }
}

console.log(count);
