const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = input[idx++];
    const b = input[idx++];

    const vao = [];
    const vbo = [];
    const vae = [];
    const vbe = [];

    for (let p = 0; p < n; p++) {
      if (p & 1) {
        if (a[p] === '1' && b[p] === '0') vao.push(p);
        else if (a[p] === '0' && b[p] === '1') vbo.push(p);
      } else {
        if (a[p] === '1' && b[p] === '0') vae.push(p);
        else if (a[p] === '0' && b[p] === '1') vbe.push(p);
      }
    }

    if (vao.length === vbo.length && vae.length === vbe.length) {
      let cnt = 0;
      for (let p = 0; p < vao.length; p++) {
        cnt += Math.abs(vao[p] - vbo[p]);
      }
      for (let p = 0; p < vae.length; p++) {
        cnt += Math.abs(vae[p] - vbe[p]);
      }
      out.push(Math.floor(cnt / 2));
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
