import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

//Components
import BasicLayout from "./layouts/Basic/Basic";
import AuthLayout from "./layouts/Auth/Auth";
import ContentLayout from "./layouts/Content/Content";

//Containers
import SalonsContainer from "./containers/Salons/Salons";
import LocationsContainer from "./containers/Locations/Locations";
import ServicesContainer from "./containers/Services/Services";
import MastersContainer from "./containers/Masters/Masters";
import ReservationsContainer from "./containers/Reservations/Reservations";
import ClientsContainer from "./containers/Clients/Clients";

//AUTH
import LoginContainer from "./containers/Auth/Login/Login";
import RegisterContainer from "./containers/Auth/Register/Register";
import ForgotContainer from "./containers/Auth/Forgot/Forgot";
import ResetPasswordContainer from "./containers/Auth/ResetPassword/ResetPassword";
import AccountActivateContainer from "./containers/Auth/AccountActivate/AccountActivate";
import HomeIndexContainer from "./containers/Home/Index/Index";
import HomeRegisterContainer from "./containers/Home/Register/Register";

//Redux actions
import * as actions from "./store/actions/index";

class App extends Component {
    componentWillMount() {
        this.props.authCheckState();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAuth && !nextProps.isAuth) {
            this.props.history.replace("/login");
        }
    }

    render() {
        let routers = (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={SalonsContainer} />
                    <Route
                        path="/salons/:action/:item"
                        exact
                        component={SalonsContainer}
                    />
                    <Route
                        path="/salons/:action"
                        exact
                        component={SalonsContainer}
                    />
                    <Route path="/salons" exact component={SalonsContainer} />
                    <Route
                        path="/locations/:action/:item"
                        exact
                        component={LocationsContainer}
                    />
                    <Route
                        path="/locations/:action"
                        exact
                        component={LocationsContainer}
                    />
                    <Route
                        path="/locations"
                        exact
                        component={LocationsContainer}
                    />
                    <Route
                        path="/services/:action/:item"
                        exact
                        component={ServicesContainer}
                    />
                    <Route
                        path="/services/:action"
                        exact
                        component={ServicesContainer}
                    />
                    <Route
                        path="/services"
                        exact
                        component={ServicesContainer}
                    />
                    <Route
                        path="/masters/:action/:item"
                        exact
                        component={MastersContainer}
                    />
                    <Route
                        path="/masters/:action"
                        exact
                        component={MastersContainer}
                    />
                    <Route path="/masters" exact component={MastersContainer} />
                    <Route
                        path="/reservations"
                        exact
                        component={ReservationsContainer}
                    />
                    <Route path="/clients" exact component={ClientsContainer} />
                    <Route render={props => <Redirect to="/" />} />
                </Switch>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                {this.props.isAuth && (
                    <BasicLayout>
                        <ContentLayout>{routers}</ContentLayout>
                    </BasicLayout>
                )}
                {!this.props.isAuth && (
                    <Switch>
                        <Route path="/" exact component={HomeIndexContainer} />
                        <Route
                            path="/try"
                            exact
                            component={HomeRegisterContainer}
                        />
                        <Route path="/login" exact component={LoginContainer} />
                        <Route
                            path="/register"
                            exact
                            component={RegisterContainer}
                        />
                        <Route
                            path="/forgot"
                            exact
                            component={ForgotContainer}
                        />
                        <Route
                            path="/reset/:remember_token"
                            exact
                            component={ResetPasswordContainer}
                        />
                        <Route
                            path="/activate/:id"
                            exact
                            component={AccountActivateContainer}
                        />
                    </Switch>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
