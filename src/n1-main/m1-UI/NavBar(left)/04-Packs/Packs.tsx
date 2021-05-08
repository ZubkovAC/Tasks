import css from './Packs.module.css'
import React, {ChangeEvent, useEffect} from 'react';
import {Unauthorised} from '../../Common/Accets/Unauthorised';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "../../Common/Pagination/Pagination";
import SuperSelectOld from "../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";
import {cardCountAC} from "../../../m2-BLL/04-reducer-search/reducer-search";
import {Search} from "./Search/search";
import {CreatePack} from './CreatePack/CreatePack';
import {getPacksTC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";



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
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let preloader =useSelector<AppStateType,boolean>(state=>state.packs.preloader)
    let cardPacks = useSelector<AppStateType, Array<PardsTypeProps>>(state => state.packs.cardPacks)


    useEffect(()=>{
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, ''))
    },[])



    if (!isAuth) {
        return <Unauthorised/>;
    }

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
                            id={t.user_id} cardsCount={t.cardsCount}
                        />
                    })}
            </div>



        </div>
    )
}
