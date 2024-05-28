const db = require('../utils/db');

function setContacts(contacts) {
    db.set('contact', contacts)
        .write();
}

function getAllContacts() {
    return db.get('contact').value() || [];
}

module.exports = {
    getAllContacts: getAllContacts,
    setContacts: setContacts
};