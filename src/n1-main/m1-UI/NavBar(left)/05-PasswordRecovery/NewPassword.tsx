import React, {useCallback, useState} from "react";
import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {newPasswordTC, validationPasswordAC} from "../../../m2-BLL/01-reduser1/registration-reducer";
import {useParams} from "react-router-dom";
import {TitleModal} from "../../Common/TitleModal/TitleModal";

export const NewPassword = () => {

    let {token} = useParams<{ token: string }>()

    let {error, messagePass} = useSelector((state: AppStateType) => state.registration)
    const dispatch = useDispatch()
    let [password, setPassword] = useState("")
    let [passwordRepeat, setPasswordRepeat] = useState("")
    let [checkOnBlurPassword, setCheckOnBlurPassword] = useState(false)
    let [checkOnBlurPasswordRepeat, setCheckOnBlurPasswordRepeat] = useState(false) // button next


    const onClickHandler = useCallback(() => {
        dispatch(newPasswordTC(password, token))
    }, [password,dispatch,token])

    const onChangeHandlerPassword = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 7) {
            setPassword(e.currentTarget.value)
            dispatch(validationPasswordAC(false))
        } else if (!e.currentTarget.onblur) {
            dispatch(validationPasswordAC(true))
        }
    }


    const onChangeHandlerPasswordRepeat = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 7) {
            setPasswordRepeat(e.currentTarget.value)
        } else if (!e.currentTarget.onblur) {

        }
    }
    const handleBlurPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setCheckOnBlurPasswordRepeat(true)
    }
    const handleBlurPasswordRepeat =(e: React.FormEvent<HTMLInputElement>) => {
        setCheckOnBlurPassword(true)
    }


    return (
        <div>
            {messagePass
                ?<TitleModal title={messagePass}/>
                :<div>
                    <TitleModal title={'new Password'}/>
                    <SuperInputText
                        onBlur={handleBlurPassword}
                        onChange={onChangeHandlerPassword}
                    />
                    <TitleModal title={'repeat pass'}/>
                    <SuperInputText
                        onBlur={handleBlurPasswordRepeat}
                        onChange={onChangeHandlerPasswordRepeat}
                    />
                    {error && <p className={"error"}>{` attention ${error}`}</p>}
                    {checkOnBlurPassword && checkOnBlurPasswordRepeat &&
                        < SuperButton

                        disabled={password.length < 7 || password !== passwordRepeat}
                        onClick={onClickHandler}
                        title={'create'}
                        />
                    }
                </div>
            }

        </div>)
}