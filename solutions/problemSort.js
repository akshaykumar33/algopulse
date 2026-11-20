const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const p = parseInt(input[ptr++], 10);
  const s = parseInt(input[ptr++], 10);

  const problems = [];
  for (let i = 1; i <= p; i++) {
    const sc = [];
    for (let j = 0; j < s; j++) sc.push(parseInt(input[ptr++], 10));
    const ns = [];
    for (let j = 0; j < s; j++) ns.push(parseInt(input[ptr++], 10));

    const subtasks = [];
    for (let j = 0; j < s; j++) subtasks.push({ score: sc[j], subs: ns[j] });
    subtasks.sort((a, b) => a.score - b.score);

    let inv = 0;
    for (let j = 0; j < s - 1; j++) {
      if (subtasks[j].subs > subtasks[j + 1].subs) inv++;
    }

    problems.push({ id: i, inv });
  }

  problems.sort((a, b) => {
    if (a.inv !== b.inv) return a.inv - b.inv;
    return a.id - b.id;
  });

  const out = problems.map(x => x.id);
  console.log(out.join('\n'));
}

solve();