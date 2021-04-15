import css from './Cards.module.css'
import React from 'react';
import {Unauthorised} from '../Accets/Unauthorised';
import { useSelector } from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";

export const Cards = () =>{
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    if(!isAuth){
        return <Unauthorised/>;
    }

    return (
        <div className={css.App}>
           
        </div>
    )
}
