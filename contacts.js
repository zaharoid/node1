import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('db', 'contacts.json')

const addContactsToDb = (contacts) => {
     fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

export const getContacts = async () => {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    return contacts;
} 

export const getContactById = async (id) => {
    const contacts = await getContacts();
    const contact = contacts.find(contact => contact.id === id) 
    if (contact === undefined) {
        return null
    }
    return contact
}

export const addContact = async ({name, email, phone}) => {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    const contacts = await getContacts()
    contacts.push(newContact)
    await addContactsToDb(contacts)
    return newContact

}

export const removeContact = async (id) => {
    const  contacts = await getContacts() 
    const index = contacts.findIndex(contact => contact.id === id)
    if (index === -1 ) {
        return null
    }
    const [contact] = contacts.splice(index, 1)

    await addContactsToDb(contacts)
    return contact
}

export const updateContactById = async (id, {name, email, phone}) => {
    const contacts = await getContacts();
    const index = contacts.findIndex(contact => contact.id === id)
    contacts[index] = {id, name, email, phone} 
    await addContactsToDb(contacts)
    return contacts[index];
}

