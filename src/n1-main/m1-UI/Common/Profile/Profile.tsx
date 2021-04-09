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
    let avatar = useSelector<AppStateType, null | string>(state => state.login.avatar)
    let userName = useSelector<AppStateType, string>(state => state.login.userName)
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
            <img src={avatar ? avatar : ''} alt="avatar"/>
            <h3>Hello {userName}</h3>
        </div>
    )
}
