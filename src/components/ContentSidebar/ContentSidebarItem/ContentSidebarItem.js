import React from "react";

//style
import "./ContentSidebarItem.scss";

const ContentSidebarItem = props => {
    const clikced = props.hideBtn
        ? event => props.clicked(event, props.id)
        : null;
    return (
        <figure className="os-content-sidebar__item" onClick={clikced}>
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
                        {props.salonPage && (
                            <button
                                className="os-content-sidebar__item--button"
                                onClick={event =>
                                    props.onGetWidget(event, props.id)
                                }
                            >
                                Get widget
                            </button>
                        )}
                    </div>
                )}
            </figcaption>
        </figure>
    );
};

export default ContentSidebarItem;
