import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import ContentSidebarItem from "../../components/ContentSidebar/ContentSidebarItem/ContentSidebarItem";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar";
import ContentMain from "../../components/ContentMain/ContentMain";
import Panel from "../../components/ContentMain/Panel/Panel";
import Form from "../../components/Form/Form";
import Modal from "../../components/UI/Modal/Modal";

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

class Salons extends Component {
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
                    type: "number",
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
                    type: "number",
                    name: "close"
                },
                label: "Close time",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
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
        const owner = "5cbefd480a9d662b3c917583";
        this.props.fetchLocations(owner);
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
            const firstName = item.title.toLowerCase();
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
        const owner = "5cbefd480a9d662b3c917583";
        const locationId = this.state.selectedItem;
        this.props.deleteSalon(owner, locationId);
    };

    onModalClose = () => {
        this.setState({ modalShown: false });
    };

    onSubmitHandler = () => {
        const owner = "5cbefd480a9d662b3c917583";
        const formData = {};

        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }

        switch (this.state.action) {
            case LOCATIONS_ACTIONS.create:
                this.props.createLocation(owner, formData);
                break;
            case LOCATIONS_ACTIONS.edit:
                const locationId = this.state.selectedItem;
                this.props.updateLocation(owner, locationId, formData);
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
                            item={location}
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
                    <Modal
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
        isSuccess: state.sal.isSuccess,
        locations: state.loc.locations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLocations: ownerId => dispatch(actions.fetchLocations(ownerId)),
        createLocation: (owner, location) =>
            dispatch(actions.createLocation(owner, location)),
        updateLocation: (owner, locationId, location) =>
            dispatch(actions.updateLocation(owner, locationId, location)),
        deleteLocation: (owner, locationId) =>
            dispatch(actions.deleteLocation(owner, locationId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Salons);
