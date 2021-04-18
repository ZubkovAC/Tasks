import React from "react";
import './styleSearch.css'
import {useDispatch} from "react-redux";
import {cardNameAC} from "../../../../m2-BLL/04-reducer-search/reducer-search";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";



export const Search = () => {
  const  dispatch = useDispatch()
    const onChangeHandler = (value:string) => {
        dispatch(cardNameAC(value))
    }
                                                                        // super button  фальш
    return (
        <div>
            <SuperInputTextOld onChangeText={onChangeHandler} />
            <span style={{display:'inline'}}><SuperButtonOld title={'Search'}/></span>
        </div>
    )
}

