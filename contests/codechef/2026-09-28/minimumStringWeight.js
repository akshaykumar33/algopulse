const fs = require('fs');

function computeMinWeight(S, K) {
  if (!S || S.length === 0 || K >= S.length) {
    return 0;
  }
  if (K <= 0) {
    const counts = new Int32Array(26);
    for (let i = 0; i < S.length; i++) {
      counts[S.charCodeAt(i) - 97]++;
    }
    let weight = 0;
    for (let i = 0; i < 26; i++) {
      weight += counts[i] * counts[i];
    }
    return weight;
  }

  const counts = new Int32Array(26);
  let maxF = 0;
  for (let i = 0; i < S.length; i++) {
    const code = S.charCodeAt(i) - 97;
    counts[code]++;
    if (counts[code] > maxF) {
      maxF = counts[code];
    }
  }

  let low = 0;
  let high = maxF;
  let bestC = maxF;

  while (low <= high) {
    const mid = (low + high) >> 1;
    let removed = 0;
    for (let i = 0; i < 26; i++) {
      if (counts[i] > mid) {
        removed += counts[i] - mid;
      }
    }
    if (removed <= K) {
      bestC = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  let removalsUsed = 0;
  for (let i = 0; i < 26; i++) {
    if (counts[i] > bestC) {
      removalsUsed += counts[i] - bestC;
      counts[i] = bestC;
    }
  }

  let remainingRemovals = K - removalsUsed;
  if (remainingRemovals > 0 && bestC > 0) {
    for (let i = 0; i < 26 && remainingRemovals > 0; i++) {
      if (counts[i] === bestC) {
        counts[i]--;
        remainingRemovals--;
      }
    }
  }

  let totalWeight = 0;
  for (let i = 0; i < 26; i++) {
    totalWeight += counts[i] * counts[i];
  }
  return totalWeight;
}

function solve() {
  const content = fs.readFileSync(0, 'utf-8');
  if (!content) return;
  const lines = content.split(/\r?\n/);
  const output = [];
  let lineIdx = 0;

  while (lineIdx < lines.length) {
    let s = lines[lineIdx++];
    if (s === '') {
      if (lineIdx < lines.length && /^\d+$/.test(lines[lineIdx].trim())) {
        const K = parseInt(lines[lineIdx++].trim(), 10);
        output.push(computeMinWeight('', K));
        continue;
      } else {
        continue;
      }
    }
    s = s.trim();
    if (!s && lineIdx >= lines.length) break;
    if (lineIdx < lines.length) {
      const kLine = lines[lineIdx++].trim();
      if (/^\d+$/.test(kLine)) {
        const K = parseInt(kLine, 10);
        output.push(computeMinWeight(s, K));
      }
    }
  }

  if (output.length > 0) {
    console.log(output.join('\n'));
  }
}

solve();
