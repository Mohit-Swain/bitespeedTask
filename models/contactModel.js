const db = require('../utils/db');

// returns non deleted contacts
function findItem(email, phoneNumber) {

    return allContacts()
        .filter(contacts => !contacts.deletedAt)
        .filter(contacts => (contacts.email === email ||
            contacts.phoneNumber === phoneNumber))
        ;
};

function findItemWithEmail(email) {
    const contactsWithSameEmail = allActiveContacts()
        .filter(contacts => (contacts.email === email));

    if (contactsWithSameEmail.length == 0) {
        return [];
    }


}

// if linked id is null its primary else secondary
function updateLinkedIdInItem(id, linkedId) {
    if (id === linkedId) {
        linkedId = null; // the problem statement says the linkId should be null for primary
    }
    db.get('contact')
        .find({ id: id })
        .assign({
            linkedId: linkedId,
            linkPrecendence: (!linkedId ? "primary" : "secondary")
        })
        .write();
}

function setContacts(contacts) {
    db.set('contact', contacts)
        .write();
}


function insertItem(email, phoneNumber, linkedId) {
    const timeNow = Date.now();
    let contact = {
        id: getId(),
        email: email,
        phoneNumber: phoneNumber,
        linkedId: linkedId,
        linkPrecendence: (linkedId ? "secondary" : "primary"),
        createdAt: timeNow,
        updatedAt: timeNow
    };

    db.get('contact')
        .push(contact)
        .write();
    return contact.id;
};

function getPrimaryItemIds(email, phoneNumber,) {
    const contacts = findItem(email, phoneNumber);

    const primaryContactIds = contacts.filter(contact => contact.linkPrecendence === "primary").map(contact => contact.id);

    if (primaryContactIds.length > 1) {
        throw "Primary contact more than one for one contact";
    }

    return primaryContactIds;
}

function allActiveContacts() {
    return allContacts().filter(contacts => !contacts.deletedAt);
}

function allContacts() {
    return db.get('contact').value() || [];
}

function getId() {
    return allContacts().length + 1;
}


module.exports = {
    findItem: findItem,
    insertItem: insertItem,
    allActiveContacts: allActiveContacts,
    setContacts: setContacts
};