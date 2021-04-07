import React, {useState} from "react";
import "./registration.css"
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RegistrationInitialStateType, registrationTC} from "../../../m2-BLL/01-reduser1/registration-reducer";
import {Login} from "../Login/Login";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Preloader} from "../Accets/Preloader";


export const Registration = () => {
    let isRegistred = useSelector<AppStateType>(state => state.registration.isRegistered)
    let error = useSelector<AppStateType>(state => state.registration.error)
    let isFetching = useSelector<AppStateType>(state => state.registration.isFetching)
    const dispatch = useDispatch()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const onChangeHandlerLogin = (e:  React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangeHandlerPassword = (e:  React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onClickHandler = () => {
       dispatch( registrationTC(email,password))
    }
    if (isRegistred) {
        return <Login/>
    }

    return (
        <div>
            <h2>temporary stub</h2>
            {isFetching&&<Preloader/>}
            <h3>Your email</h3>
            <SuperInputText onChange={onChangeHandlerLogin}/>
            <h3>your password</h3>
            <SuperInputText onChange={onChangeHandlerPassword}/>
            {error && <p className={"error"}>{` attention ${error}`}</p>}
            <SuperButton disabled={isFetching?true:false} onClick={onClickHandler} title={'create'}/>
        </div>
    )
}