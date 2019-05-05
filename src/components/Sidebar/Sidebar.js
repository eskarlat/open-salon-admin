import React, { Component } from "react";
import { connect } from "react-redux";

//style
import "./Sidebar.scss";

//Components
import SidebarItem from "../Sidebar/SidebarItem/SidebarItem";

//icons
import SalonsIcon from "../../assets/SVG/shop.svg";
import LocationIcon from "../../assets/SVG/location.svg";
import ServicesIcon from "../../assets/SVG/colours.svg";
import MastersIcon from "../../assets/SVG/users.svg";
import ClientIcon from "../../assets/SVG/man.svg";
import ReservationIcon from "../../assets/SVG/open-book.svg";
import NoUser from "../../assets/img/no-user.jpg";

//Redux actions
import * as actions from "../../store/actions/index";

class Sidebar extends Component {
    onLogoutHandler = () => {
        this.props.onLogout();
    };

    render() {
        const sidebarItems = [
            { id: 1, title: "Salons", url: "/salons", icon: SalonsIcon },
            { id: 2, title: "Location", url: "/locations", icon: LocationIcon },
            { id: 3, title: "Services", url: "/services", icon: ServicesIcon },
            { id: 4, title: "Masters", url: "/masters", icon: MastersIcon },
            {
                id: 5,
                title: "Reservations",
                url: "/reservations",
                icon: ReservationIcon
            },
            { id: 6, title: "Clients", url: "/clients", icon: ClientIcon }
        ];
        return (
            <div className="os-sidebar">
                <div className="os-sidebar__logo">
                    <div className="logo logo--light">
                        <div className="logo__part logo__part-1" />
                        <div className="logo__part logo__part-2" />
                    </div>
                </div>
                <nav className="os-sidebar__navigation">
                    {sidebarItems.map(item => (
                        <SidebarItem key={item.id} item={item} />
                    ))}
                </nav>
                <div className="os-sidebar__profile">
                    <img
                        src={this.props.user.avatar || NoUser}
                        alt="Profile"
                        className="os-sidebar__profile--avatar"
                    />
                    <span className="os-sidebar__profile--name">
                        {this.props.user.name}
                    </span>
                </div>
                <button
                    className="os-sidebar__logout-btn"
                    onClick={this.onLogoutHandler}
                >
                    Logout
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
