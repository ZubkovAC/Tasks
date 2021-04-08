import React, {useCallback, useState} from "react";
import "./registration.css"
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registrationTC,validationEmailAC, validationPasswordAC} from "../../../m2-BLL/01-reduser1/registration-reducer";
import {Login} from "../Login/Login";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Preloader} from "../Accets/Preloader";

export const regForEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Registration =React.memo(() => {
    console.log("Registration is render")
    let validationEmail =useSelector<AppStateType>(state=>state.registration.validationEmail)
    let validationPassword = useSelector<AppStateType>(state=>state.registration.validationPassword)
    let isRegistred = useSelector<AppStateType>(state => state.registration.isRegistered)
    let error = useSelector<AppStateType>(state => state.registration.error)
    let isFetching = useSelector<AppStateType>(state => state.registration.isFetching)
    const dispatch = useDispatch()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [checkOnBlurEmail, setCheckOnBlurEmail] = useState(false)
    let[checkOnBlurPassword,setCheckOnBlurPassword]=useState(false)


    const handleBlurPassword = useCallback((e:React.FormEvent<HTMLInputElement>)=>{
        setCheckOnBlurPassword(true)
    },[setCheckOnBlurPassword])

    const handleBlurEmail=useCallback((e:React.FormEvent<HTMLInputElement>) =>{
        setCheckOnBlurEmail(true)
    },[setCheckOnBlurEmail])

    const onChangeHandlerLogin = useCallback((e:  React.FormEvent<HTMLInputElement>) => {
        if(regForEmail.test(e.currentTarget.value)){
            dispatch(validationEmailAC(false))
            setEmail(e.currentTarget.value)
        }
        else if(!e.currentTarget.onblur){
            dispatch(validationEmailAC(true))
        }
    },[dispatch])

    const onChangeHandlerPassword =useCallback((e:React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.length>7){
            setPassword(e.currentTarget.value)
            dispatch(validationPasswordAC(false))
        }
        else if(!e.currentTarget.onblur){
            dispatch(validationPasswordAC(true))
        }
    },[dispatch])

    const onClickHandler = useCallback(() => {
        dispatch( registrationTC(email,password))
    },[dispatch])

    if (isRegistred) {
        return <Login/>
    }

    return (
        <div>
            <h2>temporary stub</h2>
            {isFetching&&<Preloader/>}
            <h3>Your email</h3>
            {validationEmail&&checkOnBlurEmail&&  <span className={"error"}>email is incorrect</span>}
            <SuperInputText onBlur={handleBlurEmail} onChange={onChangeHandlerLogin}/>
            <h3>your password</h3>
            {validationPassword&&checkOnBlurPassword&& <span className={"error"}>Password must be more than 7 characters</span>}

            <SuperInputText onBlur={handleBlurPassword} onChange={onChangeHandlerPassword}/>
            {error && <p className={"error"}>{` attention ${error}`}</p>}
            <SuperButton disabled={!!isFetching} onClick={onClickHandler} title={'create'}/>
        </div>
    )
})