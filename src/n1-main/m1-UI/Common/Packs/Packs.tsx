import css from './Packs.module.css'
import React from 'react';
import {Unauthorised} from '../Accets/Unauthorised';
import { useSelector } from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Block} from "./Block/Block";
import {HeaderPacks} from "./HeaderPacks/HeaderPacks";

export const Packs = () =>{
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    if(!isAuth){
        return <Unauthorised/>;
    }

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