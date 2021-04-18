import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {getCardsTC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";

export const HeaderPacks = () =>{
    // 5f0748a8179f230004606bd5   3 HERO
    const dispatch = useDispatch()

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let cardPacksTotalCount = useSelector<AppStateType,number>(state => state.packs.cardPacksTotalCount)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)

    const addPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))

    }
    const getCard = () => {
        dispatch(getCardsTC('english','english',"5f0731a1179f230004606bbe",1,4,'0grade',1,7) )
    }

//   606861b2cb47ed27bc7e95e3
//      5eb6a2f72f849402d46c6ac7
    return (
        <div className={css.HeaderPack}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                Total Cards : {cardPacksTotalCount}

            </div>
            <div>
                <SuperButtonOld title={'Add'} onClick={addPack}/>
                <SuperButtonOld title={'-Get-Card-'} onClick={getCard}/>
            </div>

        </div>
    )
}