import React from "react";
import css from "./Table.module.css";

type TableContentsPropsType = {
    name:string
    packUserName:string
    grade:string
    actions:string
}

export const TableCard = (props:TableContentsPropsType) =>{
    return (
        <div className={css.container}>
            <p className={css.name}>
                {props.name}
            </p>
            <p className={css.card}>
                {props.packUserName }

            </p>
            <p className={css.grade}>
                {props.grade}
            </p>
            <p className={css.actions}>
                {props.actions}

            </p>
        </div>
    )
}