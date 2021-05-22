import React from "react";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {getPacksTC} from "../../../../m2-BLL/Packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store";

type SortPropsType ={
    userID:string
}

export const Sort = (props:SortPropsType) =>{

    let {searchCardName, pagesList, cardPages} = useSelector((state: AppStateType) => state.search)
    let {maxCard} = useSelector((state: AppStateType) => state.packs)


    const dispatch = useDispatch()
    const SortUp = () => {
        dispatch(getPacksTC(searchCardName, 0, maxCard, '0cardsCount', pagesList, cardPages, props.userID))
    }
    const SortDown = () => {
        dispatch(getPacksTC(searchCardName, 0, maxCard, '1cardsCount', pagesList, cardPages, props.userID))
    }
    return (
        <span>
            <SuperButtonOld
                title={'v'}
                transform={true}
                onClick={SortUp}/>
            <SuperButtonOld
                title={'v'}
                onClick={SortDown}/>
        </span>
    )
}
