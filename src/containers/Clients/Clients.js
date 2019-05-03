import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

//Components
import ContentSidebarItem from "../../components/ContentSidebar/ContentSidebarItem/ContentSidebarItem";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar";
import ContentMain from "../../components/ContentMain/ContentMain";

import NoUser from "../../assets/img/no-user.jpg";

//Redux actions
import * as actions from "../../store/actions/index";

class Clients extends Component {
    state = {
        filteredItems: []
    };

    componentDidMount() {
        const owner = "5cbefd480a9d662b3c917583";
        this.props.fetchClients(owner);
    }

    filterHandler = filterString => {
        let filteredItems = this.props.clients;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.name.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onClickHandler = () => {};

    render() {
        let clients = null;

        if (this.state.filteredItems.length > 0) {
            clients = this.state.filteredItems;
        } else {
            clients = this.props.clients;
        }

        return (
            <React.Fragment>
                <ContentSidebar
                    onFilter={this.filterHandler}
                    title={"Clients"}
                    hideBtn={true}
                >
                    {clients.map(client => (
                        <ContentSidebarItem
                            key={client._id}
                            title={client.name}
                            image={NoUser}
                            desc={client.phone}
                            id={client._id}
                            hideBtn={true}
                            clicked={this.onClickHandler}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title="" />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        clients: state.cl.clients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClients: ownerId => dispatch(actions.fetchClients(ownerId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);
