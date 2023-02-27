const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const textJson = data.toString();
  const formatJson = JSON.parse(textJson);

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
    JSON.stringify(findContacts, null, 1)
  );
  console.log(`The contact ${contactId} was deleted!`);
  return updateContacts;
}

async function addContact(name, email, phone) {
  const newContent = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  const data = await fs.readFile(contactsPath, "utf8");
  const formatJson = JSON.parse(data.toString());
  const addNewContact = [...formatJson, newContent];
  await fs.writeFile(contactsPath, JSON.stringify(addNewContact), "utf8");

  console.log(`
  Congratulation, you add the new contact ${name}!`);
  
  return newContent;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
