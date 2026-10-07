const readline = require('readline');

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const lines = [];

  rl.on('line', (line) => {
    if (line.trim() !== '') {
      lines.push(line.trim());
    }
  });

  rl.on('close', () => {
    if (lines.length === 0) return;

    let lineIdx = 0;
    const firstLine = lines[lineIdx++].split(/\s+/).map(Number);
    const n = firstLine[0];
    const startNode = firstLine[1];
    const targetNode = firstLine[2];

    const headPtr = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const next = new Int32Array(2 * n);
    let edgeCount = 0;

    function addEdge(u, v) {
      to[edgeCount] = v;
      next[edgeCount] = headPtr[u];
      headPtr[u] = edgeCount++;
      to[edgeCount] = u;
      next[edgeCount] = headPtr[v];
      headPtr[v] = edgeCount++;
    }

    for (let i = 0; i < n - 1; i++) {
      if (lineIdx >= lines.length) break;
      const parts = lines[lineIdx++].split(/\s+/).map(Number);
      addEdge(parts[0], parts[1]);
    }

    if (startNode === targetNode) {
      console.log(0);
      return;
    }

    const dist = new Int32Array(n + 1).fill(-1);
    dist[startNode] = 0;

    const queue = new Int32Array(n + 1);
    let qHead = 0;
    let qTail = 0;

    queue[qTail++] = startNode;

    while (qHead < qTail) {
      const curr = queue[qHead++];
      if (curr === targetNode) {
        console.log(dist[curr]);
        return;
      }
      let e = headPtr[curr];
      while (e !== -1) {
        const neighbor = to[e];
        if (dist[neighbor] === -1) {
          dist[neighbor] = dist[curr] + 1;
          queue[qTail++] = neighbor;
        }
        e = next[e];
      }
    }

    console.log(dist[targetNode]);
  });
}

main();
