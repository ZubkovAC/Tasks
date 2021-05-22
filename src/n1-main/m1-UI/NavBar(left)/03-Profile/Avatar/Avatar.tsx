import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store";
import {ModePhoto} from "./ModePhoto";
import {ModeUserName} from "./ModeUserName";


export const Avatar = () => {

    const {userName, avatar} = useSelector((state: AppStateType) => state.login)

    // const [mode ,setMode] = useState<string>('')

    const modePosition = (e:string) =>{

    }


    return <div>
        <ModePhoto
            avatar={avatar}
            userName={userName}
            modePosition={modePosition}
        />
            <ModeUserName
                userName={userName}
                avatar={avatar}
                modePosition={modePosition}
            />
    </div>


}