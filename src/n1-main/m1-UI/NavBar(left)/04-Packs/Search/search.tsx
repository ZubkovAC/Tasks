import React from "react";
import './styleSearch.css'
import {useDispatch, useSelector} from "react-redux";
import {cardNameAC} from "../../../../m2-BLL/04-reducer-search/reducer-search";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";



export const Search = () => {

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)

    const  dispatch = useDispatch()
    const onChangeHandler = (value:string) => {
        dispatch(cardNameAC(value))
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))
    }
                                                                        // super button  фальш
    return (
        <div style={{textAlign:'right'}}>
            <SuperInputTextOld onChangeText={onChangeHandler} />
            <span style={{display:'inline'}}><SuperButtonOld title={'Search'}/></span>
        </div>
    )
}

