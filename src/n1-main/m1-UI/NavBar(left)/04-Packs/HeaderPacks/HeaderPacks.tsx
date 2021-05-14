import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

export const HeaderPacks = () =>{

    const dispatch = useDispatch()

    const userID = useSelector<AppStateType,string>(state=>state.login.userID)
    let cardPacksTotalCount = useSelector<AppStateType,number>(state => state.packs.cardPacksTotalCount)

    let {cardPages,pagesList,searchCardName} = useSelector((state:AppStateType) => state.search)


    const getPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, ''))
    }
    const getMyPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, userID))
    }

    return (
        <div className={css.HeaderPack}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                Total Cards : {cardPacksTotalCount}
            </div>
            <div>
                <SuperButtonOld title={'getPack'} onClick={getPack}/>
                <span style={{marginLeft:'20px'}}>
                    <SuperButtonOld title={'getMyPack'} onClick={getMyPack}/>
                </span>
            </div>

        </div>
    )
}