import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProgressBar.scss";

class ProgressBar extends Component {
    state = {
        classItem: []
    };

    getClass() {
        return this.state.classItem.join(" ");
    }

    componentWillReceiveProps(nextProps) {
        const isLoading =
            nextProps.loadingSalons ||
            nextProps.loadingLocations ||
            nextProps.loadingServers ||
            nextProps.loadingMasters ||
            nextProps.loadingReservations ||
            nextProps.loadingClients;

        const addClass = isLoading
            ? "widget__progress-bar--start"
            : "widget__progress-bar--done";

        this.setState({ classItem: ["widget__progress-bar", addClass] });

        if (!isLoading) {
            setTimeout(() => {
                let updateClasses = this.state.classItem;

                updateClasses = updateClasses.splice(0, 1);
                this.setState({ classItem: updateClasses });
            }, 300);
        }
    }

    render() {
        return <div className={this.getClass()} />;
    }
}

const mapStateToProps = state => {
    return {
        loadingSalons: state.sal.loading,
        loadingLocations: state.loc.loading,
        loadingServers: state.ser.loading,
        loadingMasters: state.mas.loading,
        loadingReservations: state.res.loading,
        loadingClients: state.cl.loading
    };
};

export default connect(mapStateToProps)(ProgressBar);
