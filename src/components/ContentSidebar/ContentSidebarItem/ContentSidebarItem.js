import React from "react";

//style
import "./ContentSidebarItem.scss";

const ContentSidebarItem = props => {
    return (
        <figure className="os-content-sidebar__item">
            <img
                className="os-content-sidebar__item--image"
                src={props.item.logo}
                alt={props.item.title}
            />
            <figcaption className="os-content-sidebar__item--box">
                <span className="os-content-sidebar__item--text">
                    {props.item.title}
                </span>
                <div className="os-content-sidebar__item--buttons">
                    <button
                        className="os-content-sidebar__item--button"
                        onClick={event => props.onEdit(event, props.item._id)}
                    >
                        Edit
                    </button>
                    <button
                        className="os-content-sidebar__item--button"
                        onClick={event => props.onDelete(event, props.item._id)}
                    >
                        Delete
                    </button>
                </div>
            </figcaption>
        </figure>
    );
};

export default ContentSidebarItem;
