const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Default
db.defaults({ contact: [] })
    .write();

module.exports = db;