import React, {useEffect, useState} from 'react';
import ContactHeader from "./components/ContactHeader";
import {Link, useParams, useNavigate} from "react-router-dom";
import Spinner from "../ui/Spinner";
import {ToastUtil} from "./util/ToastUtil";
import * as contactActions from './redux/contact.actions';
import {RootState, useAppDispatch} from "./redux/store";
import * as contactReducer from './redux/contact.reducer';
import {useSelector} from "react-redux";
import {clearErrorMessage} from "./redux/contact.reducer";

let EditContact= () => {
    let {contactId} = useParams();
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    // get data from redux store
    const contactState = useSelector((state) => {
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

    useEffect(() => {
        setContact({
            ...contact,
            name: contactState.contact.name !== "" ? contactState.contact.name : "",
            imageUrl: contactState.contact.imageUrl !== "" ? contactState.contact.imageUrl : "",
            mobile: contactState.contact.mobile !== "" ? contactState.contact.mobile : "",
            email: contactState.contact.email !== "" ? contactState.contact.email : "",
            company: contactState.contact.company !== "" ? contactState.contact.company : "",
            title: contactState.contact.title !== "" ? contactState.contact.title : "",
            groupId: contactState.contact.groupId !== "" ? contactState.contact.groupId : "",
        })
    }, [contactState.contact])

    useEffect(() => {
        dispatch(contactActions.getAllGroupsAction());
    }, []);

    useEffect(()=> {
        if (contactId) {
            dispatch(contactActions.getContactAction(contactId));
        }
    }, [contactId]);

    const updateUserInput = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    const submitUpdateContact = (event) => {
        event.preventDefault();
        if (contactId) {
            dispatch(contactActions.updateContactAction({contact, contactId})).then((response) => {
                if (response.error) { // error
                    navigate(`/contacts/edit/${contactId}`);
                    ToastUtil.displayErrorToast("Contact Update is Failed");
                    dispatch(clearErrorMessage());
                } else { // success
                    navigate("/contacts/admin");
                    ToastUtil.displaySuccessToast("Contact is Updated");
                }
            });
        }
    };

    let {loading, groups} = contactState;
    return (
        <>
            {
                loading && <Spinner/>
            }
            {
                Object.keys(contact).length > 0 && <>
                    <ContactHeader heading={'Edit Contact'} color={'text-primary'}/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <form onSubmit={e => submitUpdateContact(e)}>
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
                                        <input type="submit" className="btn btn-primary" value="Update"/>
                                        <Link to={'/contacts/admin'} className="btn btn-dark ms-2">Cancel</Link>
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
export default EditContact;