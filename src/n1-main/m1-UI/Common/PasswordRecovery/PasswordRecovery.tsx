import React from "react";
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {passwordAC, resPasswordTC} from "../../../m2-BLL/03-reducer-newPassword/reverseRassword";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Redirect} from "react-router-dom";
import {RoutePath} from "../../../../App";


export const PasswordRecovery = () => {


    const dispatch = useDispatch()
    let password = useSelector<AppStateType, string>(state => state.newPassword.password)
    let resetPasswordsToken = useSelector<AppStateType, string>(state => state.newPassword.resetPasswordsToken)
    let redirect = useSelector<AppStateType, boolean>(state => state.newPassword.redirect)


    const unpdatePassword = (text: string) => {
        dispatch(passwordAC(text))
    }

    const recovery = () => {
        dispatch(resPasswordTC(password, resetPasswordsToken))
    }

    if (redirect) {
        return (
            <Redirect from={RoutePath.LOGIN} to={RoutePath.LOGIN}/>
        )
    }
    else{
        return (
            <div>
                <h2>temporary stub</h2>
                <div>new Password</div>
                <SuperInputText onChangeText={unpdatePassword}/>
                <SuperButton title={"recovery"} onClick={recovery}/>
            </div>
        )

    }
}
