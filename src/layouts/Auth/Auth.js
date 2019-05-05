import React, { Component } from "react";
import { connect } from "react-redux";

//style
import "./Auth.scss";

//Components
import Alert from "../../components/UI/Alert/Alert";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";

//Redux actions
import * as actions from "../../store/actions/index";

class Auth extends Component {
    state = {
        alertShown: false
    };

    componentWillReceiveProps(nextProps) {
        console.log(1);
        if (!this.state.alertShown && nextProps.error) {
            this.setState({ alertShown: true });
        }
    }

    componentWillUpdate() {
        console.log("update");
    }

    onCloseAlertHandler = () => {
        this.setState({ alertShown: false });
        this.props.onResetError();
    };

    render() {
        return (
            <React.Fragment>
                <ProgressBar loading={this.props.isLoading} />
                <div className="os-auth-layout">
                    <section className="section-signin">
                        <header className="header">
                            <div className="header__brand">
                                <div className="logo">
                                    <div className="logo__part logo__part-1" />
                                    <div className="logo__part logo__part-2" />
                                </div>
                                <span>OpenSalon</span>
                            </div>
                        </header>
                        {this.state.alertShown && (
                            <Alert
                                type="danger"
                                closed={this.onCloseAlertHandler}
                            >
                                {this.props.error}
                            </Alert>
                        )}
                        {this.props.children}
                    </section>
                    <footer className="footer-signin">
                        <ul className="footer__list">
                            <li className="footer__list-item">
                                <a href="#">Home</a>
                            </li>
                            <li className="footer__list-item">
                                <a href="#">Privacy</a>
                            </li>
                            <li className="footer__list-item">
                                <a href="#">Terms </a>
                            </li>
                            <li className="footer__list-item">
                                <a href="#">Security </a>
                            </li>
                            <li className="footer__list-item">
                                <a href="#">Contact </a>
                            </li>
                            <li className="footer__list-item">
                                <a href="#">Your Cookies </a>
                            </li>
                        </ul>
                        <div className="footer__legacy">
                            <div className="footer__legacy-version">
                                &alpha; 0.0.0.1
                            </div>
                            <div className="footer__legacy-copyright">
                                &copy; 2019 OpenSalon, Evgeny Skarlat. All right
                                reserved.
                            </div>
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isLoading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetError: () => dispatch(actions.resetError())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
