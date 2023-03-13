import axios from 'axios';

export class ContactService {

     static serverUrl = process.env.REACT_APP_CONTACT_SERVER_URL ? process.env.REACT_APP_CONTACT_SERVER_URL : "";

    // get all Contacts
    static getAllContacts(){
        let dataUrl = this.serverUrl && `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    // get a Contact
 static getContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    // create a Contact
    static createContact(contact) {
        let dataUrl = `${this.serverUrl}/contacts/`;
        return axios.post(dataUrl, contact);
    }

    // update a Contact
  static updateContact(contact, contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);
    }

    // delete a Contact
  static deleteContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }
}

export default ContactService;