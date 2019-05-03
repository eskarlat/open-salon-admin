import React, { Component } from "react";

//style
import "./ContentSidebar.scss";

//Components
import Filter from "../ContentFilter/ContentFilter";
import List from "../List/List";

class ContentSidebar extends Component {
    render() {
        return (
            <div className="os-content-sidebar">
                <List>
                    <div className="os-content-sidebar__header">
                        <h2 className="heading-secondary">
                            {this.props.title}
                        </h2>
                        <div className="os-content-sidebar__header--actions">
                            {!this.props.hideBtn && (
                                <button
                                    className="btn btn--green"
                                    onClick={this.props.onCreate}
                                >
                                    New
                                </button>
                            )}
                        </div>
                    </div>
                    <Filter onFilter={this.props.onFilter} />
                    {this.props.children}
                </List>
            </div>
        );
    }
}

export default ContentSidebar;
