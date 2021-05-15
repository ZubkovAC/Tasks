import React, {useCallback, useState} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import {logoutTC, updateAccTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import css from './Profile.module.css'
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";

export const Profile = () => {
    const dispatch = useDispatch()
    let {avatar, userName, publicCardPacksCount, isAuth} = useSelector((state: AppStateType) => state.login)


    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>(userName)
    const [newAvatar, setNewAvatar] = useState<string>(avatar)

    const onClickHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    const updateProfile = () => {
        setEdit(true)
    }
    const updateName = (e: string) => {
        setName(e)
    }
    const updateAvatar = (e: string) => {
        setNewAvatar(e)
    }
    const updateTC = () => {
        dispatch(updateAccTC(name, newAvatar))
        setEdit(false)
    }

    if (!isAuth) return <Redirect to={'/login'}/>;


    else {
        return (
            <div>
                <h2>Profile</h2>
                {edit ?
                    <div>
                        <h3>NewName:</h3>
                        <SuperInputTextOld
                            placeholder={'terminator'}
                            title={name}
                            onChangeText={updateName}
                        />

                        <h3>NewAvatar:</h3>
                        <SuperInputTextOld
                            placeholder={'https://.....'}
                            title={avatar}
                            onChangeText={updateAvatar}
                        />
                        <SuperButtonOld
                            onClick={updateTC}
                            title={'update'}
                        />
                    </div>
                    : <div>
                        <span style={{float: 'right'}}>
                            <SuperButton onClick={onClickHandler} title={'Logout'}/>
                        </span>
                        <SuperButton
                            onClick={updateProfile}
                            title={'update'}
                        />
                        <div className={css.profile_img}>
                            <h2>Hello:</h2>
                            <h2 style={{color: 'wheat'}}> {userName}</h2>
                            <h3 style={{color: 'white'}}>Card Pack Count:{publicCardPacksCount}</h3>
                            <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"}
                                 alt="avatar"/>

                        </div>
                    </div>
                }
            </div>
        )
    }
}
