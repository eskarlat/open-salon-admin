import React from "react";

//style
import "./Panel.scss";

const Panel = props => {
    return <div className="os-panel">{props.children}</div>;
};

export default Panel;
