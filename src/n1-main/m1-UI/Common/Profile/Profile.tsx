import React from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import { logoutTC } from "../../../m2-BLL/02-reducer-login/login";

export const Profile = () => {
    const dispatch = useDispatch()
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    // тестовые данные из логинизации, в перспективе нужно из профиля с сервера, с картинкой
    let email = useSelector<AppStateType>(state => state.login.email)
    let pass = useSelector<AppStateType>(state => state.login.password)
    //

    if(!isAuth){
        return <Redirect to={'/login'}/>;
    }
    const onClickHandler = () => {
        dispatch( logoutTC())
    }

    return (
        <div>
            <SuperButton onClick={onClickHandler} title={'Logout'} />
            <h2>Profile</h2>
            <img src="https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg" alt=""/>
            <h3>your password: {pass}</h3>
            <h3>Your email: {email}</h3>
        </div>
    )
}
