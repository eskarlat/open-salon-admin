import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//style
import "./Index.scss";

//Layout
import HomeLayout from "../../../layouts/Home/Home";

import appImage from "../../../assets/img/app.png";
import customer from "../../../assets/img/user-1.jpg";

//svg

import iconRocket from "../../../assets/SVG/rocket.svg";
import iconGauge from "../../../assets/SVG/gauge.svg";
import iconNews from "../../../assets/SVG/news.svg";
import iconHeart from "../../../assets/SVG/heart.svg";
import iconTrophy from "../../../assets/SVG/trophy.svg";
import iconUser from "../../../assets/SVG/user.svg";

class Index extends Component {
    state = {
        email: null
    };

    onInputChangeHandler = event => {
        const updateInput = event.target.value;
        this.setState({ email: updateInput });
    };

    onTrySubmitHandler = () => {
        if (this.state.email) {
            this.props.history.push(`/register?email=${this.state.email}`);
        }
    };

    render() {
        return (
            <HomeLayout>
                <section className="section-presentation">
                    <h1 className="heading-primary u-margin-bottom-big u-margin-top-big u-center-text">
                        <span className="heading-primary--main">
                            Open your salon online
                        </span>
                        <span className="heading-primary--sub">
                            Salon reservation platform.
                        </span>
                    </h1>
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
                    <img
                        src={appImage}
                        alt="app screenshot"
                        className="section-presentation__picture u-margin-top-big"
                    />
                </section>
                <section className="section-features">
                    <div className="u-center-text u-margin-bottom-small u-margin-top-big">
                        <h2 className="heading-secondary">Why us?</h2>
                    </div>
                    <div className="features">
                        <figure className="feature">
                            <img
                                src={iconRocket}
                                alt="icon"
                                className="feature__icon"
                            />
                            <figcaption className="feature__text">
                                <h4 className="heading-4">
                                    Easy integration in your site
                                </h4>
                                <p>
                                    Just set up a widget on your site and
                                    receiving reservations
                                </p>
                            </figcaption>
                        </figure>
                        <figure className="feature">
                            <img
                                src={iconGauge}
                                alt="icon"
                                className="feature__icon"
                            />
                            {/* <svg className="feature__icon">
                                    <use xlink:href="img/sprite.svg#icon-gauge" />
                                </svg> */}
                            <figcaption className="feature__text">
                                <h4 className="heading-4">
                                    Opportunity to book any master and complex
                                    service
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </figcaption>
                        </figure>
                        <figure className="feature">
                            <img
                                src={iconUser}
                                alt="icon"
                                className="feature__icon"
                            />
                            {/* <svg className="feature__icon">
                                    <use xlink:href="img/sprite.svg#icon-emoji-flirt" />
                                </svg> */}
                            <figcaption className="feature__text">
                                <h4 className="heading-4">Customer profile</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </figcaption>
                        </figure>
                        <figure className="feature">
                            <img
                                src={iconNews}
                                alt="icon"
                                className="feature__icon"
                            />
                            <figcaption className="feature__text">
                                <h4 className="heading-4">
                                    Opportunity to add service and master
                                    descriptions
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </figcaption>
                        </figure>
                        <figure className="feature">
                            <img
                                src={iconTrophy}
                                alt="icon"
                                className="feature__icon"
                            />
                            <figcaption className="feature__text">
                                <h4 className="heading-4">
                                    Quick and clear online booking
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </figcaption>
                        </figure>
                        <figure className="feature">
                            <img
                                src={iconHeart}
                                alt="icon"
                                className="feature__icon"
                            />
                            <figcaption className="feature__text">
                                <h4 className="heading-4">Happy customers</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                </section>
                <section className="section-reviews">
                    <div className="u-center-text u-margin-bottom-small u-margin-top-medium">
                        <h2 className="heading-secondary">Customer Stories</h2>
                    </div>
                    <div className="reviews">
                        <figure className="review">
                            <blockquote className="review__text">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Quia quidem autem voluptate
                                voluptates eaque maiores
                            </blockquote>
                            <figcaption className="review__user">
                                <img
                                    src={customer}
                                    alt="user 1"
                                    className="review__photo"
                                />
                                <div className="review__user-box">
                                    <p className="review__user-name">
                                        Andrey Dolhikh
                                    </p>
                                    <p className="review__user-job">Barber</p>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </section>
            </HomeLayout>
        );
    }
}

export default withRouter(Index);
