import css from './Packs.module.css'
import React from 'react';
import {Unauthorised} from '../Accets/Unauthorised';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";
import { useDispatch, useSelector } from "react-redux";
import { getPacksTC } from "../../../m2-BLL/05-reducer-packs/packs";

export const Packs = () =>{
    const dispatch = useDispatch()
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    if(!isAuth){
        return <Unauthorised/>;
    }

    dispatch( getPacksTC('english', 0, 99, '0updated', 1, 4, 'user_id=5eb543f6bea3ad21480f1ee7'))

    return (
        <div className={css.App}>
            <HeaderPacks/>
            <Block/>
            <Block/>
            <Block/>
            <Block/>
        </div>
    )
}