import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

export const HeaderPacks = () =>{

    const dispatch = useDispatch()

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let cardPacksTotalCount = useSelector<AppStateType,number>(state => state.packs.cardPacksTotalCount)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)

    const addPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))

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