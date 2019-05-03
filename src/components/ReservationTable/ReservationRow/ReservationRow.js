import React from "react";

import ReservationItem from "./ReservationItem/ReservationItem";

import "./ReservationRow.scss";

const ReservationRow = props => {
    return (
        <div className="os-reservation-row">
            <div className="os-reservation-row--time">{props.item.time}</div>
            <div className="os-reservation-row__reservations">
                {props.item.reservations.map(reservation => (
                    <ReservationItem key={reservation._id} item={reservation} />
                ))}
            </div>
        </div>
    );
};

export default ReservationRow;
