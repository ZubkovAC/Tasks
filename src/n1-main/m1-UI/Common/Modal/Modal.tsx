import React from "react";
import css from './Modal.module.css'
import { ModalBody } from './ModalBody/ModalBody';

export const Modal = () => {

    return (
        <div className={css.overlay}>
            <ModalBody/>
        </div>
    )
}