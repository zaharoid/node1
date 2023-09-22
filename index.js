import {program} from 'commander'
import * as contactsService  from "./contacts.js";

program 
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>')
program.parse()

const options = program.opts()



const invokeAction = async ({action, id, name, email, phone}) => {
    try {
        switch (action) {
            case 'list':
                const contacts = await contactsService.getContacts()
                return console.table(contacts)
            case 'get': 
                const contact = await contactsService.getContactById(id)
                return console.log(contact)
                
            case 'add':
                const newContact = await contactsService.addContact({name, email, phone})
                return console.log(newContact)
            case 'update': 
                const updateContact = await contactsService.updateContactById(id, {name, email, phone})
                return console.log(updateContact)
            case 'remove': 
                const removedContact = await contactsService.removeContact(id)
                return console.log(removedContact)
            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
         console.log(error)
        throw error;
    }
}

invokeAction(options)
// invokeAction({action: "add", name: 'angel', email: '1@mail.com', phone: '45' })
// invokeAction({action: 'remove', id: "-5d1xRWXGPiF36FMQs29o"})
// invokeAction({action: 'list'})
// invokeAction({action: 'sdf', id: "iYFJxUl7Xw1qC5NUuO8-j", name: "Marley", email: "1@mail.com", phone: '420420'})