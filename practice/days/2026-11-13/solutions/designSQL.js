var SQL = function(names, columns) {
  this.tables = new Map();
  for (let i = 0; i < names.length; i++) {
    this.tables.set(names[i], {
      numCols: columns[i],
      nextId: 1,
      rows: new Map(),
    });
  }
};

SQL.prototype.ins = function(name, row) {
  const table = this.tables.get(name);
  if (!table || row.length !== table.numCols) return false;
  const id = table.nextId++;
  table.rows.set(id, row);
  return true;
};

SQL.prototype.rmv = function(name, rowId) {
  const table = this.tables.get(name);
  if (!table) return;
  table.rows.delete(rowId);
};

SQL.prototype.sel = function(name, rowId, columnId) {
  const table = this.tables.get(name);
  if (!table) return '<null>';
  const row = table.rows.get(rowId);
  if (!row || columnId < 1 || columnId > table.numCols) return '<null>';
  return row[columnId - 1];
};

SQL.prototype.exp = function(name) {
  const table = this.tables.get(name);
  if (!table) return [];
  const res = [];
  for (const [id, row] of table.rows.entries()) {
    res.push(id + ',' + row.join(','));
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const cmds = JSON.parse(lines[i]);
      const args = JSON.parse(lines[i + 1]);
      let obj = null;
      const out = [];
      for (let j = 0; j < cmds.length; j++) {
        const cmd = cmds[j];
        const a = args[j];
        if (cmd === 'SQL') {
          obj = new SQL(...a);
          out.push(null);
        } else {
          const res = obj[cmd](...a);
          out.push(res === undefined ? null : res);
        }
      }
      console.log(JSON.stringify(out));
    }
  }
}

module.exports = SQL;
