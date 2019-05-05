import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//style
import "./Register.scss";

//Layout

import signupBg from "../../../assets/img/signup-bg.jpg";
import user from "../../../assets/img/user-3.jpg";

class Register extends Component {
    state = {
        email: null
    };

    onInputChangeHandler = event => {
        const updateInput = event.target.value;
        this.setState({ email: updateInput });
    };

    onLoginHandler = () => {
        this.props.history.push("/login");
    };

    onTrySubmitHandler = () => {
        if (this.state.email) {
            this.props.history.push(`/register?email=${this.state.email}`);
        }
    };

    render() {
        const styleReview = {
            "background-image": `linear-gradient(rgba(0,0,0, .3), rgba(0,0,0, .3)), url(${signupBg})`
        };

        return (
            <div className="signup-wrapper">
                <section className="section-signup">
                    <header className="header">
                        <div className="header__full-box">
                            <div className="header__brand">
                                <div className="logo">
                                    <div className="logo__part logo__part-1" />
                                    <div className="logo__part logo__part-2" />
                                </div>
                                <span>OpenSalon</span>
                            </div>
                            <div className="signup-header__text">
                                <span>
                                    Already have an account?{" "}
                                    <button
                                        className="btn btn--link"
                                        onClick={this.onLoginHandler}
                                    >
                                        Signin here
                                    </button>
                                </span>
                            </div>
                        </div>
                    </header>
                    <main className="signup-content">
                        <h1 className="heading-secondary">
                            Start your free trial
                        </h1>
                        <p className="paragraph u-margin-bottom-small">
                            Sign up and bring your team together on OpenSalon.
                            Free for 14 days.
                        </p>
                        <div className="os-form--group u-margin-bottom-small">
                            <label className="os-form--label" for="email-input">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="Your work email"
                                id="email-input"
                                className="os-form--input"
                                onChange={event =>
                                    this.onInputChangeHandler(event)
                                }
                            />
                        </div>
                        <button
                            className="os-btn os-btn--primary"
                            onClick={this.onTrySubmitHandler}
                        >
                            Try now
                        </button>
                    </main>
                    <span className="signup-terms">
                        By clicking the button, you agree to our{" "}
                        <a href="#">Terms of Service</a> and have read and
                        acknowledge our <a href="#">PrivacyPolicy</a>.
                    </span>
                </section>

                <section className="section-review" style={styleReview}>
                    <figure className="big-review">
                        <blockquote className="big-review__text">
                            "Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. In dolores porro tempora blanditiis ipsam."
                        </blockquote>
                        <figcaption className="big-review__user">
                            {/* <img
                                src={user}
                                alt="user 3"
                                className="big-review__photo"
                            /> */}
                            <div className="big-review__user-box">
                                <p className="big-review__user-name">
                                    Evgeny Skarlat
                                </p>
                                <p className="big-review__user-job">
                                    CEO of OpenSalon{" "}
                                </p>
                            </div>
                        </figcaption>
                    </figure>
                </section>
            </div>
        );
    }
}

export default withRouter(Register);
