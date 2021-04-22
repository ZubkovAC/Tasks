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
import {Modal} from '../../Common/Modal/Modal';
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
    let cardPacks = useSelector<AppStateType, Array<PardsTypeProps>>(state => state.packs.cardPacks)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)

    useEffect(()=>{
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, ''))
    },[])

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardCountAC(+e))
    }

    if (!isAuth) {
        return <Unauthorised/>;
    }

    return (
        <div className={css.App}>
            {/*<Modal/>*/}

            <HeaderPacks/>
            <SuperSelectOld style={{display: 'inline', textAlign: 'right'}} onChangeOption={onChangeHandler}
                            options={['9', '8', '7', '6', '5', '4', '3']}/>

            <Search/>
            <CreatePack/>
            <Pagination/>

            {cardPacks.map(t => {
                return <Block
                    key={t._id} name={t.name} rating={t.rating}
                    userName={t.user_name} created={t.created}
                    id={t._id} cardsCount={t.cardsCount}
                />
            })}

        </div>
    )
}
