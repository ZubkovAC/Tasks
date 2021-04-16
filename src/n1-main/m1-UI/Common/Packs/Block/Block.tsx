import css from './Block.module.css'
import React from "react";
import SuperButtonOld from "../../InputAndButton/с2-SuperBottonOld/SuperButtonOld";

export const Block =()=>{
    return  (
        <div className={css.App}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                <span>Название, с сервера</span>
                <div>Количество, с сервера</div>
                <span>Дата, с сервера</span>
                <div>УРЛ, с сервера</div>
            </div>
            <div>
                <SuperButtonOld title={'Delete'}/>
                <SuperButtonOld title={'Update'}/>
            </div>

        </div>
    )
}