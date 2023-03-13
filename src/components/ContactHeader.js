import React from 'react';



let ContactHeader = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h3 ${props.color}`}>{props.heading}</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                            accusantium distinctio eligendi
                            expedita illo ipsa iste mollitia necessitatibus nulla odit quae quaerat quasi reprehenderit
                            sint, vel vitae, voluptatum. Maiores, unde?</p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ContactHeader;