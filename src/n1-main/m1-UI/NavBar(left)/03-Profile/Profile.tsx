import React, {useEffect} from "react";
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import css from './Profile.module.css'
import {TableContents} from "../../Common/TableContents/TableContents";
import {getPacksTC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";
import {CreatePack} from "../04-Packs/CreatePack/CreatePack";
import {Avatar} from "./Avatar/Avatar";
import {CardPacksMapper} from "../04-Packs/Block/CardPacksMapper";


const CreatePackR = React.memo(CreatePack)


export const Profile = () => {

    const dispatch = useDispatch()
    const {
        search: {cardPages, pagesList, searchCardName},
        packs: {cardPacks, maxCard, cardPacksTotalCount},
        login: {isAuth, userID}
    } = useSelector((state: AppStateType) => ({
        search: state.search,
        packs: state.packs,
        login: state.login
    }))

    useEffect(() => {
        if (userID !== '0') dispatch(getPacksTC(searchCardName, 0, maxCard, '0updated', pagesList, cardPages, userID))
    }, [userID, cardPages, dispatch, maxCard, pagesList, searchCardName])


    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={css.Profile}>
            <div className={css.profile_img}>
                <Avatar />
                <h3 style={{color: 'white', display: 'flex', justifyContent: "center", margin: '20px'}}>
                    Card Pack :{cardPacksTotalCount}
                </h3>
            </div>

            <div className={css.tableProfile}>
                <CreatePackR userID={userID} update={userID}/>
                <TableContents name={'Name'} packUserName={'packUserName'} grade={'grade | rating'}
                               actions={'actions'}/>
                <CardPacksMapper userID={userID} cardPacks={cardPacks}/>
            </div>

        </div>
    )

}
