import css from '../Block/Block.module.css'
import React from 'react';
import SuperButton from "../../InputAndButton/c2-SuperButton/SuperButton";

export const HeaderPacks = () =>{
    return (
        <div className={css.App}>
            <div>Name</div>
            <div>cardsCount</div>
            <div>updated</div>
            <div>url</div>
            <SuperButton title={'Add'}/>
        </div>
    )
}