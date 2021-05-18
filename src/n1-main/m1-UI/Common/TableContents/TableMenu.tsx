import React from "react";
import css from "./Table.module.css";

type TableMenuPropsType = {
    children:any
}


export const TableMenu = (props:TableMenuPropsType) =>{
    return (
        <div className={css.containerMenu}>
           <div className={css.containerBox}>
               {props.children}
           </div>
        </div>
    )
}