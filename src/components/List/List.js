import React from "react";

//style
import "./List.scss";

const List = props => {
    return <div className="os-list">{props.children}</div>;
};

export default List;
