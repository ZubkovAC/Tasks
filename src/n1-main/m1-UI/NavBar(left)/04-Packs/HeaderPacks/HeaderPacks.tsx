import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

export const HeaderPacks = () =>{

    const dispatch = useDispatch()

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let cardPacksTotalCount = useSelector<AppStateType,number>(state => state.packs.cardPacksTotalCount)


    const getPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, ''))
    }


    return (
        <div className={css.HeaderPack}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                Total Cards : {cardPacksTotalCount}
            </div>
            <div>
                <SuperButtonOld title={'getPack'} onClick={getPack}/>
            </div>

        </div>
    )
}