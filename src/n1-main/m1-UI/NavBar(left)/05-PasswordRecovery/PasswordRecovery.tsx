import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { resPasswordTC} from "../../../m2-BLL/03-reducer-newPassword/reducer-reverseRassword";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {Redirect} from "react-router-dom";
import {RoutePath} from "../../../../App";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from "./PasswordRecovery.module.css";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";


export const PasswordRecovery = () => {


    const dispatch = useDispatch()
    let redirect = useSelector<AppStateType, boolean>(state => state.resPassword.redirect)

    const [mail,setMail]=useState<string>('nya-admin@nya.nya')
    const [SplitFlap,setSplitFlap]=useState<boolean>(false)
    const [pass,setPass]=useState<string>('1qazxcvBG')
    const [pass1,setPass1]=useState<string>('1qazxcvBG')


    const unpdateMail =useCallback((value:string)=>  {
        setMail(value)
    },[mail])

    const unpdateFirstPassword =useCallback((value:string)=> {
        setPass(value)
    },[pass])

    const unpdateLastPassword = useCallback( (value:string)=> {
        setPass1(value)
    },[setPass1])

    const recoveryMail = useCallback( ()=> {
        if (mail==='nya-admin@nya.nya'){
            setSplitFlap(true)
            dispatch(resPasswordTC(mail,'hello','begu'))   //alert reducer reverseRassword
        }else {
            setSplitFlap(false)
        }
    },[mail])

    const recoveryPass = useCallback( ()=> {
        if (pass===pass1){
        }
    },[pass,pass1])

    if (redirect) {
        return (
            <Redirect from={RoutePath.LOGIN} to={RoutePath.LOGIN}/>
        )
    }

    else{

        return (
            <div className={css.recovery}>
                <div className={css.recovery_box}>
                    <h2>Recovery</h2>
                    <span className={css.span}  >email</span>
                    <SuperInputTextOld onChangeText={unpdateMail} title={mail}/>
                    <div style={{height:'10px'}}></div>
                    <SuperButtonOld title={"recovery"} onClick={recoveryMail}/>
                    {SplitFlap &&
                    <div style={{margin:"20px"}}>
                        <span className={css.span}  >password</span>
                        <SuperInputTextOld onChangeText={unpdateFirstPassword} title={pass} />
                        <div style={{height:'10px'}}></div>
                        <span className={css.span}  >password</span>
                        <SuperInputTextOld onChangeText={unpdateLastPassword} title={pass1} />
                        <div style={{height:'10px'}}></div>
                        <SuperButtonOld title={"recovery"} onClick={recoveryPass}/>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
