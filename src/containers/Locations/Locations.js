import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

//Components
import ContentSidebarItem from "../../components/ContentSidebar/ContentSidebarItem/ContentSidebarItem";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar";
import ContentMain from "../../components/ContentMain/ContentMain";
import Panel from "../../components/ContentMain/Panel/Panel";
import Form from "../../components/Form/Form";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal";

//Util
import { updateObject, validation, updateForm } from "../../shared/utility";

//Redux actions
import * as actions from "../../store/actions/index";
import Alert from "../../components/ContentMain/Alert/Alert";

const LOCATIONS_ACTIONS = {
    index: "INDEX",
    create: "CREATE",
    edit: "EDIT",
    delete: "DELETE"
};

class Location extends Component {
    state = {
        form: {
            salon: {
                elementType: "select",
                elementConfig: {
                    name: "salonId",
                    autoFocus: true
                },
                label: "Salon",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                options: [],
                valid: false,
                touched: false
            },
            address: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "address",
                    placeholder: "Enter address",
                    autoFocus: true
                },
                label: "Address",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                valid: false,
                touched: false
            },
            open: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "open"
                },
                label: "Open time",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            close: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "close"
                },
                label: "Close time",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            reservationTimePeriod: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "close"
                },
                label: "Reservation time period",
                value: "15",
                validation: validation({
                    required: true
                }),
                valid: true,
                touched: false
            }
        },
        filteredItems: [],
        formIsValid: false,
        action: LOCATIONS_ACTIONS.index,
        selectedItem: null,
        modalShown: false
    };

    componentDidMount() {
        const token = this.props.token;
        this.props.fetchLocations(token);
        this.props.fetchSalons(token);
    }

    componentDidUpdate() {
        const {
            match: { params }
        } = this.props;

        const currentAction = LOCATIONS_ACTIONS[params.action];
        const selectedItem = params.item;

        if (
            this.state.selectedItem !== selectedItem &&
            this.state.action !== currentAction
        ) {
            if (selectedItem) {
                this.setState({ selectedItem: params.item });
            }

            if (currentAction) {
                this.setState({ action: currentAction });
                this.onProvideContent(currentAction, selectedItem);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.isSuccess &&
            this.state.action === LOCATIONS_ACTIONS.create
        ) {
            this.props.locations.map(location => {
                const updateForm = this.state.form;

                for (let field in updateForm) {
                    updateForm[field].value = "";
                }

                this.setState({ form: updateForm, formIsValid: false });
            });
        }

        if (nextProps.salons) {
            const updateForm = this.state.form;

            updateForm.salon.options = nextProps.salons.map(salon => {
                const s = _.pick(salon, ["_id", "title"]);
                return {
                    value: s._id,
                    title: s.title
                };
            });

            this.setState({ form: updateForm });
        }
    }

    onProvideContent = (action, locationId = null) => {
        switch (action) {
            case LOCATIONS_ACTIONS.create:
                this.props.locations.map(location => {
                    const updateForm = this.state.form;

                    for (let field in updateForm) {
                        updateForm[field].value = "";
                    }

                    this.setState({ form: updateForm, formIsValid: false });
                });
                break;
            case LOCATIONS_ACTIONS.edit:
                this.props.locations.map(location => {
                    if (location._id === locationId) {
                        const updateForm = this.state.form;

                        for (let field in updateForm) {
                            updateForm[field].value = location[field];
                            updateForm[field].valid = true;
                        }

                        this.setState({ form: updateForm, formIsValid: true });
                    }
                });
                break;
            default:
                break;
        }
    };

    inputChangedHandler = (event, inputId) => {
        const { updatedForm, formIsValid } = updateForm({
            form: this.state.form,
            event,
            inputId
        });

        this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    filterHandler = filterString => {
        let filteredItems = this.props.locations;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.address.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onCreateHandler = event => {
        this.props.history.push("/locations/create");
        this.onProvideContent(LOCATIONS_ACTIONS.create);
        this.setState({ action: LOCATIONS_ACTIONS.create });
    };

    onEditHandler = (event, locationId) => {
        this.props.history.push(`/locations/edit/${locationId}`);
        this.onProvideContent(LOCATIONS_ACTIONS.edit, locationId);
        this.setState({
            action: LOCATIONS_ACTIONS.edit,
            selectedItem: locationId
        });
    };

    onDeleteHandler = (event, locationId) => {
        this.setState({ selectedItem: locationId, modalShown: true });
    };

    onAlertCloseHandler = () => {
        // this.setState
    };

    onModalConfirm = () => {
        const token = this.props.token;
        const locationId = this.state.selectedItem;
        this.props.deleteLocation(token, locationId);
        this.onModalClose();
    };

    onModalClose = () => {
        this.setState({ modalShown: false });
    };

    onSubmitHandler = () => {
        const token = this.props.token;
        const formData = {};

        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }

        switch (this.state.action) {
            case LOCATIONS_ACTIONS.create:
                this.props.createLocation(token, {
                    location: formData
                });
                break;
            case LOCATIONS_ACTIONS.edit:
                const locationId = this.state.selectedItem;
                this.props.updateLocation(token, {
                    locationId,
                    location: formData
                });
                break;
            default:
                break;
        }
    };

    render() {
        let locations = null;

        if (this.state.filteredItems.length > 0) {
            locations = this.state.filteredItems;
        } else {
            locations = this.props.locations;
        }

        const title =
            this.state.action === LOCATIONS_ACTIONS.edit
                ? "Edit"
                : this.state.action === LOCATIONS_ACTIONS.create
                ? "Create"
                : null;

        return (
            <React.Fragment>
                <ContentSidebar
                    onFilter={this.filterHandler}
                    title={"Locations"}
                    onCreate={this.onCreateHandler}
                >
                    {locations.map(location => (
                        <ContentSidebarItem
                            key={location._id}
                            title={location.address}
                            id={location._id}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title={title}>
                    {this.props.isSuccess && (
                        <Alert closed={this.onAlertCloseHandler}>
                            Location has been updated.
                        </Alert>
                    )}
                    <Panel>
                        {(this.state.action === LOCATIONS_ACTIONS.edit ||
                            this.state.action === LOCATIONS_ACTIONS.create) && (
                            <React.Fragment>
                                <Form
                                    form={this.state.form}
                                    onChange={this.inputChangedHandler}
                                />
                                <button
                                    className="btn btn--primary"
                                    onClick={this.onSubmitHandler}
                                    disabled={!this.state.formIsValid}
                                >
                                    Create
                                </button>
                            </React.Fragment>
                        )}
                    </Panel>
                </ContentMain>
                {this.state.modalShown && (
                    <DeleteModal
                        clicked={this.onModalConfirm}
                        closed={this.onModalClose}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSuccess: state.loc.isSuccess,
        salons: state.sal.salons,
        locations: state.loc.locations,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSalons: token => dispatch(actions.fetchSalons(token)),
        fetchLocations: token => dispatch(actions.fetchLocations(token)),
        createLocation: (token, locationData) =>
            dispatch(actions.createLocation(token, locationData)),
        updateLocation: (token, locationData) =>
            dispatch(actions.updateLocation(token, locationData)),
        deleteLocation: (token, locationId) =>
            dispatch(actions.deleteLocation(token, locationId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Location);
