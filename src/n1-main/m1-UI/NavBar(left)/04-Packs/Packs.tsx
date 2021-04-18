import css from './Packs.module.css'
import React, {ChangeEvent} from 'react';
import {Unauthorised} from '../../Common/Accets/Unauthorised';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import { useDispatch, useSelector } from "react-redux";
import {Pagination} from "../../Common/Pagination/Pagination";
import SuperSelectOld from "../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";
import {cardCountAC} from "../../../m2-BLL/04-reducer-search/reducer-search";
import {Search} from "./Search/search";
import { CreateCard } from './CreateCard/CreateCard';


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


    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardCountAC(+e))
    }

    if(!isAuth){
        return <Unauthorised/>;
    }

    return (
        <div className={css.App}>
            <HeaderPacks/>

            <SuperSelectOld style={{display:'inline' ,textAlign:'right'}} onChangeOption={onChangeHandler}
                            options={['9','8','7','6','5','4','3']}/>

            <Search/>
            <CreateCard/>
            <Pagination/>

            {cardPacks.map( t=>{
                return <Block
                    key={t._id} name={t.name} rating={t.rating}
                    userName={t.user_name} created ={t.created}
                    id={t._id} cardsCount={t.cardsCount}
                />
            })}

        </div>
    )
}