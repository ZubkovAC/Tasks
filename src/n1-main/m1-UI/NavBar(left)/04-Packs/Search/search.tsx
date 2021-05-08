import React, {useState} from "react";
import './styleSearch.css'
import {useDispatch, useSelector} from "react-redux";

import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {PardsTypeProps} from "../Packs";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperSelectOld from "../../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";




export const Search = () => {

    const  dispatch = useDispatch()

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let cardPacks = useSelector<AppStateType,Array<PardsTypeProps>>(state => state.packs.cardPacks)


    const [packName,setPackName]=useState<string>('')
    const [userId,setUserId]=useState<string>('')

    // next functional
    const [type,setType]=useState<string>('')
    const [userEmail,setUserEmail]=useState<string>('')
    //Ok
    const [cardsCountMax,setCardsCountMax]=useState<number>(99)
    const [cardsCountMin,setCardsCountMin]=useState<number>(0)
    const [filterSerch,setFilterSerch]=useState<string>('name')



    //search
    const onChangeHandler = (value:string) => {
        // if( filterSerch === 'type')setType(value)
        // if( filterSerch === 'userEmail')setUserEmail(value)
        if( filterSerch === 'name')setPackName(value)
        if( filterSerch === 'cardsCountMax')setCardsCountMax(+value)
        if( filterSerch === 'cardsCountMin')setCardsCountMin(+value)
        if( filterSerch === 'UserId')setUserId(value)
    }


    //button
    const onClickHandler = () =>{
        dispatch( getPacksTC(packName, cardsCountMin, cardsCountMax,
            type, pagesList, cardPages, userId,userEmail))
    }

    //Select
    const onChangeOption = (e:string) => {
        // if( e ==='type')setFilterSerch('type')
        // if( e ==='userEmail')setFilterSerch('userName')
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
    }

    return (
        <div style={{textAlign:'right'}}>

            <SuperSelectOld style={{display: 'inline', textAlign: 'right'}} onChangeOption={onChangeOption}
                            options={['name','UserId', 'cardsCountMax',"cardsCountMin"]}/>
                                                                                {/*'type', 'userEmail'*/}
            <SuperInputTextOld onChangeText={onChangeHandler} />
            <span style={{display:'inline'}}>
                <SuperButtonOld onClick={onClickHandler} title={'Search'}/>
            </span>
        </div>
    )
}

