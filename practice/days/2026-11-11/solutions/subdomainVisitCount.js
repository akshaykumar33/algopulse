var subdomainVisits = function(cpdomains) {
  const counts = new Map();
  for (let i = 0; i < cpdomains.length; i++) {
    const s = cpdomains[i];
    const sp = s.indexOf(' ');
    const cnt = Number(s.slice(0, sp));
    const dom = s.slice(sp + 1);
    counts.set(dom, (counts.get(dom) || 0) + cnt);
    let idx = dom.indexOf('.');
    while (idx !== -1) {
      const sub = dom.slice(idx + 1);
      counts.set(sub, (counts.get(sub) || 0) + cnt);
      idx = dom.indexOf('.', idx + 1);
    }
  }
  const res = [];
  for (const [sub, cnt] of counts) {
    res.push(cnt + ' ' + sub);
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(subdomainVisits(JSON.parse(line))));
    }
  }
}
