import css from './Block.module.css'
import React from "react";
import SuperButton from "../../InputAndButton/c2-SuperButton/SuperButton";

export const Block =()=>{
    return  (
        <div className={css.App}>
            <div>Название, с сервера</div>
            <div>Количество, с сервера</div>
            <div>Дата, с сервера</div>
            <div>УРЛ, с сервера</div>
            <SuperButton title={'Delete'}/>
            <SuperButton title={'Update'}/>
        </div>
    )
}