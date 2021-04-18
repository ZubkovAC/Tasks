import css from './HeaderPack.module.css'
import React from 'react';
import SuperButtonOld from '../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld';
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {getCardsTC, inputIdAC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";

export const HeaderPacks = () =>{

    const dispatch = useDispatch()

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let cardPacksTotalCount = useSelector<AppStateType,number>(state => state.packs.cardPacksTotalCount)


    const addPack = () => {
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))
    }

    const getCard = () => {
        dispatch(getCardsTC('english','english',"607b24aa15cdb80004cc4cd4",1,4,'0grade',1,7) )
    }

    const inputIdCard = (value:string) =>{
        dispatch(inputIdAC(value))
    }



    return (
        <div className={css.HeaderPack}>
            <div style={{fontSize:'20px',fontWeight:600}}>
                Total Cards : {cardPacksTotalCount}
            </div>
            <div>
                <SuperButtonOld title={'Add'} onClick={addPack}/>
                <SuperButtonOld title={'-Get-Card-'} onClick={getCard}/>
                <SuperInputTextOld  onChangeText={inputIdCard}  />
            </div>

        </div>
    )
}