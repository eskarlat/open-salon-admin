import React, { Component } from "react";

//style
import "./Front.scss";

//Components

class Front extends Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default Front;
