import React, { Component } from "react";

//style
import "./Alert.scss";

class Alert extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.closed();
        }, 2000);
    }

    render() {
        const alertClasses = {
            danger: "os-alert__danger"
        };

        const alertClass = ["os-alert", alertClasses[this.props.type]].join(
            " "
        );

        return (
            <div className={alertClass}>
                <span className="os-alert__text">{this.props.children}</span>
                <span className="os-alert__close" onClick={this.props.closed}>
                    &times;
                </span>
            </div>
        );
    }
}

export default Alert;
