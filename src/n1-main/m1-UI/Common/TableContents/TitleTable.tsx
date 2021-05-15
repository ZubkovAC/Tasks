import css from "./TitleTable.module.css";
import React from "react";

type TitleModalPropsType ={
    title:string

}
export const TitleTable = (props:TitleModalPropsType) =>{
    return (
        <q className={css.TitleTable}>
            {props.title}
        </q>
    )
}