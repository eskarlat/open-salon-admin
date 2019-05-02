import React from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

//Components
import Basic from "./layouts/Basic/Basic";
import ContentLayout from "./layouts/Content/Content";

//Containers
import SalonsContainer from "./containers/Salons/Salons";
import LocationsContainer from "./containers/Locations/Locations";

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
        </React.Fragment>
    );

    return (
        <Basic>
            <ContentLayout>{routers}</ContentLayout>
        </Basic>
    );
}

export default App;
