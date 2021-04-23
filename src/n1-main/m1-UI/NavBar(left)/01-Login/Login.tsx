import React, {useState, useCallback} from "react";
import "./login.css"

import { useDispatch, useSelector } from "react-redux";
import { loginTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";

export const Login = () => {
    const dispatch = useDispatch()
    let error = useSelector<AppStateType>(state => state.login.error)
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    let [email, setEmail] = useState("3y6kob@mail.ru")
    let [password, setPassword] = useState("oTBuHTa977")
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




    const onClickHandler = useCallback(() => {
        dispatch( loginTC(email, password, rememberMe))
    },[email, password, rememberMe])

    if(isAuth)return <Redirect to={'/profile'}/>;


    return (
        <div>
            <h2>Login</h2>
            <h3>account</h3>
            <SuperInputText onChange={onChangeHandlerEmail} value={email} />
            <h3>password</h3>
            <SuperInputText onChange={onChangeHandlerPassword} type={'password'} value={password} />
            <SuperCheckbox  title={'remember Me'} onClick={onChangeHandlerRememberMe} checked={rememberMe}/>
            <div style={{height:'10px'}}>

            </div>
            {error && <p className={"error"}>{` attention ${error}`}</p>}
            <SuperButton onClick={onClickHandler} title={'Login'} />
        </div>
    )
}
