import React from "react";

import Modal from "../Modal/Modal";

import "./DeleteModal.scss";

const DeleteModal = props => {
    return (
        <Modal title="Delete" closed={props.closed}>
            <span className="widget__modal--text">Are you sure?</span>
            <div className="widget__modal--footer">
                <button className="btn btn-primary" onClick={props.clicked}>
                    Yes
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
