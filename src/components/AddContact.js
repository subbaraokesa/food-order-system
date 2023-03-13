import React, {useEffect, useState} from 'react';
import ContactHeader from "./components/ContactHeader";
import {Link, useNavigate} from "react-router-dom";

import {GroupService} from "./services/GroupService";
import Spinner from "../ui/spinner";
import {ContactService} from "./services/ContactService";
import {ToastUtil} from "./utils/ToastUtils";
import * as contactActions from './redux/contact.action';
import * as contactReducer from './redux/contact.reducer';

import {RootState, useAppDispatch} from "./redux/store";
import {useSelector} from "react-redux";
import ErrorMessage from "../ui/ErrorMessage";
import {clearErrorMessage} from "./redux/contact.reducer";


let AddContact = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const contactState= useSelector((state) => {
        return state[contactReducer.contactFeatureKey];
    });

    const [contact, setContact] = useState<{}>({
        name: "",
        imageUrl: "",
        mobile: "",
        email: "",
        company: "",
        title: "",
        groupId: ""
    });

    useEffect(()=> {
        dispatch(contactActions.getAllGroupsAction())
    }, []);

    const clearFields = ()=> {
        setContact({
            name: "",
            imageUrl: "",
            mobile: "",
            email: "",
            company: "",
            title: "",
            groupId: ""
        })
    };

    const checkForEmptyFields = () => {
        for (let key of Object.keys(contact)) {
            if (contact[key] === "") {
                return true;
            }
        }
        return false;
    };


    const updateUserInput = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    const submitCreateContact = (event)  => {
        event.preventDefault();
        dispatch(contactActions.createContactAction(contact)).then((response) => {
            if (response.error) {
                navigate("/contacts/add");
                ToastUtil.displayErrorToast("Contact Creation Failed");
                dispatch(clearErrorMessage());
            } else {
                navigate("/contacts/admin");
                ToastUtil.displaySuccessToast("Contact is Created");
            }
        });
    };

    let {loading, errorMessage, groups} = contactState;
    return (
        <>
            {
                loading && <Spinner/>
            }
            {
                groups.length > 0 && <>
                    <ContactHeader heading={'Add Contact'} color={'text-success'}/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <form onSubmit={e => submitCreateContact(e)}>
                                    <div className="m-2">
                                        <input
                                            value={contact.name}
                                            name={'name'}
                                            onChange={e => updateUserInput(e)}
                                            type="text" className="form-control" placeholder="Name"/>
                                    </div>
                                    <div className="m-2">
                                        <input
                                            value={contact.imageUrl}
                                            name={'imageUrl'}
                                            onChange={e => updateUserInput(e)}
                                            type="text" className="form-control" placeholder="Photo Url"/>
                                    </div>
                                    <div className="m-2">
                                        <input
                                            value={contact.mobile}
                                            name={'mobile'}
                                            onChange={e => updateUserInput(e)}
                                            type="number" className="form-control" placeholder="Mobile"/>
                                    </div>
                                    <div className="m-2">
                                        <input
                                            value={contact.email}
                                            name={'email'}
                                            onChange={e => updateUserInput(e)}
                                            type="email" className="form-control" placeholder="Email"/>
                                    </div>
                                    <div className="m-2">
                                        <input
                                            value={contact.company}
                                            name={'company'}
                                            onChange={e => updateUserInput(e)}
                                            type="text" className="form-control" placeholder="Company"/>
                                    </div>
                                    <div className="m-2">
                                        <input
                                            value={contact.title}
                                            name={'title'}
                                            onChange={e => updateUserInput(e)}
                                            type="text" className="form-control" placeholder="Title"/>
                                    </div>
                                    <div className="m-2">
                                        <select
                                            value={contact.groupId}
                                            name={'groupId'}
                                            onChange={e => updateUserInput(e)}
                                            className="form-control">
                                            <option value="">Select Group</option>
                                            {
                                                groups.map((group, index) => {
                                                    return (
                                                        <option key={index} value={group.id}>{group.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="m-2">
                                        <input disabled={checkForEmptyFields()} type="submit" className="btn btn-success"
                                               value="Create"/>
                                        <button onClick={clearFields} type="button"
                                                className="btn btn-dark ms-2">Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-3">
                                <img src={contact.imageUrl} alt="" className="img-fluid rounded-circle shadow-lg"/>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
};
export default AddContact;