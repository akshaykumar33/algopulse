class OrderHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }
  push(val) {
    this.data.push(val);
    this._up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this._down(0);
    }
    return top;
  }
  peek() {
    return this.data.length > 0 ? this.data[0] : null;
  }
  size() {
    return this.data.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(this.data[i], this.data[p]) < 0) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  _down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      const left = (i << 1) + 1;
      const right = left + 1;
      let best = left;
      if (right < len && this.compare(this.data[right], this.data[left]) < 0) {
        best = right;
      }
      if (this.compare(this.data[best], this.data[i]) < 0) {
        const tmp = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = tmp;
        i = best;
      } else break;
    }
  }
}

var getNumberOfBacklogOrders = function(orders) {
  const buyQueue = new OrderHeap((a, b) => b[0] - a[0]);
  const sellQueue = new OrderHeap((a, b) => a[0] - b[0]);
  const mod = 1000000007;

  for (let i = 0; i < orders.length; i++) {
    const price = orders[i][0];
    let amount = orders[i][1];
    const type = orders[i][2];

    if (type === 0) {
      while (amount > 0 && sellQueue.size() > 0 && sellQueue.peek()[0] <= price) {
        const sell = sellQueue.peek();
        const match = Math.min(amount, sell[1]);
        amount -= match;
        sell[1] -= match;
        if (sell[1] === 0) {
          sellQueue.pop();
        }
      }
      if (amount > 0) {
        buyQueue.push([price, amount]);
      }
    } else {
      while (amount > 0 && buyQueue.size() > 0 && buyQueue.peek()[0] >= price) {
        const buy = buyQueue.peek();
        const match = Math.min(amount, buy[1]);
        amount -= match;
        buy[1] -= match;
        if (buy[1] === 0) {
          buyQueue.pop();
        }
      }
      if (amount > 0) {
        sellQueue.push([price, amount]);
      }
    }
  }

  let total = 0;
  for (let i = 0; i < buyQueue.data.length; i++) {
    total = (total + buyQueue.data[i][1]) % mod;
  }
  for (let i = 0; i < sellQueue.data.length; i++) {
    total = (total + sellQueue.data[i][1]) % mod;
  }
  return total;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(getNumberOfBacklogOrders(JSON.parse(line))));
    }
  }
}

module.exports = getNumberOfBacklogOrders;
