import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Form from "../../../components/Form/Form";

import "./ResetPassword.scss";

//Util
import { updateObject, validation, updateForm } from "../../../shared/utility";

//Redux actions
import * as actions from "../../../store/actions/index";

//Layout
import AuthLayout from "../../../layouts/Auth/Auth";

class ResetPassword extends Component {
    state = {
        form: {
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    name: "password",
                    placeholder: "*****",
                    autoFocus: true
                },
                label: "New password",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        rememberToken: null
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirect) {
            this.onLoginPage();
        }
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        this.setState({ rememberToken: params.remember_token });
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

        this.props.onResetPassword(formData, this.state.rememberToken);
    };

    onLoginPage = () => {
        this.props.history.replace("/login");
    };

    render() {
        return (
            <AuthLayout>
                {!this.props.resetPasswordSuccess && (
                    <React.Fragment>
                        <Form
                            form={this.state.form}
                            onChange={this.inputChangedHandler}
                        />
                        <button
                            className="os-btn os-btn--primary"
                            disabled={!this.state.formIsValid}
                            onClick={this.onSubmitHandler}
                        >
                            Reset
                        </button>
                        <button
                            className="os-btn os-btn--link"
                            onClick={this.onLoginPage}
                        >
                            Or, try logging in again.
                        </button>
                    </React.Fragment>
                )}

                {this.props.resetPasswordSuccess && (
                    <div className="os-box">
                        <div className="os-box__text">
                            <span>Password has benn updated successful</span>
                        </div>
                        <div className="os-box__buttons">
                            <button
                                className="btn btn--primary"
                                onClick={this.onLoginPage}
                            >
                                Try logging
                            </button>
                        </div>
                    </div>
                )}
            </AuthLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.auth.redirect,
        resetPasswordSuccess: state.auth.resetPasswordSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (formData, rememberToken) =>
            dispatch(actions.resetPassword(formData, rememberToken))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
