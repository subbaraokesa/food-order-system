import React, {useEffect, useState} from 'react';
import ContactHeader from "./components/ContactHeader";
import {Link, useParams} from "react-router-dom";

import Spinner from "./ui/Spinner";

import {RootState, useAppDispatch} from "./redux/store";
import * as contactActions from './redux/contact.actions';
import * as contactReducer from './redux/contact.reducer';
import {useSelector} from "react-redux";



let ViewContact= () => {
    const dispatch = useAppDispatch();
    let {contactId} = useParams();

    // get data from redux store
    const contactState = useSelector((state) => {
        return state[contactReducer.contactFeatureKey];
    })

    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getContactAction(contactId));
        }
    }, [contactId]);

    let {loading, errorMessage, contact, group} = contactState;

    return (
        <>
            {
                loading && <Spinner/>
            }
            <ContactHeader heading={'View Contact'} color={'text-warning'}/>
            {
                Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                <div className="container mt-3">
                    <div className="row align-items-center">
                        <div className="col-sm-3">
                            <img src={contact.imageUrl}
                                 alt="" className="img-fluid rounded-circle shadow-lg"/>
                        </div>
                        <div className="col-sm-6">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Name : <span className="fw-bold">{contact.name}</span>
                                </li>
                                <li className="list-group-item">
                                    Email : <span className="fw-bold">{contact.email}</span>
                                </li>
                                <li className="list-group-item">
                                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item">
                                    Company : <span className="fw-bold">{contact.company}</span>
                                </li>
                                <li className="list-group-item">
                                    Title : <span className="fw-bold">{contact.title}</span>
                                </li>
                                <li className="list-group-item">
                                    Group Name : <span className="fw-bold">{group.name}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={'/contacts/admin'} className="btn btn-warning">
                                <i className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                        </div>
                    </div>
                </div>
            }

        </>
    )
};
export default ViewContact;