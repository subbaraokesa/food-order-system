import React, {useEffect, useState} from 'react';
import * as contactActions from './redux/contact.action';
import * as contactReducer from './redux/contact.reducer';
import {RootState, useAppDispatch} from "./redux/store";
import {useSelector} from "react-redux";
import {DashboardService} from "./services/DashboardService";
import Spinner from "../ui/Spinner";


let ContactDashboard = () => {
    const dispatch = useAppDispatch();

    let [dashboardContacts, setDashboardContacts] = useState<[]>([]);

    // get redux state
    const contactState = useSelector((state) => {
        return state[contactReducer.contactFeatureKey];
    });

    useEffect(() => {
        dispatch(contactActions.getAllContactsAction());
    }, []);

    const calculateDashboardContacts = () => {
        let colleagueCount = 0;
        let friendCount = 0;
        let familyCount = 0;
        let serviceCount = 0;
        let communityCount = 0;
        let socialCount = 0;

        let tempDashboardContacts = DashboardService.getAllDashboardContacts();
        for (let contact of contactState.contacts) {
            switch (contact.groupId) {
                case "1":
                    colleagueCount++;
                    tempDashboardContacts.splice(0, 1, {...tempDashboardContacts[0], count: colleagueCount})
                    break;
                case "2":
                    friendCount++;
                    tempDashboardContacts.splice(1, 1, {...tempDashboardContacts[1], count: friendCount})
                    break;
                case "3":
                    familyCount++;
                    tempDashboardContacts.splice(2, 1, {...tempDashboardContacts[2], count: familyCount})
                    break;
                case "4":
                    serviceCount++;
                    tempDashboardContacts.splice(3, 1, {...tempDashboardContacts[3], count: serviceCount})
                    break;
                case "5":
                    communityCount++;
                    tempDashboardContacts.splice(4, 1, {...tempDashboardContacts[4], count: communityCount})
                    break;
                case "6":
                    socialCount++;
                    tempDashboardContacts.splice(5, 1, {...tempDashboardContacts[5], count: socialCount})
                    break;
            }

        }
        setDashboardContacts(tempDashboardContacts);
    };

    useEffect(() => {
        if (contactState.contacts.length > 0) {
            calculateDashboardContacts();
        }
    }, [contactState.contacts]);

    let {loading} = contactState;

    return (
        <>
            {
                loading && <Spinner/>
            }
            <div className="container mt-4">
                <div className="row">
                    {
                        dashboardContacts.map((contact, index) => {
                            return (
                                <div className="col-sm-6" key={index}>
                                    <div className="card shadow-lg mt-3">
                                        <div className={`card-body ${contact.color} text-center`}>
                                            <div className="row justify-content-between">
                                                <div className="col-sm-3 text-center">
                                                    <i className={`bi ${contact.icon}`} style={{fontSize: "100px"}}></i>
                                                </div>
                                                <div className="col-sm-8">
                                                    <p className="display-1">{contact.count}</p>
                                                    <p className="fw-bold">{contact.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
};
export default ContactDashboard;