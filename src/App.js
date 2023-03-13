import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home"
import ContactDashboard from "./components/ContactDashboard";
import AdminContact from "./components/AdminContact";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ViewContact from "./components/ViewContact";
import {ToastContainer} from "react-toastify";

let App = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="App">
                <NavBar header="Contact Manager" color="bg-dark"/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/contacts/dashboard"} element={<ContactDashboard/>}/>
                    <Route path={"/contacts/admin"} element={<AdminContact/>}/>
                    <Route path={"/contacts/add"} element={<AddContact/>}/>
                    <Route path={"/contacts/edit/:contactId"} element={<EditContact/>}/>
                    <Route path={"/contacts/view/:contactId"} element={<ViewContact/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
