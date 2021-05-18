import React, {useState, useCallback, useEffect} from "react";
import "./login.css"

import {useDispatch, useSelector} from "react-redux";
import {errorAC, loginTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {TitleModal} from "../../Common/TitleModal/TitleModal";

export const Login = () => {
    const dispatch = useDispatch()
    let error = useSelector<AppStateType>(state => state.login.error)
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    let [email, setEmail] = useState("3y6kob@mail.ru")
    let [password, setPassword] = useState("oTBuHTa977")
    let [rememberMe, setRememberMe] = useState(false)

    const [acc, SetAcc] = useState<boolean>(false)
    const [pass, SetPassword] = useState<boolean>(false)

    useEffect(() => {
        if (error === 'not correct password /ᐠ-ꞈ-ᐟ\\') SetPassword(true)
        if (error === "user not found /ᐠ-ꞈ-ᐟ\\") SetAcc(true)
        if (error === `not valid email/password /ᐠ-ꞈ-ᐟ\\`) {
            SetPassword(true)
            SetAcc(true)
        }
        dispatch(errorAC(null, false, false))
    }, [acc, pass, error])


    const onChangeHandlerEmail = (e: React.FormEvent<HTMLInputElement>) => {
        SetAcc(false)
        setEmail(e.currentTarget.value)
    }
    const onChangeHandlerPassword = (e: React.FormEvent<HTMLInputElement>) => {
        SetPassword(false)
        setPassword(e.currentTarget.value)
    }

    const onChangeHandlerRememberMe = (e: React.FormEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }


    const onClickHandler = useCallback(() => {
        dispatch(loginTC(email, password, rememberMe))
    }, [email, password, rememberMe])

    if (isAuth) return <Redirect to={'/profile'}/>;


    return (
        <div>

            <TitleModal title={'Account'}/>
            <SuperInputText
                error={acc ? 'not valid email' : null}
                onChange={onChangeHandlerEmail}
                value={email}
            />

            <TitleModal title={'Password'}/>
            <SuperInputText
                error={pass ? 'not valid password' : null}
                onChange={onChangeHandlerPassword}
                type={'password'}
                value={password}
            />
            <SuperCheckbox
                title={'remember Me'}
                onClick={onChangeHandlerRememberMe}
                checked={rememberMe}/>
            <SuperButton
                onClick={onClickHandler}
                title={'Login'}/>
            {error && <p className={"error"}>{` attention ${error}`}</p>}

        </div>

    )
}
