import React, {useEffect, useState} from 'react';
import ContactHeader from "./components/ContactHeader";
import {Link} from "react-router-dom";
import ContactCard from "./components/ContactCard";

import {ContactService} from "./services/ContactService";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import {ToastUtil} from "./util/ToastUtil";
import * as contactReducer from './redux/contact.reducer';
import * as contactActions from './redux/contact.actions';
import {useSelector} from "react-redux";
import { useAppDispatch} from "./redux/store";
import {clearErrorMessage} from "./redux/contact.reducer";


let AdminContact = () => {
    const dispatch = useAppDispatch();

    // get state data from redux store
    const contactState = useSelector((state) => {
        return state[contactReducer.contactFeatureKey];
    });

    let [searchKey, setSearchKey] = useState<string>("");
    let [filteredContacts, setFilteredContacts] = useState<[]>([]);

    const filterContacts = (e) => {
        setSearchKey(e.target.value);
        setFilteredContacts([...contactState.contacts.filter((contact => {
            return contact.name.toUpperCase().trim().includes(e.target.value.toUpperCase().trim()) ||
                contact.mobile.trim().includes(e.target.value.trim())
        }))]);
    };

    const compareContact = (a) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    };

    useEffect(() => {
        dispatch(clearErrorMessage());
        dispatch(contactActions.getAllContactsAction());
    }, []);

    useEffect(() => {
        setFilteredContacts(contactState.contacts);
    }, [contactState.contacts])

    const deleteContact = (contactId)=> {
        if (contactId) {
            dispatch(contactActions.deleteContactAction(contactId)).then((response: any) => {
                if (!response.error) {
                    ToastUtil.displayInfoToast("Contact is Deleted");
                    dispatch(contactActions.getAllContactsAction());
                } else {
                    ToastUtil.displayErrorToast("Contact Deletion is Failed");
                }
            });
        }
    };

    let {loading, errorMessage, contacts} = contactState;
    return (
        <>
            {
                loading && <Spinner/>
            }
            <ContactHeader heading={'Contacts Admin'} color={'text-success'}/>
            {/* Search Section */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={searchKey}
                                        onChange={e => filterContacts(e)}
                                        type="text" className="form-control" placeholder="Search Contact"/>
                                </div>
                                <div className="col">
                                    <input type="submit" value="Search" className="btn btn-outline-dark"/>
                                    <Link to={'/contacts/add'} className="btn btn-success ms-4">
                                        <i className="fa fa-plus-circle"></i> Create New</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {
                filteredContacts.length > 0 ? <div className="container mt-3">
                    <div className="row">
                        {
                            filteredContacts.map((contact, index) => {
                                return (
                                    <div className="col-sm-6" key={index}>
                                        <ContactCard contact={contact} deleteContact={deleteContact}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> : <div className="container mt-3">
                    <div className="row">
                        <div className="col text-center">
                            <p className="fw-bold text-warning">----------------- NO Contacts Data found
                                ----------------- </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};
export default AdminContact;