import React, { Component } from "react";

//style
import "./Basic.scss";

//Components
import Sidebar from "../../components/Sidebar/Sidebar";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";

class Basic extends Component {
    render() {
        return (
            <div className="os-app">
                <ProgressBar />
                <Sidebar />
                {this.props.children}
            </div>
        );
    }
}

export default Basic;
