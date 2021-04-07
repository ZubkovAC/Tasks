import React, { useState } from "react";
import "./login.css"
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import SuperCheckbox from "../InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../../m2-BLL/02-reducer-login/login";
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../../m2-BLL/00-store/store";

export const Login = () => {
    const dispatch = useDispatch()
    let error = useSelector<AppStateType>(state => state.login.error)
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    let [email, setEmail] = useState("nya-admin@nya.nya")
    let [password, setPassword] = useState("1qazxcvBG")
    let [rememberMe, setRememberMe] = useState(false)

    const onChangeHandlerEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangeHandlerPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeHandlerRememberMe = (e: React.FormEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }
    const onClickHandler = () => {
        dispatch( loginTC(email, password, rememberMe))
    }

    if(isAuth){
        return <Redirect to={'/profile'}/>;
    }

    return (
        <div>
            <h2>Login</h2>
            <div>account</div>
            <SuperInputText onChange={onChangeHandlerEmail} value={email} />
            <div>password</div>
            <SuperInputText onChange={onChangeHandlerPassword} value={password} />
            <div>remember Me</div>
            <SuperCheckbox onClick={onChangeHandlerRememberMe} checked={rememberMe}/>
            {error && <p className={"error"}>{` attention ${error}`}</p>}
            <SuperButton onClick={onClickHandler} title={'Login'} />
        </div>
    )
}
