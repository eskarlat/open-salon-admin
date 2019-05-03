import React from "react";

import Backdrop from "./Backdrop/Backdrop";

import "./Modal.scss";

const Modal = props => {
    return (
        <React.Fragment>
            <Backdrop clicked={props.closed} />
            <div className="widget__modal">
                <div className="widget__modal--header">
                    <h4 className="widget__modal--header--text">
                        {props.title}
                    </h4>
                    <span
                        className="widget__modal--header--close"
                        onClick={props.closed}
                    >
                        &times;
                    </span>
                </div>
                <div className="widget__modal--body">{props.children}</div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
