import React from "react";
import css from "./TitleTable.module.css";

export const TableContents = () =>{
    return (
        <div className={css.container}>
            <p className={css.name}>
                Name
            </p>
            <p className={css.card}>
                packName
            </p>
            <p className={css.grade}>
                grade
            </p>
            <p className={css.actions}>
                actions
            </p>
        </div>
    )
}