import React, {ChangeEvent} from "react";
import './styleSearch.css'
import {useDispatch} from "react-redux";
import {cardNameAC} from "../../../m2-BLL/04-reducer-search/search-reducer";


export const Search = () => {
  const  dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(cardNameAC(e.currentTarget.value))
    }
    return (
        <div>
            <input onChange={onChangeHandler} type={'text'}/>
            <button>Search</button>
        </div>
    )
}