import React from "react";

import Backdrop from "./Backdrop/Backdrop";

import "./Modal.scss";

const Modal = props => {
    return (
        <Backdrop clicked={props.closed}>
            <div className="widget__modal">
                <div className="widget__modal--header">
                    <h4 className="widget__modal--header--text">Delete</h4>
                    <span
                        className="widget__modal--header--close"
                        onClick={props.closed}
                    >
                        &times;
                    </span>
                </div>
                <div className="widget__modal--body">
                    <span className="widget__modal--text">Are you sure?</span>
                    <div className="widget__modal--footer">
                        <button
                            className="btn btn-primary"
                            onClick={props.clicked}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default Modal;
