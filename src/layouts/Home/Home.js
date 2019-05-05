import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//style
import "./Home.scss";

import iconFacebook from "../../assets/SVG/facebook.svg";
import iconInstagram from "../../assets/SVG/instagram.svg";
import iconTwitter from "../../assets/SVG/twitter.svg";
import iconGithub from "../../assets/SVG/github.svg";

class Home extends Component {
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

    onTryHandler = () => {
        this.props.history.push("/try");
    };

    onTrySubmitHandler = () => {
        if (this.state.email) {
            this.props.history.push(`/register?email=${this.state.email}`);
        }
    };

    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <div className="header__box">
                        <div className="header__brand">
                            <div className="logo">
                                <div className="logo__part logo__part-1" />
                                <div className="logo__part logo__part-2" />
                            </div>
                            <span>OpenSalon</span>
                        </div>
                        {/* <nav className="navigation">
                            <ul className="navigation__list">
                                <li className="navigation__item">
                                    <a href="#" className="navigation__link">
                                        Product
                                    </a>
                                </li>
                                <li className="navigation__item">
                                    <a href="#" className="navigation__link">
                                        Pricing
                                    </a>
                                </li>
                                <li className="navigation__item">
                                    <a href="#" className="navigation__link">
                                        Enterprise
                                    </a>
                                </li>
                                <li className="navigation__item">
                                    <a href="#" className="navigation__link">
                                        Customers
                                    </a>
                                </li>
                                <li className="navigation__item">
                                    <a href="#" className="navigation__link">
                                        Resources
                                    </a>
                                </li>
                            </ul>
                        </nav> */}
                        <div className="header__buttons">
                            <button
                                className="btn btn--link"
                                onClick={this.onLoginHandler}
                            >
                                Sign In
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={this.onTryHandler}
                            >
                                Start free trial
                            </button>
                        </div>
                    </div>
                </header>
                <div className="container">{this.props.children}</div>
                <section className="section-cta u-center-text">
                    <h2 className="heading-primary u-margin-bottom-big">
                        <span className="heading-primary--main">
                            Join the over 100 salons already using OpenSalon
                        </span>
                        <span className="heading-primary--sub">
                            Effortlessly onboard and start creating in minutes
                        </span>
                    </h2>
                    <form action="#" className="form-try">
                        <input
                            type="email"
                            className="input input--light"
                            placeholder="Your email address"
                            value={this.state.email}
                            onChange={event => this.onInputChangeHandler(event)}
                        />
                        <button
                            className="btn btn--primary"
                            onClick={this.onTrySubmitHandler}
                        >
                            Try it for free
                        </button>
                    </form>
                </section>
                <footer className="section-footer container u-margin-top-medium">
                    <div className="footer">
                        <div className="footer__logo">
                            <div className="logo logo--light">
                                <div className="logo__part logo__part-1" />
                                <div className="logo__part logo__part-2" />
                            </div>
                        </div>
                        <div className="footer__links">
                            {/* <div className="footer__box">
                                <span className="footer__header">Product</span>
                                <ul className="footer__links-list">
                                    <li>
                                        <a href="#">Features</a>
                                    </li>
                                    <li>
                                        <a href="#">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#">Enterprise</a>
                                    </li>
                                    <li>
                                        <a href="#">Download iOS</a>
                                    </li>
                                    <li>
                                        <a href="#">Integrations</a>
                                    </li>
                                </ul>
                            </div> */}
                            {/* <div className="footer__box">
                                <span className="footer__header">Company</span>
                                <ul className="footer__links-list">
                                    <li>
                                        <a href="#">Customers</a>
                                    </li>
                                    <li>
                                        <a href="#">Careers</a>
                                    </li>
                                    <li>
                                        <a href="#">Press</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">Brand Guidelines</a>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="footer__box">
                                <span className="footer__header">
                                    Developers
                                </span>
                                <ul className="footer__links-list">
                                    <li>
                                        <a href="#">REST API Docs</a>
                                    </li>
                                    <li>
                                        <a href="#">Webhook API Docs</a>
                                    </li>
                                    <li>
                                        <a href="#">Open Source Projects</a>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="footer__box">
                                <span className="footer__header">
                                    Resources
                                </span>
                                <ul className="footer__links-list">
                                    <li>
                                        <a href="#">Help Center</a>
                                    </li>
                                    <li>
                                        <a href="#">Blog</a>
                                    </li>
                                    <li>
                                        <a href="#">Webinars</a>
                                    </li>
                                    <li>
                                        <a href="#">Status</a>
                                    </li>
                                    <li>
                                        <a href="#">Referral Program</a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="footer__social">
                            {/* <div className="footer__box">
                                <span className="footer__header">
                                    Open Salon Blog
                                </span>
                                <ul className="footer__social-list">
                                    <li>
                                        <a href="#">
                                            Merge projects seamlessly with the
                                            new GitLab and Clubhouse integration
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Meet the Engineer: Talking pizza,
                                            compromise and fax machines with
                                            Erica Kantor, Senior Software
                                            Engineer at Slice
                                        </a>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="footer__social-icons">
                                <img
                                    src={iconFacebook}
                                    alt="icon"
                                    className="footer__icon"
                                />
                                <img
                                    src={iconInstagram}
                                    alt="icon"
                                    className="footer__icon"
                                />
                                <img
                                    src={iconTwitter}
                                    alt="icon"
                                    className="footer__icon"
                                />
                                <img
                                    src={iconGithub}
                                    alt="icon"
                                    className="footer__icon"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="legacy">
                        <div className="legacy__copyright">
                            &copy; 2019. All right reserved. Evgeny Skarlat
                        </div>
                        <ul className="legacy__security-links">
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms of use</a>
                            </li>
                            <li>
                                <a href="#">Security</a>
                            </li>
                            <li>
                                <a href="#">Your Cookies</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);
