import React from "react";
import { NavLink } from "react-router-dom";

//style
import "./SidebarItem.scss";

const SidebarItem = props => {
    return (
        <NavLink
            activeClassName="os-sidebar__item--active"
            className="os-sidebar__item"
            to={props.item.url}
        >
            <img
                className="os-sidebar__item--icon"
                src={props.item.icon}
                alt={props.item.title}
            />
            <span className="os-sidebar__item--text">{props.item.title}</span>
        </NavLink>
    );
};

export default SidebarItem;
