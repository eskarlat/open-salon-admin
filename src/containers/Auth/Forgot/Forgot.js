import React, { Component } from "react";
import { connect } from "react-redux";
import "./Forgot.scss";

//Components
import Form from "../../../components/Form/Form";

//Util
import { updateObject, validation, updateForm } from "../../../shared/utility";

//Redux actions
import * as actions from "../../../store/actions/index";

class Forgot extends Component {
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
            }
        },
        formIsValid: false
    };

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

        this.props.onForgetPassword(formData.email);
    };

    onBackPage = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <React.Fragment>
                {!this.props.forgotPasswordSuccess && (
                    <React.Fragment>
                        <p className="paragraph">
                            Forgot your password? Enter your email address and
                            we'll email you a link you can use to reset your
                            password.
                        </p>
                        <Form
                            form={this.state.form}
                            onChange={this.inputChangedHandler}
                        />
                        <button
                            className="btn btn--primary"
                            disabled={!this.state.formIsValid}
                            onClick={this.onSubmitHandler}
                        >
                            Email reset code
                        </button>
                        <button
                            className="btn btn--link"
                            onClick={this.onBackPage}
                        >
                            Or, try logging in again.
                        </button>
                    </React.Fragment>
                )}
                {this.props.forgotPasswordSuccess && (
                    <div className="os-box">
                        <div className="os-box__text">
                            <span>
                                Reset link has been sent. Check your email
                            </span>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        forgotPasswordSuccess: state.auth.forgotPasswordSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onForgetPassword: email => dispatch(actions.forgotPassword(email))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forgot);
