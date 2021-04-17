import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../InputAndButton/с2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

export const HeaderPacks = () =>{

    const dispatch = useDispatch()

    let cardPages = useSelector<AppStateType>(state => state.search.cardPages)
    let cardPacksTotalCount = useSelector<AppStateType>(state => state.packs.cardPacksTotalCount)


    const addPack = () => {
        dispatch( getPacksTC('', 0, 99, '0updated', 1, 9, 'user_id=5eb543f6bea3ad21480f1ee7'))

    }


    return (
        <div className={css.HeaderPack}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                Total Cards : {cardPacksTotalCount}


            </div>

            <div>
                <SuperButtonOld title={'Add'} onClick={addPack}/>
            </div>

        </div>
    )
}