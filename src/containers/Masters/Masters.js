import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

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

const SERVICES_ACTIONS = {
    index: "INDEX",
    create: "CREATE",
    edit: "EDIT",
    delete: "DELETE"
};

class Masters extends Component {
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
            location: {
                elementType: "select",
                elementConfig: {
                    name: "locationId",
                    autoFocus: true
                },
                label: "Location",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                options: [],
                valid: false,
                touched: false
            },
            firstName: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "firstName",
                    placeholder: "Enter name",
                    autoFocus: true
                },
                label: "Name",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                valid: false,
                touched: false
            },
            description: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "description"
                },
                label: "Description",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            avatar: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "cost"
                },
                label: "Avatar",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            instagram: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "cost"
                },
                label: "Instagram",
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
        action: SERVICES_ACTIONS.index,
        selectedItem: null,
        modalShown: false
    };

    componentDidMount() {
        const owner = "5cbefd480a9d662b3c917583";
        this.props.fetchMasters(owner);
        this.props.fetchLocations(owner);
        this.props.fetchSalons(owner);
    }

    componentDidUpdate() {
        const {
            match: { params }
        } = this.props;

        const currentAction = SERVICES_ACTIONS[params.action];
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
            this.state.action === SERVICES_ACTIONS.create
        ) {
            this.props.masters.map(master => {
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

        if (nextProps.locations) {
            const updateForm = this.state.form;

            updateForm.location.options = nextProps.locations.map(location => {
                const l = _.pick(location, ["_id", "address"]);
                return {
                    value: l._id,
                    title: l.address
                };
            });

            this.setState({ form: updateForm });
        }
    }

    onProvideContent = (action, masterId = null) => {
        switch (action) {
            case SERVICES_ACTIONS.create:
                this.props.masters.map(master => {
                    const updateForm = this.state.form;

                    for (let field in updateForm) {
                        updateForm[field].value = "";
                    }

                    this.setState({ form: updateForm, formIsValid: false });
                });
                break;
            case SERVICES_ACTIONS.edit:
                this.props.masters.map(master => {
                    if (master._id === masterId) {
                        const updateForm = this.state.form;

                        for (let field in updateForm) {
                            updateForm[field].value = master[field];
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
        let filteredItems = this.props.masters;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.firstName.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onCreateHandler = event => {
        this.props.history.push("/masters/create");
        this.onProvideContent(SERVICES_ACTIONS.create);
        this.setState({ action: SERVICES_ACTIONS.create });
    };

    onEditHandler = (event, masterId) => {
        this.props.history.push(`/masters/edit/${masterId}`);
        this.onProvideContent(SERVICES_ACTIONS.edit, masterId);
        this.setState({
            action: SERVICES_ACTIONS.edit,
            selectedItem: masterId
        });
    };

    onDeleteHandler = (event, masterId) => {
        this.setState({ selectedItem: masterId, modalShown: true });
    };

    onAlertCloseHandler = () => {
        // this.setState
    };

    onModalConfirm = () => {
        const owner = "5cbefd480a9d662b3c917583";
        const masterId = this.state.selectedItem;
        this.props.deleteMaster(owner, masterId);
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
            case SERVICES_ACTIONS.create:
                this.props.createMaster(owner, {
                    master: formData
                });
                break;
            case SERVICES_ACTIONS.edit:
                const masterId = this.state.selectedItem;
                this.props.updateMaster(owner, {
                    masterId: masterId,
                    master: formData
                });
                break;
            default:
                break;
        }
    };

    render() {
        let masters = null;

        if (this.state.filteredItems.length > 0) {
            masters = this.state.filteredItems;
        } else {
            masters = this.props.masters;
        }

        const title =
            this.state.action === SERVICES_ACTIONS.edit
                ? "Edit"
                : this.state.action === SERVICES_ACTIONS.create
                ? "Create"
                : null;

        return (
            <React.Fragment>
                <ContentSidebar
                    onFilter={this.filterHandler}
                    title={"Masters"}
                    onCreate={this.onCreateHandler}
                >
                    {masters.map(master => (
                        <ContentSidebarItem
                            key={master._id}
                            title={master.firstName}
                            image={master.avatar}
                            desc={master.description}
                            id={master._id}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title={title}>
                    {this.props.isSuccess && (
                        <Alert closed={this.onAlertCloseHandler}>
                            Master has been updated.
                        </Alert>
                    )}
                    <Panel>
                        {(this.state.action === SERVICES_ACTIONS.edit ||
                            this.state.action === SERVICES_ACTIONS.create) && (
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
        isSuccess: state.mas.isSuccess,
        salons: state.sal.salons,
        locations: state.loc.locations,
        masters: state.mas.masters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSalons: ownerId => dispatch(actions.fetchSalons(ownerId)),
        fetchLocations: ownerId => dispatch(actions.fetchLocations(ownerId)),
        fetchMasters: ownerId => dispatch(actions.fetchMasters(ownerId)),
        createMaster: (ownerId, masterData) =>
            dispatch(actions.createMaster(ownerId, masterData)),
        updateMaster: (ownerId, masterData) =>
            dispatch(actions.updateMaster(ownerId, masterData)),
        deleteMaster: (ownerId, masterId) =>
            dispatch(actions.deleteMaster(ownerId, masterId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Masters);
