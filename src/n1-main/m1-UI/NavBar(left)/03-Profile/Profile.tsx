import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {updateAccTC} from "../../../m2-BLL/02-reducer-login/reducer-login";
import css from './Profile.module.css'
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {TitleModal} from "../../Common/TitleModal/TitleModal";
import {TableContents} from "../../Common/TableContents/TableContents";
import {Block} from "../04-Packs/Block/Block";
import {getPacksTC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";
import {CreatePack} from "../04-Packs/CreatePack/CreatePack";


export const Profile = () => {
    const dispatch = useDispatch()
    let {avatar, userName, publicCardPacksCount, isAuth,me, userID} = useSelector((state: AppStateType) => state.login)
    let {preloader, cardPacks, maxCard} = useSelector((state: AppStateType) => state.packs)
    let {cardPages, pagesList, searchCardName} = useSelector((state: AppStateType) => state.search)

    useEffect(() => {
        if (userID!=='0') dispatch(getPacksTC(searchCardName, 0, maxCard, '0updated', pagesList, cardPages, userID))
    }, [userID])

    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>(userName)
    const [newAvatar, setNewAvatar] = useState<string>(avatar)


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
            <div className={css.Profile}>
                {edit ?
                    <div>
                        <TitleModal title={'NewName:'}/>
                        <SuperInputTextOld
                            placeholder={'terminator'}
                            title={name}
                            onChangeText={updateName}
                        />


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
                    : <div className={css.profile_img}>
                        <div >
                            <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"}
                                 alt="avatar"/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <TitleModal title={userName}/>

                            </div>
                            <h3 style={{color: 'white', display: 'flex', justifyContent: "center", margin: '20px'}}>
                                Card Pack Count:{publicCardPacksCount}
                            </h3>

                        </div>
                    </div>
                }


                <div className={css.tableProfile}>
                    <CreatePack  userID={userID}/>
                    <TableContents name={'Name'} packUserName={'packUserName'} grade={'grade | rating'}
                                   actions={'actions'}/>
                    {cardPacks.map(t => {
                        return <Block
                            key={t._id} name={t.name} rating={t.rating}
                            userName={t.user_name} created={t.created}
                            id={t._id}
                            user_id={t.user_id}
                            cardsCount={t.cardsCount}
                            grade={t.grade}
                        />
                    })}
                </div>

            </div>
        )
    }
}
