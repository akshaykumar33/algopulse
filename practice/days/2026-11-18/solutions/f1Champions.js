const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return;

  let ptr = 0;
  const t = parseInt(lines[ptr++].trim(), 10);
  const pts = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  const drivers = new Map();

  function getDriver(name) {
    if (!drivers.has(name)) {
      drivers.set(name, {
        name,
        points: 0,
        places: new Int32Array(51)
      });
    }
    return drivers.get(name);
  }

  for (let r = 0; r < t; r++) {
    const n = parseInt(lines[ptr++].trim(), 10);
    for (let pos = 1; pos <= n; pos++) {
      const name = lines[ptr++].trim();
      const d = getDriver(name);
      if (pos <= 10) d.points += pts[pos - 1];
      if (pos <= 50) d.places[pos]++;
    }
  }

  const list = Array.from(drivers.values());

  const list1 = list.slice().sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    for (let i = 1; i <= 50; i++) {
      if (a.places[i] !== b.places[i]) return b.places[i] - a.places[i];
    }
    return 0;
  });

  const list2 = list.slice().sort((a, b) => {
    if (a.places[1] !== b.places[1]) return b.places[1] - a.places[1];
    if (a.points !== b.points) return b.points - a.points;
    for (let i = 2; i <= 50; i++) {
      if (a.places[i] !== b.places[i]) return b.places[i] - a.places[i];
    }
    return 0;
  });

  console.log(list1[0].name);
  console.log(list2[0].name);
}

solve();
