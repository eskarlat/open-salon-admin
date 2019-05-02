import React from "react";

//style
import "./ContentFilter.scss";

const ContentFilter = props => {
    const filterHandler = event => {
        props.onFilter(event.target.value);
    };

    return (
        <input
            type="search"
            placeholder="Type to filter"
            className="os-content-filter__input"
            onChange={filterHandler}
        />
    );
};

export default ContentFilter;
