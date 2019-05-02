import React, { Component } from "react";

//style
import "./ContentMain.scss";

//Components
import List from "../List/List";

class ContentMain extends Component {
    render() {
        return (
            <div className="os-content-main">
                <List>
                    <h1 className="heading-secondary">{this.props.title}</h1>
                    {this.props.children}
                </List>
            </div>
        );
    }
}

export default ContentMain;
