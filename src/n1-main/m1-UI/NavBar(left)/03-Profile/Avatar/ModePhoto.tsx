import React, {useState} from "react";
import css from "../Profile.module.css";
import pencil from "../../../Common/Accets/pencil.png";
import {Modal} from "../../../Common/Modal/Modal";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {updateAccTC} from "../../../../m2-BLL/02-reducer-login/reducer-login";
import {useDispatch} from "react-redux";

const SuperInputTextOldR = React.memo(SuperInputTextOld)
const SuperButtonOldR = React.memo(SuperButtonOld)
type ModePhotoType = {
    avatar:string
    userName:string
    modePosition:(a:string)=>void
}

export const ModePhoto = ({avatar,userName}:ModePhotoType) => {

    const dispatch = useDispatch()

    const [newAvatar, setNewAvatar] = useState<string>(avatar)
    const [modePhoto, setModePhoto] = useState<boolean>(false)
    const updatePhoto = () => {
        setModePhoto(true)
    }
    const updateProfileF = () => {
        setModePhoto(false)
    }
    const onChangeText = (e: string) => {
        setNewAvatar(e)
    }
    const updatePhotoUpload = () => {
        setModePhoto(false)
        dispatch(updateAccTC(userName, newAvatar))
    }
     return(
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
         </div>
     )
}