import {createAsyncThunk} from "@reduxjs/toolkit";
import {ContactService} from "./services/ContactService";
import {GroupService} from "./services/GroupService";

// get all Contacts
export const getAllContactsAction = createAsyncThunk('contacts/getAllContactsAction', async () => {
    let response = await ContactService.getAllContacts();
    return response.data;
})

// get a Contact
export const getContactAction = createAsyncThunk('contacts/getContactAction', async (contactId, {dispatch}) => {
    let response = await ContactService.getContact(contactId);
    if (response && response.data) {
        dispatch(getGroupAction(response.data));
    }
    return response.data;
})

// create a Contact
export const createContactAction = createAsyncThunk('contacts/createContactAction', async (contact)=> {
    let response = await ContactService.createContact(contact);
    return response.data;
})

// update a Contact
export const updateContactAction = createAsyncThunk('contacts/updateContactAction', async (payload) => {
    let {contact, contactId} = payload;
    let response = await ContactService.updateContact(contact, contactId);
    return response.data;
})

// delete a Contact
export const deleteContactAction = createAsyncThunk('contacts/deleteContactAction', async (contactId) => {
    let response = await ContactService.deleteContact(contactId);
    return response.data;
})

// get all groups
export const getAllGroupsAction = createAsyncThunk('contacts/getAllGroupsAction', async () => {
    let response = await GroupService.getAllGroups();
    return response.data;
})

// get a group
export const getGroupAction = createAsyncThunk('contacts/getGroupAction', async (contact) => {
    let response = await GroupService.getGroup(contact);
    return response.data;
})