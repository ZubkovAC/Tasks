import React, {useCallback, useState} from "react";
import "./registration.css"

import {useDispatch, useSelector} from "react-redux";
import {
    registrationTC,
    validationEmailAC,
    validationPasswordAC
} from "../../../m2-BLL/01-reduser1/registration-reducer";

import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Preloader} from "../../Common/Accets/Preloader";
import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {Login} from "../01-Login/Login";
import {TitleModal} from "../../Common/TitleModal/TitleModal";

//@ts-ignore
export const regForEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Registration = React.memo(() => {

    let {validationEmail, validationPassword, isRegistered, isFetching} = useSelector((state: AppStateType) => state.registration)
    let error = useSelector<AppStateType>(state => state.registration.error)

    const dispatch = useDispatch()

    let [email, setEmail] = useState("")

    let [password, setPassword] = useState("")
    let [passwordRepeat, setPasswordRepeat] = useState("")   // password 2
    let [checkOnBlurEmail, setCheckOnBlurEmail] = useState(false)
    let [checkOnBlurPassword, setCheckOnBlurPassword] = useState(false)
    let [checkOnBlurPasswordRepeat, setCheckOnBlurPasswordRepeat] = useState(false) // button next


    const handleBlurPassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setCheckOnBlurPasswordRepeat(true)
    }, [setCheckOnBlurPassword])
    const handleBlurPasswordRepeat = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setCheckOnBlurPassword(true)
    }, [setCheckOnBlurPassword])


    const handleBlurEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setCheckOnBlurEmail(true)
    }, [setCheckOnBlurEmail])

    const onChangeHandlerLogin = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (regForEmail.test(e.currentTarget.value)) {
            dispatch(validationEmailAC(false))
            setEmail(e.currentTarget.value)
        } else if (!e.currentTarget.onblur) {
            dispatch(validationEmailAC(true))
        }
    }, [dispatch])

    const onChangeHandlerPassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 7) {
            setPassword(e.currentTarget.value)
            dispatch(validationPasswordAC(false))
        } else if (!e.currentTarget.onblur) {
            dispatch(validationPasswordAC(true))
        }
    }, [dispatch])
    const onChangeHandlerPasswordRepeat = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 7) {
            setPasswordRepeat(e.currentTarget.value)
        } else if (!e.currentTarget.onblur) {

        }
    }, [dispatch])

    const onClickHandler = useCallback(() => {
        dispatch(registrationTC(email, password))
    }, [email, password])

    if (isRegistered) {
        return <Login/>
    }

    return (
        <div >

                <h2>temporary stub</h2>
                {isFetching && <Preloader/>}
                <TitleModal title={'Your email'}/>
                {validationEmail && checkOnBlurEmail && <span className={"error"}>email is incorrect</span>}
                <SuperInputText
                    onBlur={handleBlurEmail}
                    onChange={onChangeHandlerLogin}
                />
                <TitleModal title={'your password'}/>
                {validationPassword && checkOnBlurPassword &&
                <span className={"error"}>At least 7 characters</span>}

                <SuperInputText
                    onBlur={handleBlurPassword}
                    onChange={onChangeHandlerPassword}
                />
                <SuperInputText
                    onBlur={handleBlurPasswordRepeat}
                    onChange={onChangeHandlerPasswordRepeat}
                />
                {error && <p className={"error"}>{` attention ${error}`}</p>}
                <SuperButton
                    disabled={password.length < 7 || password !== passwordRepeat}
                    onClick={onClickHandler}
                    title={'create'}
                />

        </div>
    )
})