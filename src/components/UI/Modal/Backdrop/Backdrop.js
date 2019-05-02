import React from "react";

import "./Backdrop.scss";

const Backdrop = props => {
    return (
        <div className="widget__backdrop" onClick={props.clicked}>
            {props.children}
        </div>
    );
};

export default Backdrop;
