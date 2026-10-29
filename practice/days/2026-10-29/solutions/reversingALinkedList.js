const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0].trim() === '') return;
  let ptr = 0;
  const t = parseInt(lines[ptr++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= lines.length) break;
    const q = parseInt(lines[ptr++].trim(), 10);
    const list = [];

    function printList() {
      if (list.length === 0) {
        out.push('null');
      } else {
        out.push(list.join('->') + '->null');
      }
    }

    for (let i = 0; i < q; i++) {
      if (ptr >= lines.length) break;
      const line = lines[ptr++].trim();
      if (!line) continue;
      const parts = line.split(/\s+/);
      const op = parts[0];

      if (op === 'I') {
        out.push(list.length === 0 ? 'true' : 'false');
      } else if (op === 'AF') {
        list.unshift(parts[1]);
        printList();
      } else if (op === 'AL') {
        list.push(parts[1]);
        printList();
      } else if (op === 'RF') {
        if (list.length === 0) {
          out.push('ListEmptyException');
        } else {
          list.shift();
          printList();
        }
      } else if (op === 'RL') {
        if (list.length === 0) {
          out.push('ListEmptyException');
        } else {
          list.pop();
          printList();
        }
      } else if (op === 'REV') {
        list.reverse();
        printList();
      } else if (op === 'F') {
        if (list.length === 0) {
          out.push('ListEmptyException');
        } else {
          out.push(list[0]);
        }
      } else if (op === 'L') {
        if (list.length === 0) {
          out.push('ListEmptyException');
        } else {
          out.push(list[list.length - 1]);
        }
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
