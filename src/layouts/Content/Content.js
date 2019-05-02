import React, { Component } from "react";

//style
import "./Content.scss";

class Content extends Component {
    render() {
        return <div className="os-content">{this.props.children}</div>;
    }
}

export default Content;
