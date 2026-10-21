if (typeof Node === 'undefined') {
  global.Node = class {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  };
}

function addTwoNumbers(l1, l2) {
  let dummy = new Node(0);
  let cur = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;
    if (l1 !== null) {
      sum += l1.data;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.data;
      l2 = l2.next;
    }
    cur.next = new Node(sum % 10);
    cur = cur.next;
    carry = Math.floor(sum / 10);
  }
  return dummy.next;
}

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input && input.length > 0 && input[0] !== '') {
    let ptr = 0;
    while (ptr < input.length) {
      if (ptr >= input.length) break;
      const n1 = parseInt(input[ptr++], 10);
      if (isNaN(n1)) break;
      let head1 = null, tail1 = null;
      for (let i = 0; i < n1; i++) {
        const node = new Node(parseInt(input[ptr++], 10));
        if (!head1) head1 = node;
        else tail1.next = node;
        tail1 = node;
      }
      if (ptr >= input.length) break;
      const n2 = parseInt(input[ptr++], 10);
      if (isNaN(n2)) break;
      let head2 = null, tail2 = null;
      for (let i = 0; i < n2; i++) {
        const node = new Node(parseInt(input[ptr++], 10));
        if (!head2) head2 = node;
        else tail2.next = node;
        tail2 = node;
      }
      const resHead = addTwoNumbers(head1, head2);
      const res = [];
      let c = resHead;
      while (c !== null) {
        res.push(c.data);
        c = c.next;
      }
      console.log(res.join(' '));
    }
  }
}
