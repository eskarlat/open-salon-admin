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

class Services extends Component {
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
            title: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "title",
                    placeholder: "Enter title",
                    autoFocus: true
                },
                label: "Title",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                valid: false,
                touched: false
            },
            duration: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "duration"
                },
                label: "Duration",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            cost: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "cost"
                },
                label: "Cost",
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
        this.props.fetchServices(owner);
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
            this.props.services.map(service => {
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

    onProvideContent = (action, serviceId = null) => {
        switch (action) {
            case SERVICES_ACTIONS.create:
                this.props.services.map(service => {
                    const updateForm = this.state.form;

                    for (let field in updateForm) {
                        updateForm[field].value = "";
                    }

                    this.setState({ form: updateForm, formIsValid: false });
                });
                break;
            case SERVICES_ACTIONS.edit:
                this.props.services.map(service => {
                    if (service._id === serviceId) {
                        const updateForm = this.state.form;

                        for (let field in updateForm) {
                            updateForm[field].value = service[field];
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
        let filteredItems = this.props.services;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.title.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onCreateHandler = event => {
        this.props.history.push("/services/create");
        this.onProvideContent(SERVICES_ACTIONS.create);
        this.setState({ action: SERVICES_ACTIONS.create });
    };

    onEditHandler = (event, serviceId) => {
        this.props.history.push(`/services/edit/${serviceId}`);
        this.onProvideContent(SERVICES_ACTIONS.edit, serviceId);
        this.setState({
            action: SERVICES_ACTIONS.edit,
            selectedItem: serviceId
        });
    };

    onDeleteHandler = (event, serviceId) => {
        this.setState({ selectedItem: serviceId, modalShown: true });
    };

    onAlertCloseHandler = () => {
        // this.setState
    };

    onModalConfirm = () => {
        const owner = "5cbefd480a9d662b3c917583";
        const serviceId = this.state.selectedItem;
        this.props.deleteService(owner, serviceId);
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
                this.props.createService(owner, {
                    service: formData
                });
                break;
            case SERVICES_ACTIONS.edit:
                const serviceId = this.state.selectedItem;
                this.props.updateService(owner, {
                    serviceId: serviceId,
                    service: formData
                });
                break;
            default:
                break;
        }
    };

    render() {
        let services = null;

        if (this.state.filteredItems.length > 0) {
            services = this.state.filteredItems;
        } else {
            services = this.props.services;
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
                    title={"Services"}
                    onCreate={this.onCreateHandler}
                >
                    {services.map(service => (
                        <ContentSidebarItem
                            key={service._id}
                            title={service.title}
                            id={service._id}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title={title}>
                    {this.props.isSuccess && (
                        <Alert closed={this.onAlertCloseHandler}>
                            Service has been updated.
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
        isSuccess: state.ser.isSuccess,
        salons: state.sal.salons,
        services: state.ser.services
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSalons: ownerId => dispatch(actions.fetchSalons(ownerId)),
        fetchServices: ownerId => dispatch(actions.fetchServices(ownerId)),
        createService: (ownerId, serviceData) =>
            dispatch(actions.createService(ownerId, serviceData)),
        updateService: (ownerId, serviceData) =>
            dispatch(actions.updateService(ownerId, serviceData)),
        deleteService: (ownerId, serviceId) =>
            dispatch(actions.deleteService(ownerId, serviceId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
