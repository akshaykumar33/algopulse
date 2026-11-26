'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const names = new Array(n);
  for (let i = 0; i < n; i++) names[i] = tok[ptr++];

  const adj = Array.from({ length: 26 }, () => []);
  for (let i = 0; i + 1 < n; i++) {
    const s = names[i];
    const t = names[i + 1];
    const len = Math.min(s.length, t.length);
    let diff = false;
    for (let j = 0; j < len; j++) {
      if (s[j] !== t[j]) {
        adj[s.charCodeAt(j) - 97].push(t.charCodeAt(j) - 97);
        diff = true;
        break;
      }
    }
    if (!diff && s.length > t.length) {
      console.log('Impossible');
      return;
    }
  }

  const vis = new Uint8Array(26);
  const order = [];
  let cycle = false;

  function dfs(u) {
    vis[u] = 1;
    const list = adj[u];
    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      if (vis[v] === 1) cycle = true;
      else if (vis[v] === 0) dfs(v);
    }
    vis[u] = 2;
    order.push(u);
  }

  for (let i = 25; i >= 0; i--) {
    if (vis[i] === 0) dfs(i);
  }

  if (cycle) {
    console.log('Impossible');
    return;
  }

  order.reverse();
  const res = new Array(26);
  for (let i = 0; i < 26; i++) {
    res[i] = String.fromCharCode(97 + order[i]);
  }
  console.log(res.join(''));
}

solve();
