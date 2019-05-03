import React from "react";
import moment from "moment";

import "./ReservationItem.scss";

import NoUser from "../../../../assets/img/no-user.jpg";

const ReservationItem = props => {
    return (
        <div className="os-reservation-item">
            <figure className="os-reservation-item__client">
                <img
                    src={NoUser}
                    alt={props.item.client.name}
                    className="os-reservation-item__client--image"
                />
                <figcaption className="os-reservation-item__client--info">
                    <span className="os-reservation-item__client--name">
                        {props.item.client.name}
                    </span>
                    <span className="os-reservation-item__client--phone">
                        {props.item.client.phone}
                    </span>
                    <span className="os-reservation-item__info-box--item">
                        Total amount:{" "}
                        {props.item.services.reduce(
                            (sum, item) => sum + item.cost,
                            0
                        )}{" "}
                        BGN
                    </span>
                </figcaption>
            </figure>
            <div className="os-reservation-item__info-box">
                <span className="os-reservation-item__info-box--item">
                    {props.item.comment}
                </span>
                <span className="os-reservation-item__info-box--item">
                    {props.item.salon.title}
                </span>
                <span className="os-reservation-item__info-box--item">
                    {props.item.location.address}
                </span>
                <span className="os-reservation-item__info-box--item">
                    {props.item.master.firstName}
                </span>
                <span className="os-reservation-item__info-box--item">
                    {moment(props.item.start).format("LTS")}
                </span>
                <span className="os-reservation-item__info-box--item">
                    {moment(props.item.end).format("LTS")}
                </span>
            </div>
            <ul className="os-reservation-item__service-list">
                {props.item.services.map(service => (
                    <li
                        key={service._id}
                        className="os-reservation-item__service-list--item"
                    >
                        {service.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationItem;
