import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Form from "../../../components/Form/Form";

import "./Login.scss";

//Redux actions
import * as actions from "../../../store/actions/index";

//Util
import { updateObject, validation, updateForm } from "../../../shared/utility";

//Layout
import AuthLayout from "../../../layouts/Auth/Auth";

class Login extends Component {
    state = {
        form: {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuth) {
            // this.onHomePage();
        }
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

        this.props.onLogin(formData);
    };

    onRegisterPage = () => {
        this.props.history.push("/register");
    };
    onForgotPage = () => {
        this.props.history.push("/forgot");
    };

    onHomePage = () => {
        this.props.history.replace("/");
    };

    render() {
        return (
            <AuthLayout>
                <Form
                    form={this.state.form}
                    onChange={this.inputChangedHandler}
                />
                <button
                    class="os-btn os-btn--primary"
                    onClick={this.onSubmitHandler}
                    disabled={!this.state.formIsValid}
                >
                    Login
                </button>
                <button class="os-btn os-btn--link" onClick={this.onForgotPage}>
                    Forgot your password?
                </button>
                <button
                    class="os-btn os-btn--link"
                    onClick={this.onRegisterPage}
                >
                    Registration
                </button>
            </AuthLayout>
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
        onLogin: formData => dispatch(actions.login(formData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
