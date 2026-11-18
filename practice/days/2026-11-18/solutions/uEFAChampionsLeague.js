const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextWord() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('latin1', start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const teams = new Map();

    function getTeam(name) {
      if (!teams.has(name)) teams.set(name, { name, pts: 0, gd: 0 });
      return teams.get(name);
    }

    for (let m = 0; m < 12; m++) {
      const hName = nextWord();
      const hScore = parseInt(nextWord(), 10);
      nextWord(); // 'vs.'
      const aScore = parseInt(nextWord(), 10);
      const aName = nextWord();

      const t1 = getTeam(hName);
      const t2 = getTeam(aName);

      if (hScore > aScore) {
        t1.pts += 3;
      } else if (hScore < aScore) {
        t2.pts += 3;
      } else {
        t1.pts += 1;
        t2.pts += 1;
      }

      t1.gd += hScore - aScore;
      t2.gd += aScore - hScore;
    }

    const list = [...teams.values()].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return b.gd - a.gd;
    });

    out.push(`${list[0].name} ${list[1].name}`);
  }

  console.log(out.join('\n'));
}

solve();
