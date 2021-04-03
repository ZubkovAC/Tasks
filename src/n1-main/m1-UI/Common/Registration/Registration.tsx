import React, {useState} from "react";
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import SuperCheckbox from "../InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import {AppStoreType} from "../../../m2-BLL/00-store/store";
import {RegistrationInitialStateType, registrationTC} from "../../../m2-BLL/01-reduser1/registration-reducer";
import {Login} from "../Login/Login";


export const Registration = () => {
    let isRegistred = useSelector<any>(state => state.registration.isRegistered)
    const dispatch = useDispatch()
    let [userName,setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const onChangeHandlerUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    const onChangeHandlerLogin = (e:  React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangeHandlerPassword = (e:  React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onClickHandler = () => {
        debugger
       dispatch( registrationTC(userName,email,password))
    }
    if (isRegistred) {
        return <Login/>
    }
    return (
        <div>
            <h2>temporary stub</h2>
            <h3>Your name</h3>
            <SuperInputText onChange={onChangeHandlerUsername} />
            <h3>Your email</h3>
            <SuperInputText onChange={onChangeHandlerLogin}/>
            <h3>your password</h3>
            <SuperInputText onChange={onChangeHandlerPassword}/>
            <button onClick={onClickHandler}>button for test</button>
            <SuperButton onClick={onClickHandler} title={'create'}/>
        </div>
    )
}