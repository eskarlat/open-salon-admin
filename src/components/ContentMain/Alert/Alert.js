import React from "react";

//style
import "./Alert.scss";

const Alert = props => {
    return (
        <div className="os-alert">
            <span className="os-alert__text">{props.children}</span>
            <span className="os-alert__close" onClick={props.closed}>
                &times;
            </span>
        </div>
    );
};

export default Alert;
