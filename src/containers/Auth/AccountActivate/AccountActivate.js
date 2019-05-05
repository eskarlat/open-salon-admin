import React, { Component } from "react";
import { connect } from "react-redux";

import "./AccountActivate.scss";

//Redux actions
import * as actions from "../../../store/actions/index";

//Layout
import AuthLayout from "../../../layouts/Auth/Auth";

class AccountActivate extends Component {
    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        this.props.onActivate(params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirect) {
            this.onLoginPage();
        }
    }

    onLoginPage = () => {
        this.props.history.replace("/login");
    };

    render() {
        return (
            <AuthLayout>
                <div className="os-box">
                    <div className="os-box__text">
                        <span>Account has been success activated</span>
                    </div>
                    <div className="os-box__buttons">
                        <button
                            className="os-btn os-btn--primary"
                            onClick={this.onLoginPage}
                        >
                            Try logging
                        </button>
                    </div>
                </div>
            </AuthLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.auth.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onActivate: id => dispatch(actions.accountActivate(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActivate);
