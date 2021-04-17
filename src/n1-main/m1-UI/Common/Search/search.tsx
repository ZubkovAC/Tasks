import React, {ChangeEvent} from "react";
import './styleSearch.css'
import {useDispatch} from "react-redux";
import {cardNameAC} from "../../../m2-BLL/04-reducer-search/search-reducer";
import SuperInputTextOld from "../InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../InputAndButton/с2-SuperBottonOld/SuperButtonOld";


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