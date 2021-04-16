import css from '../Block/Block.module.css'
import React from 'react';
import SuperButtonOld from '../../InputAndButton/с2-SuperBottonOld/SuperButtonOld';

export const HeaderPacks = () =>{
    return (
        <div className={css.App}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                <div>Name</div>
                <div>cardsCount</div>
                <div>updated</div>
                <div>url</div>
            </div>

            <div>
                <SuperButtonOld title={'Add'}/>
            </div>

        </div>
    )
}