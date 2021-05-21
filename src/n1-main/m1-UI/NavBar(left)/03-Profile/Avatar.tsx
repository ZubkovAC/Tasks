import React, {useCallback, useState} from "react";
import css from "./Profile.module.css";
import pencil from "../../Common/Accets/pencil.png";
import {Modal} from "../../Common/Modal/Modal";
import {TitleModal} from "../../Common/TitleModal/TitleModal";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import {updateAccTC} from "../../../m2-BLL/02-reducer-login/reducer-login";

const SuperInputTextOldR = React.memo(SuperInputTextOld)
const SuperButtonOldR = React.memo(SuperButtonOld)

export const Avatar = () => {
    const dispatch = useDispatch()
    const {userName, avatar} = useSelector((state: AppStateType) => state.login)
    const [modePhoto, setModePhoto] = useState<boolean>(false)

    const [name, setName] = useState<string>(userName)
    const [edit, setEdit] = useState<boolean>(false)
    const [newAvatar, setNewAvatar] = useState<string>(avatar)

    const updateProfile = () => {
        setEdit(true)
    }
    const updateProfileF = () => {
        setModePhoto(false)
    }
    const updatePhoto = () => {
        setModePhoto(true)
    }

    const updateName = (e: string) => {
        setName(e)
    }
    const onChangeText = (e: string) => {
        setNewAvatar(e)
    }
    const updatePhotoUpload = () => {
        setModePhoto(false)
        dispatch(updateAccTC(name, newAvatar))
    }
    const updateTC = useCallback(() => {
        dispatch(updateAccTC(name, newAvatar))
        setEdit(false)
    }, [dispatch, name, newAvatar])
    return (
        <div>
            {modePhoto
                ? <div>
                    <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"}
                         alt="avatar"/>
                    <div onClick={updatePhoto} className={css.butPhoto}>
                        <img src={pencil} alt="pencil"
                             className={css.butPhoto}
                        />
                    </div>
                    <Modal setActive={updateProfileF} active={modePhoto}>
                        <TitleModal title={'Please adress for https://....'}/>
                        <br/>
                        <SuperInputTextOldR value={avatar} onChangeText={onChangeText}/>

                        <SuperButtonOldR onClick={updatePhotoUpload} title={'upload'}/>
                    </Modal>
                </div>
                : <>
                    <img src={avatar ? avatar : "https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg"}
                         alt="avatar"/>
                    <div onClick={updatePhoto} className={css.butPhoto}>
                        <img src={pencil} alt="pencil"
                             className={css.butPhoto}
                        />
                    </div>
                </>
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {edit
                    ?
                    <>
                        <div style={{marginTop: '10px'}}>
                            <SuperButtonOldR onClick={updateTC} title={'update'}/>
                        </div>
                        <SuperInputTextOldR value={name} onChangeText={updateName}/>
                    </>
                    :
                    <>
                        <button onClick={updateProfile}>
                            <img src={pencil} alt="pencil"
                                 style={{width: '18px', margin: '0px', borderRadius: '0px', height: '18px'}}/>
                        </button>
                        <TitleModal title={userName}/>
                    </>
                }
            </div>
        </div>
    )
};