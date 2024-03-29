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
import Alert from "../../components/UI/Alert/Alert";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal";

const SALONS_ACTIONS = {
    index: "INDEX",
    create: "CREATE",
    edit: "EDIT",
    delete: "DELETE"
};

class Salons extends Component {
    state = {
        form: {
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
            logo: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "logo"
                },
                label: "Logo",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            description: {
                elementType: "textarea",
                elementConfig: {
                    type: "email",
                    name: "description",
                    placeholder: "Enter description"
                },
                label: "Description",
                value: "",
                validation: validation({}),
                valid: false,
                touched: false
            },
            currency: {
                elementType: "select",
                elementConfig: {
                    name: "currency"
                },
                label: "Currency",
                value: "",
                validation: validation({
                    required: true
                }),
                options: [
                    { value: "BGN", title: "BGN" },
                    { value: "RUB", title: "RUB" },
                    { value: "UAH", title: "UAH" },
                    { value: "USD", title: "USD" },
                    { value: "EUR", title: "EUR" }
                ],
                valid: false,
                touched: false
            }
        },
        filteredItems: [],
        formIsValid: false,
        action: SALONS_ACTIONS.index,
        selectedItem: null,
        modalShown: false,
        widgetModalShown: false
    };

    componentDidMount() {
        this.props.fetchSalons(this.props.token);
    }

    componentDidUpdate() {
        const {
            match: { params }
        } = this.props;

        const currentAction = SALONS_ACTIONS[params.action];
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
            this.state.action === SALONS_ACTIONS.create
        ) {
            this.props.salons.map(salon => {
                const updateForm = this.state.form;

                for (let field in updateForm) {
                    updateForm[field].value = "";
                }

                this.setState({ form: updateForm, formIsValid: false });
            });
        }
    }

    onProvideContent = (action, salonId = null) => {
        switch (action) {
            case SALONS_ACTIONS.create:
                this.props.salons.map(salon => {
                    const updateForm = this.state.form;

                    for (let field in updateForm) {
                        updateForm[field].value = "";
                    }

                    this.setState({ form: updateForm, formIsValid: false });
                });
                break;
            case SALONS_ACTIONS.edit:
                this.props.salons.map(salon => {
                    if (salon._id === salonId) {
                        const updateForm = this.state.form;

                        for (let field in updateForm) {
                            updateForm[field].value = salon[field];
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
        let filteredItems = this.props.salons;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.title.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    onCreateHandler = event => {
        this.props.history.push("/salons/create");
        this.onProvideContent(SALONS_ACTIONS.create);
        this.setState({ action: SALONS_ACTIONS.create });
    };

    onEditHandler = (event, salonId) => {
        this.props.history.push(`/salons/edit/${salonId}`);
        this.onProvideContent(SALONS_ACTIONS.edit, salonId);
        this.setState({ action: SALONS_ACTIONS.edit, selectedItem: salonId });
    };

    onDeleteHandler = (event, salonId) => {
        this.setState({ selectedItem: salonId, modalShown: true });
    };

    onAlertCloseHandler = () => {
        // this.setState
    };

    onModalConfirm = () => {
        const token = this.props.token;
        const salonId = this.state.selectedItem;
        this.props.deleteSalon(token, salonId);
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
            case SALONS_ACTIONS.create:
                this.props.createSalon(token, formData);
                break;
            case SALONS_ACTIONS.edit:
                const salonId = this.state.selectedItem;
                this.props.updateSalon(token, salonId, formData);
                break;
            default:
                break;
        }
    };

    onGetWidget = (event, salonId) => {
        this.setState({ widgetModalShown: true });
        this.setState({ selectedItem: salonId });
    };

    onGetWidgetModalClose = () => {
        this.setState({ widgetModalShown: false });
        this.setState({ selectedItem: null });
    };

    render() {
        let salons = null;

        if (this.state.filteredItems.length > 0) {
            salons = this.state.filteredItems;
        } else {
            salons = this.props.salons;
        }

        const title =
            this.state.action === SALONS_ACTIONS.edit
                ? "Edit"
                : this.state.action === SALONS_ACTIONS.create
                ? "Create"
                : null;

        return (
            <React.Fragment>
                <ContentSidebar
                    onFilter={this.filterHandler}
                    title={"salons"}
                    onCreate={this.onCreateHandler}
                >
                    {salons.map(salon => (
                        <ContentSidebarItem
                            key={salon._id}
                            title={salon.title}
                            image={salon.logo}
                            id={salon._id}
                            salonPage={true}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler}
                            onGetWidget={this.onGetWidget}
                        />
                    ))}
                </ContentSidebar>

                <ContentMain title={title}>
                    {this.props.isSuccess && (
                        <Alert closed={this.onAlertCloseHandler}>
                            Salon has been updated.
                        </Alert>
                    )}
                    <Panel>
                        {(this.state.action === SALONS_ACTIONS.edit ||
                            this.state.action === SALONS_ACTIONS.create) && (
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

                {this.state.widgetModalShown && (
                    <Modal
                        title="Set widget"
                        closed={this.onGetWidgetModalClose}
                    >
                        <div className="widget__modal--text">
                            <p>
                                Copy this code and past before closing "body"
                                tag
                            </p>
                            <p>
                                Create book button just set id{" "}
                                <pre>
                                    <code>
                                        {
                                            '<button id="open-salon-book-btn">Book</button>'
                                        }
                                    </code>
                                </pre>
                            </p>
                            <textarea className="os-form--input">
                                {`<script src="https://open-salon.herokuapp.com/static/widget.js?salon=${
                                    this.state.selectedItem
                                }"></script>`}
                            </textarea>
                        </div>
                    </Modal>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSuccess: state.sal.isSuccess,
        salons: state.sal.salons,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSalons: token => dispatch(actions.fetchSalons(token)),
        createSalon: (token, salon) =>
            dispatch(actions.createSalon(token, salon)),
        updateSalon: (token, salonId, salon) =>
            dispatch(actions.updateSalon(token, salonId, salon)),
        deleteSalon: (token, salonId) =>
            dispatch(actions.deleteSalon(token, salonId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Salons);
