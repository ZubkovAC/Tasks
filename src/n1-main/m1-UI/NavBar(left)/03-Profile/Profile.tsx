import React, {useCallback} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {logoutTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import SuperButtonOld from "../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Search} from "../04-Packs/Search/search";
import {Pagination} from "../../Common/Pagination/Pagination";

export const Profile = () => {
    const dispatch = useDispatch()
    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)

    let avatar = useSelector<AppStateType,string>(state => state.login.avatar)
    let userName = useSelector<AppStateType, string>(state => state.login.userName)




    const onClickHandler = useCallback(() => {
        dispatch( logoutTC())
    },[dispatch])
    if(!isAuth) return <Redirect to={'/login'}/>;



    else {
        return (
            <div>
                <SuperInputTextOld />
                <SuperButtonOld title={'add'}/>
                <SuperButtonOld title={'v'}/>
                <SuperButtonOld title={'v'} transform={true}/>
                <SuperButton onClick={onClickHandler} title={'Logout'} />
                <h2>Profile</h2>
                <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"} width='900px' alt="avatar"/>
                <h3>Hello {userName}</h3>
            </div>
        )
    }
}
