import React, {useCallback, useState} from "react";
import pencil from "../../../Common/Accets/pencil.png";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {updateAccTC} from "../../../../m2-BLL/Login-reducer";
import {useDispatch} from "react-redux";

const SuperInputTextOldR = React.memo(SuperInputTextOld)
const SuperButtonOldR = React.memo(SuperButtonOld)

type ModeUserNameType = {
    userName:string
    avatar:string
    modePosition:(a:string)=>void
}

export const ModeUserName = ({userName,avatar,modePosition}:ModeUserNameType) => {


    const dispatch = useDispatch()
    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>(userName)

    const updateProfile = () => {
        setEdit(true)
    }
    const updateName = (e: string) => {
        setName(e)
    }
    const updateTC = useCallback(() => {
        dispatch(updateAccTC(name, avatar))
        setEdit(false)
    }, [dispatch, name, avatar])
    return(
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
    )
}