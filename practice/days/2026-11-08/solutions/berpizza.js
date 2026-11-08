const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const q = nextInt();
  if (q === null) return;

  const heapMoney = new Int32Array(q + 1);
  const heapId = new Int32Array(q + 1);
  let heapSize = 0;

  function compare(m1, id1, m2, id2) {
    if (m1 !== m2) return m1 > m2;
    return id1 < id2;
  }

  function push(m, id) {
    heapSize++;
    let i = heapSize;
    while (i > 1) {
      const p = i >> 1;
      if (compare(m, id, heapMoney[p], heapId[p])) {
        heapMoney[i] = heapMoney[p];
        heapId[i] = heapId[p];
        i = p;
      } else {
        break;
      }
    }
    heapMoney[i] = m;
    heapId[i] = id;
  }

  function pop() {
    const lastM = heapMoney[heapSize];
    const lastId = heapId[heapSize];
    heapSize--;
    if (heapSize === 0) return;
    let i = 1;
    while ((i << 1) <= heapSize) {
      let child = i << 1;
      if (child + 1 <= heapSize && compare(heapMoney[child + 1], heapId[child + 1], heapMoney[child], heapId[child])) {
        child++;
      }
      if (compare(heapMoney[child], heapId[child], lastM, lastId)) {
        heapMoney[i] = heapMoney[child];
        heapId[i] = heapId[child];
        i = child;
      } else {
        break;
      }
    }
    heapMoney[i] = lastM;
    heapId[i] = lastId;
  }

  const served = new Uint8Array(q + 1);
  let nextCustId = 1;
  let earliestId = 1;
  const out = [];

  for (let i = 0; i < q; i++) {
    const type = nextInt();
    if (type === 1) {
      const m = nextInt();
      push(m, nextCustId);
      nextCustId++;
    } else if (type === 2) {
      while (served[earliestId]) {
        earliestId++;
      }
      served[earliestId] = 1;
      out.push(earliestId);
    } else {
      while (heapSize > 0 && served[heapId[1]]) {
        pop();
      }
      const topId = heapId[1];
      served[topId] = 1;
      pop();
      out.push(topId);
    }
  }

  console.log(out.join(' '));
}

solve();
