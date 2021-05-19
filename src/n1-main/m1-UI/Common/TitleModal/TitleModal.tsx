import React from "react";
import css from './titleModal.module.css'

type TitleModalPropsType ={
    title:string
}
export const TitleModal = (props:TitleModalPropsType) =>{
    return (
        <span className={css.modalTitle}>
            {props.title}
        </span>
    )
}