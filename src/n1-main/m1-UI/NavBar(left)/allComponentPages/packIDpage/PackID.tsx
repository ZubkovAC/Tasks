import React, {useEffect} from "react";
import {getCardsTC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

type PackIdPropsType = {
    // id:string
}

export const PackId = (props:PackIdPropsType) =>{

    const id = useSelector<AppStateType,string>(state => state.cards.id)
    const card = useSelector<AppStateType,any>(state=>state.cards.cards)
    const dispatch = useDispatch()

    useEffect( () =>{
        dispatch(getCardsTC('english','english',id,1,4,'0grade',1,7) )
    },[])

    return (
        <div>
            <h2>ppc</h2> {card}
        </div>
    )
}