import React from "react";
import SuperButtonOld from "../../InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from './ModalBody.module.css'

export const ModalBody = () => {

    return (
        <div className={css.modalbody}>
            <p>New name for pack:</p>
            <SuperInputTextOld />
            <SuperButtonOld title='close'/>
        </div>
    )
}