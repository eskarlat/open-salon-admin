import React from "react";

//style
import "./ContentFilter.scss";

import magnifyingGlass from "../../assets/SVG/magnifying-glass.svg";

const ContentFilter = props => {
    const filterHandler = event => {
        props.onFilter(event.target.value);
    };

    return (
        <div className="os-content-filter">
            <input
                type="search"
                placeholder="Filter"
                className="os-content-filter__input"
                onChange={filterHandler}
            />
            <img
                src={magnifyingGlass}
                alt="search"
                className="os-content-filter__icon"
            />
        </div>
    );
};

export default ContentFilter;
