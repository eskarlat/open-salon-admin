import React from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

//Components
import Basic from "./layouts/Basic/Basic";
import ContentLayout from "./layouts/Content/Content";

//Containers
import SalonsContainer from "./containers/Salons/Salons";
import LocationsContainer from "./containers/Locations/Locations";
import ServicesContainer from "./containers/Services/Services";
import MastersContainer from "./containers/Masters/Masters";
import ReservationsContainer from "./containers/Reservations/Reservations";
import ClientsContainer from "./containers/Clients/Clients";

function App() {
    let routers = (
        <React.Fragment>
            <Switch>
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
            </Switch>
            <Switch>
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
                <Route path="/locations" exact component={LocationsContainer} />
            </Switch>
            <Switch>
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
                <Route path="/services" exact component={ServicesContainer} />
            </Switch>
            <Switch>
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
            </Switch>
            <Switch>
                <Route
                    path="/reservations"
                    exact
                    component={ReservationsContainer}
                />
            </Switch>
            <Switch>
                <Route path="/clients" exact component={ClientsContainer} />
            </Switch>
        </React.Fragment>
    );

    return (
        <Basic>
            <ContentLayout>{routers}</ContentLayout>
        </Basic>
    );
}

export default App;
