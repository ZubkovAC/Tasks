import css from './Packs.module.css'
import React, {useEffect} from 'react';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import {useDispatch, useSelector} from "react-redux";
import {Search} from "./Search/search";
import {CreatePack} from './CreatePack/CreatePack';
import {getPacksTC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";
import {Redirect} from "react-router-dom";
import {CardPackType} from "../../../m3-DAL/axios";
import {TitleModal} from "../../Common/TitleModal/TitleModal";
import {TableContents} from "../../Common/TableContents/TableContents";
import { CardPacksMapper } from './Block/CardPacksMapper';


type PackSelectorType ={
    preloader:boolean
    cardPacks:CardPackType[]
    maxCard:number
}

type LoginSelectorType = {
    me:boolean
    isAuth:boolean
}

type SearchSelectorType ={
    cardPages: number
    pagesList:number
    searchCardName:string
}

export const Packs = () => {

    const dispatch = useDispatch()
    let {me, isAuth} = useSelector<AppStateType,LoginSelectorType>(state => state.login)
    let {cardPages, pagesList, searchCardName} = useSelector<AppStateType,SearchSelectorType>(state => state.search)
    let {preloader, cardPacks,maxCard} = useSelector<AppStateType,PackSelectorType>(state => state.packs)


    useEffect(() => {
        if (isAuth) dispatch(getPacksTC(searchCardName, 0, maxCard, '0updated', pagesList, cardPages, ''))
    }, [me,cardPages,dispatch,isAuth,maxCard,pagesList,searchCardName])

    if (!isAuth && me) return <Redirect to={'/login'}/>

    return (
        <div >
            <div className={css.Pack}>
                <div className={css.hp}>
                    <HeaderPacks/>
                </div >
                <div className={css.s}>
                    <Search/>
                </div>
            </div>

            <div className={css.tableBlock}>
                <CreatePack userID={''} update={''}/>
                <TableContents name={'Name'} packUserName={'packUserName'} grade={'grade | rating'} actions={'actions'}/>
                {preloader
                    ? <TitleModal title={'loading...'}/>
                    : <CardPacksMapper userID={''} cardPacks={cardPacks}/>
                }
            </div>
        </div>
    )
}
