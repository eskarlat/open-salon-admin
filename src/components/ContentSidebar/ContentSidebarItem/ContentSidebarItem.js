import React from "react";

//style
import "./ContentSidebarItem.scss";

const ContentSidebarItem = props => {
    return (
        <figure
            className="os-content-sidebar__item"
            onClick={event => props.clicked(event, props.id)}
        >
            {props.image && (
                <img
                    className="os-content-sidebar__item--image"
                    src={props.image}
                    alt={props.title}
                />
            )}
            <figcaption className="os-content-sidebar__item--box">
                <span className="os-content-sidebar__item--text">
                    {props.title}
                </span>
                <span className="os-content-sidebar__item--sub-text">
                    {props.desc}
                </span>
                {!props.hideBtn && (
                    <div className="os-content-sidebar__item--buttons">
                        <button
                            className="os-content-sidebar__item--button"
                            onClick={event => props.onEdit(event, props.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="os-content-sidebar__item--button"
                            onClick={event => props.onDelete(event, props.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </figcaption>
        </figure>
    );
};

export default ContentSidebarItem;
