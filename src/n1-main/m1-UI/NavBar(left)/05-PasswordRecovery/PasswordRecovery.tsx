import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resPasswordTC} from "../../../m2-BLL/ReverseRassword-reducer";
import {AppStateType} from "../../../m2-BLL/00-store";
import {Redirect} from "react-router-dom";
import {RoutePath} from "../../../../App";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from "./PasswordRecovery.module.css";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {TitleModal} from "../../Common/TitleModal/TitleModal";


export const PasswordRecovery = () => {


    const dispatch = useDispatch()
    let { redirect, message} = useSelector((state:AppStateType) => state.resPassword)
    const [mail, setMail] = useState<string>('nya-admin@nya.nya')


    const unpdateMail = (value: string) => {
        setMail(value)
    }

    const recoveryMail = () => {
            dispatch(resPasswordTC(mail, 'hello'))
    }

    if (redirect) {
        return (
            <Redirect from={RoutePath.LOGIN} to={RoutePath.LOGIN}/>
        )
    } else {

        return (
            <div>
                {message
                    ?<TitleModal title={message} />
                    :
                    <div>
                        <h2>Recovery</h2>
                        <span className={css.span}>email</span>
                        <SuperInputTextOld onChangeText={unpdateMail} title={mail}/>
                        <div style={{height: '10px'}}></div>
                        <SuperButtonOld title={"recovery"} onClick={recoveryMail}/>
                        {/*{SplitFlap &&*/}
                        {/*<div style={{margin: "20px"}}>*/}
                        {/*    <span className={css.span}>password</span>*/}
                        {/*    <SuperInputTextOld onChangeText={unpdateFirstPassword} title={pass}/>*/}
                        {/*    <div style={{height: '10px'}}></div>*/}
                        {/*    <span className={css.span}>password</span>*/}
                        {/*    <SuperInputTextOld onChangeText={unpdateLastPassword} title={pass1}/>*/}
                        {/*    <div style={{height: '10px'}}></div>*/}
                        {/*    <SuperButtonOld title={"recovery"} onClick={recoveryPass}/>*/}
                        {/*</div>*/}
                        {/*}*/}
                    </div>

                }

            </div>
        )
    }
}
