import React from 'react';

interface {
    message: string | undefined;
}

let ErrorMessage = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        {props.message && <p className="text-danger">{props.message}</p>}
                    </div>
                </div>
            </div>
        </>
    )
};
export default ErrorMessage;