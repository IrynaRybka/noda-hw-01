const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const textJson = data.toString();
  const formatJson = JSON.parse(textJson);
// console.log(formatJson);
  return formatJson;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const textJson = data.toString();
  const formatJson = JSON.parse(textJson);
  const getContact = formatJson.find((contact) => contact.id === contactId);

  return getContact;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const formatJson = JSON.parse(data.toString());
  const findContacts = formatJson.filter((contact) => contact.id !== contactId);
  const updateContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(findContacts)
  );

  return updateContacts;
}

async function addContact(name, email, phone) {
  const newContent = {
    id: Number().toString(),
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, newContent, "utf8");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
