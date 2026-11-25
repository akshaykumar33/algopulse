const fs = require('fs');

function charVal(ch) {
  const c = ch.charCodeAt(0);
  if (c >= 48 && c <= 57) return c - 48;
  return c - 65 + 10;
}

function evalBase(s, base, limit) {
  let v = 0;
  for (let i = 0; i < s.length; i++) {
    v = v * base + charVal(s[i]);
    if (v > limit) return v;
  }
  return v;
}

function stripZero(s) {
  let i = 0;
  while (i < s.length && s[i] === '0') i++;
  return s.slice(i);
}

function solve() {
  const line = fs.readFileSync(0, 'utf-8').trim();
  if (!line) return;
  const parts = line.split(':');
  const sa = parts[0];
  const sb = parts[1];
  let maxD = 0;
  for (let i = 0; i < sa.length; i++) maxD = Math.max(maxD, charVal(sa[i]));
  for (let i = 0; i < sb.length; i++) maxD = Math.max(maxD, charVal(sb[i]));
  const minR = Math.max(2, maxD + 1);
  const ta = stripZero(sa);
  const tb = stripZero(sb);
  if (ta.length <= 1 && tb.length <= 1) {
    const va = ta.length ? charVal(ta[0]) : 0;
    const vb = tb.length ? charVal(tb[0]) : 0;
    console.log(va <= 23 && vb <= 59 ? '-1' : '0');
    return;
  }
  const ans = [];
  for (let r = minR; r <= 59; r++) {
    if (evalBase(ta, r, 23) <= 23 && evalBase(tb, r, 59) <= 59) {
      ans.push(r);
    }
  }
  console.log(ans.length ? ans.join(' ') : '0');
}

solve();
