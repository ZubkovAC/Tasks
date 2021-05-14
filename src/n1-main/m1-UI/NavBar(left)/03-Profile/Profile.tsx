import React, {useCallback} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {logoutTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import css from './Profile.module.css'

export const Profile = () => {
    const dispatch = useDispatch()
    let {avatar ,userName ,publicCardPacksCount, isAuth} = useSelector((state:AppStateType) => state.login)


    const onClickHandler = useCallback(() => {
        dispatch( logoutTC())
    },[dispatch])
    if(!isAuth) return <Redirect to={'/login'}/>;

    else {
        return (
            <div>
                <h2>Profile</h2>
                <SuperButton onClick={onClickHandler} title={'Logout'} />
                <div className={css.profile_img}>
                    <h2 style={{color:'wheat'}}>Hello {userName}</h2>
                    <h3>Card Pack Count:{publicCardPacksCount}</h3>
                    <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"} alt="avatar"/>

                </div>

            </div>
        )
    }
}
