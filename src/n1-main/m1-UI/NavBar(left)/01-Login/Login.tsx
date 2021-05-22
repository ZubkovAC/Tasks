import React, {useState, useEffect, useCallback} from "react";
import "./login.css"

import {useDispatch, useSelector} from "react-redux";
import {errorAC, loginTC} from "../../../m2-BLL/Login-reducer";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../../m2-BLL/00-store";
import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {TitleModal} from "../../Common/TitleModal/TitleModal";


const SuperInputTextR = React.memo(SuperInputText)
const SuperCheckboxR = React.memo(SuperCheckbox)
const SuperButtonR = React.memo(SuperButton)
const TitleModalR = React.memo(TitleModal)



export const Login =() => {

    const dispatch = useDispatch()
    let error = useSelector<AppStateType>(state => state.login.error)
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    let [email, setEmail] = useState("3y6kob@mail.ru")
    let [password, setPassword] = useState("qwertyui")
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
    }, [acc, pass, error,dispatch])


    const onChangeHandlerEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        SetAcc(false)
        setEmail(e.currentTarget.value)
    },[])

    const onChangeHandlerPassword =useCallback((e: React.FormEvent<HTMLInputElement>) => {
        SetPassword(false)
        setPassword(e.currentTarget.value)
    },[])

    const onChangeHandlerRememberMe = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    },[])


    const onClickHandler = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

    if (isAuth) return <Redirect to={'/profile'}/>;


    return (
        <div>

            <TitleModalR title={'Account'}/>
            <SuperInputTextR
                error={acc ? 'not valid email' : null}
                onChange={onChangeHandlerEmail}
                value={email}
            />

            <TitleModalR title={'Password'}/>
            <SuperInputTextR
                error={pass ? 'not valid password' : null}
                onChange={onChangeHandlerPassword}
                type={'password'}
                value={password}
            />
            <SuperCheckboxR
                title={'remember Me'}
                onClick={onChangeHandlerRememberMe}
                checked={rememberMe}/>
            <SuperButtonR
                onClick={onClickHandler}
                title={'Login'}/>
            {error && <p className={"error"}>{` attention ${error}`}</p>}

        </div>

    )
}
