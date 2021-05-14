import css from './Packs.module.css'
import React, {useEffect} from 'react';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "../../Common/Pagination/Pagination";
import {Search} from "./Search/search";
import {CreatePack} from './CreatePack/CreatePack';
import {getPacksTC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";
import {Redirect} from "react-router-dom";



export type PardsTypeProps = {
    cardsCount: number
    created: string
    deckCover: null
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
    __proto__: {}
}


export const Packs = () => {

    const dispatch = useDispatch()

    let {me, isAuth} = useSelector((state:AppStateType) => state.login)
    let {cardPages, pagesList , searchCardName} = useSelector((state:AppStateType) => state.search)
    let {preloader, cardPacks } = useSelector((state:AppStateType) => state.packs)


    useEffect(()=>{
        if (isAuth) dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, ''))
    },[me])


    if (!isAuth && me)return <Redirect to={'/login'}/>


    return (
        <div className={css.App}>
            <HeaderPacks/>
            <Search/>
            <CreatePack/>

            <Pagination/>

            <div  >
                {preloader
                    ?<h2 >loading...</h2>
                    :cardPacks.map(t => {
                        return <Block
                            key={t._id} name={t.name} rating={t.rating}
                            userName={t.user_name} created={t.created}
                            id={t._id}
                            user_id={t.user_id} cardsCount={t.cardsCount}
                        />
                    })}
            </div>
        </div>
    )
}
