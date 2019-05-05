import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

//Components
import ContentSidebarItem from "../../components/ContentSidebar/ContentSidebarItem/ContentSidebarItem";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar";
import ContentMain from "../../components/ContentMain/ContentMain";
import Panel from "../../components/ContentMain/Panel/Panel";
import ReservationTable from "../../components/ReservationTable/ReservationTable";

//Redux actions
import * as actions from "../../store/actions/index";

class Reservations extends Component {
    state = {
        selectedMaster: null,
        currentDate: moment(),
        filteredItems: []
    };

    componentDidMount() {
        this.props.fetchMasters(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.masters && this.props.reservations.length === 0) {
            const masterId =
                nextProps.masters.length > 0 ? nextProps.masters[0]._id : null;
            this.onUpdateReservationTable(masterId);
            this.setState({ selectedMaster: masterId });
        }
    }

    onUpdateReservationTable = (masterId = this.state.selectedMaster) => {
        this.props.fetchReservations(
            this.props.token,
            masterId,
            this.state.currentDate.format("YYYY-MM-DD")
        );
    };

    filterHandler = filterString => {
        let filteredItems = this.props.masters;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.firstName.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onClickHandler = (event, masterId) => {
        this.setState({ selectedMaster: masterId });
        this.onUpdateReservationTable(masterId);
    };

    onNextDayHandler = () => {
        const updatedCurrentDate = this.state.currentDate;
        updatedCurrentDate.add(1, "days");
        this.setState({ currentDate: updatedCurrentDate });
        this.onUpdateReservationTable();
    };

    onPrevDayHandler = () => {
        const updatedCurrentDate = this.state.currentDate;
        updatedCurrentDate.subtract(1, "days");
        this.setState({ currentDate: updatedCurrentDate });
        this.onUpdateReservationTable();
    };

    render() {
        let masters = null;

        if (this.state.filteredItems.length > 0) {
            masters = this.state.filteredItems;
        } else {
            masters = this.props.masters;
        }

        return (
            <React.Fragment>
                <ContentSidebar
                    onFilter={this.filterHandler}
                    title={"Masters"}
                    hideBtn={true}
                >
                    {masters.map(master => (
                        <ContentSidebarItem
                            key={master._id}
                            title={master.firstName}
                            image={master.avatar}
                            id={master._id}
                            desc={master.description}
                            hideBtn={true}
                            clicked={this.onClickHandler}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title="Reservations">
                    <Panel>
                        <ReservationTable
                            reservations={this.props.reservations}
                            onNextDay={this.onNextDayHandler}
                            onPrevDay={this.onPrevDayHandler}
                        />
                    </Panel>
                </ContentMain>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        masters: state.mas.masters,
        reservations: state.res.reservations,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMasters: token => dispatch(actions.fetchMasters(token)),
        fetchReservations: (token, masterId, date) =>
            dispatch(actions.fetchReservations(token, masterId, date))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reservations);
