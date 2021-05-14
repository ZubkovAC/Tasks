import React, {useState} from "react";
import './styleSearch.css'
import {useDispatch, useSelector} from "react-redux";

import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import SuperSelectOld from "../../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";




export const Search = () => {

    const  dispatch = useDispatch()

    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)



    const [packName,setPackName]=useState<string>('')
    const [userId,setUserId]=useState<string>('')

    // next functional
    const [type,setType]=useState<string>('')
    const [userEmail,setUserEmail]=useState<string>('')
    //Ok
    const [cardsCountMax,setCardsCountMax]=useState<number>(99)
    const [cardsCountMin,setCardsCountMin]=useState<number>(0)
    const [filterSerch,setFilterSerch]=useState<string>('name')


    const [value,setValue]=useState<string>('')



    //search
    const onChangeHandler = (value:string) => {
        if( filterSerch === 'name')setPackName(value)
        if( filterSerch === 'cardsCountMax')setCardsCountMax(+value)
        if( filterSerch === 'cardsCountMin')setCardsCountMin(+value)
        if( filterSerch === 'UserId')setUserId(value)
        setValue(value)
    }


    //button
    const onClickHandler = () =>{
        dispatch( getPacksTC(packName, cardsCountMin, cardsCountMax,
            type, pagesList, cardPages, userId,userEmail))
    }


    //Select
    const onChangeOption = (e:string) => {
        if( e ==='name')setFilterSerch('name')
        if( e ==='cardsCountMax')setFilterSerch('cardsCountMax')
        if( e ==='cardsCountMin')setFilterSerch('cardsCountMin')
        if( e ==='UserId')setFilterSerch('UserId')
        setType('')
        setUserEmail('')
        setPackName('')
        setUserId('')
        setCardsCountMax(99)
        setCardsCountMin(0)
        setValue('')
    }

    return (
        <div style={{textAlign:'right'}}>

            <SuperSelectOld style={{display: 'inline', textAlign: 'right'}} onChangeOption={onChangeOption}
                            options={['name','UserId', 'cardsCountMax',"cardsCountMin"]}/>
            <SuperInputTextOld value={value} onChangeText={onChangeHandler} />
            <span style={{display:'inline'}}>
                <SuperButtonOld onClick={onClickHandler} title={'Search'}/>
            </span>
        </div>
    )
}

