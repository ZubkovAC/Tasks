import React from "react";
import css from "./TitleTable.module.css";

type TableContentsPropsType = {
    name?:string
    packUserName?:string
    grade?:string
    actions?:string
}

export const TableContents = ({name,packUserName,grade,actions}:TableContentsPropsType) =>{
    return (
        <div className={css.container}>
            <p className={css.name}>
                {name ? name: 'Name'}
            </p>
            <p className={css.card}>
                {packUserName ? packUserName: 'packUserName'}

            </p>
            <p className={css.grade}>
                {grade ? grade: 'cardCount | grade'}
            </p>
            <p className={css.actions}>
                {actions ? actions: 'actions'}

            </p>
        </div>
    )
}