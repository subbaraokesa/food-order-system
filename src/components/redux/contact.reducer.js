import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {IContact} from "../../modules/contact/models/IContact";
import {IGroup} from "../../modules/contact/models/IGroup";
import * as contactActions from './contact.actions';
import {ToastUtil} from "../../util/ToastUtil";

export const contactFeatureKey = "contactFeature";



const initialState = {
    loading: false,
    errorMessage: {} ,
    contacts: [] ,
    contact: {} ,
    groups: [] ,
    group: {} 
};

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState: initialState,
    reducers: {
        clearErrorMessage: (state) => {
            state.errorMessage = {} 
        }
    },
    extraReducers: (builder) => {
        // get all contacts
        builder.addCase(contactActions.getAllContactsAction.pending, (state) => {
            state.loading = true;
        }).addCase(contactActions.getAllContactsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        }).addCase(contactActions.getAllContactsAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // get a contact
            .addCase(contactActions.getContactAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.getContactAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contact = action.payload;
        }).addCase(contactActions.getContactAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // create a contact
            .addCase(contactActions.createContactAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.createContactAction.fulfilled, (state) => {
            state.loading = false;
        }).addCase(contactActions.createContactAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // update a contact
            .addCase(contactActions.updateContactAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.updateContactAction.fulfilled, (state) => {
            state.loading = false;
        }).addCase(contactActions.updateContactAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // delete a contact
            .addCase(contactActions.deleteContactAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.deleteContactAction.fulfilled, (state) => {
            state.loading = false;
        }).addCase(contactActions.deleteContactAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // get all groups
            .addCase(contactActions.getAllGroupsAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.getAllGroupsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.groups = action.payload;
        }).addCase(contactActions.getAllGroupsAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })

            // get a group
            .addCase(contactActions.getGroupAction.pending, (state) => {
                state.loading = true;
            }).addCase(contactActions.getGroupAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group = action.payload;
        }).addCase(contactActions.getGroupAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
        })
    }
});
export const {clearErrorMessage} = contactSlice.actions;













