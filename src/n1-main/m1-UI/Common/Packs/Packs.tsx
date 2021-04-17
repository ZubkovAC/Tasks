import css from './Packs.module.css'
import React from 'react';
import {Unauthorised} from '../Accets/Unauthorised';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import { useDispatch, useSelector } from "react-redux";
import {Search} from "../Search/search";
import {Pagination} from "../Pagination/Pagination";


export type PardsTypeProps = {
    cardsCount:number
    created: string
    deckCover: null
    grade: number
    more_id:string
    name:string
    path:string
    private:boolean
    rating: number
    shots:number
    type:string
    updated: string
    user_id:string
    user_name: string
    __v: number
    _id:string
    __proto__:{}
}


export const Packs = () =>{

    const dispatch = useDispatch()
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    let cardPacks = useSelector<AppStateType,Array<PardsTypeProps>>(state => state.packs.cardPacks)







    if(!isAuth){
        return <Unauthorised/>;
    }



    return (
        <div className={css.App}>
            <HeaderPacks/>


            <Pagination/>

            {cardPacks.map( t=>{
                return <Block key={t._id} name={t.name} rating={t.rating} userName={t.user_name} created ={t.created}/>
            })}

        </div>
    )
}