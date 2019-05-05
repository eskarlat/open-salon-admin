import React, { Component } from "react";
import { connect } from "react-redux";
import "./Register.scss";

//Components
import Form from "../../../components/Form/Form";

//Util
import { updateObject, validation, updateForm } from "../../../shared/utility";

//Redux actions
import * as actions from "../../../store/actions/index";

//Layout
import AuthLayout from "../../../layouts/Auth/Auth";

class Register extends Component {
    state = {
        form: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Enter your name",
                    autoFocus: true
                },
                label: "Your name",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "example@email.com",
                    autoFocus: true
                },
                label: "Email",
                value: "",
                validation: validation({
                    required: true,
                    isEmail: true
                }),
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    name: "password",
                    placeholder: "******"
                },
                label: "Password",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    componentDidMount() {
        const queryParams = {};
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            queryParams[param[0]] = param[1];
        }

        const updateFormElement = updateObject(this.state.form.email, {
            value: queryParams.email
        });

        const updatedForm = updateObject(this.state.form, {
            email: updateFormElement
        });

        this.setState({ form: updatedForm });
    }

    inputChangedHandler = (event, inputId) => {
        const { updatedForm, formIsValid } = updateForm({
            form: this.state.form,
            event,
            inputId
        });

        this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    onSubmitHandler = () => {
        const formData = {};

        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }

        this.props.onRegister(formData);
    };

    onLoginPage = () => {
        this.props.history.push("/login");
    };

    render() {
        return (
            <AuthLayout>
                {!this.props.registerSuccess && (
                    <React.Fragment>
                        <Form
                            form={this.state.form}
                            onChange={this.inputChangedHandler}
                        />
                        <button
                            class="btn btn--primary"
                            disabled={!this.state.formIsValid}
                            onClick={this.onSubmitHandler}
                        >
                            Register
                        </button>
                        <span className="os-register-exist-text">
                            Already have an account?
                            <button
                                class="os-btn os-btn--link"
                                onClick={this.onLoginPage}
                            >
                                Login here
                            </button>
                        </span>
                    </React.Fragment>
                )}

                {this.props.registerSuccess && (
                    <div className="os-box">
                        <div className="os-box__text">
                            <span>
                                Registration wa successful! We sent actiovation
                                link to your email.
                            </span>
                        </div>
                    </div>
                )}
            </AuthLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        registerSuccess: state.auth.registerSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: formData => dispatch(actions.register(formData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
