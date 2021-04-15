import React, {useEffect} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import {authMeTC, logoutTC} from "../../../m2-BLL/02-reducer-login/login";
import SuperButtonOld from "../InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";

export const Profile = () => {
    const dispatch = useDispatch()
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    let avatar = useSelector<AppStateType,string>(state => state.login.avatar)
    let userName = useSelector<AppStateType, string>(state => state.login.userName)


    useEffect(()=>{
        if (!isAuth)dispatch(authMeTC())
    },[dispatch])


    const onClickHandler = () => {
        dispatch( logoutTC())
    }

    if(!isAuth) return <Redirect to={'/login'}/>;

    else {
        return (
            <div>
                <SuperInputTextOld />
                <SuperButtonOld title={'add'}/>
                <SuperButtonOld title={'v'}/>
                <SuperButtonOld title={'v'} transform={true}/>
                <SuperButton onClick={onClickHandler} title={'Logout'} />
                <h2>Profile</h2>
                <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"} alt="avatar"/>
                <h3>Hello {userName}</h3>
            </div>
        )
    }
}
