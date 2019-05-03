import React from "react";
import moment from "moment";

import ReservationRow from "./ReservationRow/ReservationRow";

import "./ReservationTable.scss";

const ReservationTable = props => {
    let reservations = null;

    if (props.reservations.times) {
        reservations = props.reservations.times.map((time, index) => (
            <ReservationRow key={index} item={time} />
        ));
    }

    return (
        <div className="os-reservation-table">
            <div className="os-reservation-table--header">
                <span
                    className="os-reservation-table--btn"
                    onClick={props.onPrevDay}
                >
                    &lang;
                </span>
                <span>{moment(props.reservations.date).format("LL")}</span>
                <span
                    className="os-reservation-table--btn"
                    onClick={props.onNextDay}
                >
                    &rang;
                </span>
            </div>
            <div className="os-reservation-table--rows">{reservations}</div>
        </div>
    );
};

export default ReservationTable;
