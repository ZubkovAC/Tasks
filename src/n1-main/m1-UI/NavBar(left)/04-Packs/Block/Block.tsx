import css from './Block.module.css'
import React from "react";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCardsTC, inputIdAC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {RoutePath} from "../../../../../App";

export type BlockPropsType ={
    name:string
    rating:number
    userName:string
    created:string
    id:string
    cardsCount:number
}

export const Block =(props:BlockPropsType)=>{

    const dispatch = useDispatch()

    const loadingIdCard = () =>{
        dispatch(inputIdAC(props.id))
        dispatch(getCardsTC('english','english',props.id,1,4,'0grade',1,7) )
    }

    const deleteCard = () =>{
        dispatch(deletePackTC(props.id))
    }

    const updateCard = ()=>{
        dispatch( updatePackTC(props.id, 'jylio-xylio'))
    }

    // <NavLink to={`/packs/${props.id}`>{props.id}</NavLink>
    // <NavLink to={RoutePath.PACKS+`/${props.id}`>{props.id}</NavLink>  рабочая
    // <NavLink to={RoutePath.PACKS+'/'+props.id>{props.id}</NavLink>
    return  (
        <div className={css.Block}>
            <div style={{fontSize:'16px',fontWeight:600}}>
                <span  style={{fontSize:'22px',fontWeight:600}}>{props.userName}</span>
                <div>
                    <span style={{padding:'5px'}}>{props.name}</span>
                    <span style={{padding:'5px'}}> rating:{props.rating}</span>
                    <span style={{padding:'5px'}}> {props.created}</span>
                    <span style={{padding:'15px'}}>
                        ID:
                        <NavLink to={`/packs/${props.id}`} >{props.id}</NavLink>
                        </span>
                    <span>cardsCount:{props.cardsCount}</span>
                </div>

            </div>
            <div>
                <SuperButtonOld title={'Delete'}  onClick={deleteCard} />
                <SuperButtonOld title={'Update'}  onClick={updateCard} />
            </div>

        </div>
    )

}
