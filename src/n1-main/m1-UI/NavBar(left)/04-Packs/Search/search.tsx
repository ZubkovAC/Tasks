import React, {ChangeEvent, useState} from "react";
import './styleSearch.css'
import {useDispatch, useSelector} from "react-redux";
import {cardNameAC} from "../../../../m2-BLL/04-reducer-search/reducer-search";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {PardsTypeProps} from "../Packs";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperSelectOld from "../../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";
import {log} from "util";



export const Search = () => {

    const  dispatch = useDispatch()

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let cardPacks = useSelector<AppStateType,Array<PardsTypeProps>>(state => state.packs.cardPacks)

    const [type,setType]=useState<string>('')
    const [userName,setUserName]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [userId,setUserId]=useState<string>('')
    const [cardsCount,setCardsCount]=useState<string>('')

    const [filterSerch,setFilterSerch]=useState<string>('name')



    //search
    const onChangeHandler = (value:string) => {
        if( filterSerch === 'name')setName(value)
        if( filterSerch === 'type')setType(value)
        if( filterSerch === 'userName')setUserName(value)
        if( filterSerch === 'cardsCount')setCardsCount(value)
        if( filterSerch === 'UserId')setUserId(value)

        // dispatch(cardNameAC(value))
        // /dispatch( getPacksTC(searchCardName, 0, 99, '0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))
    }


    //button
    const onClickHandler = () =>{
        // cardPacks.filter((pack)=>pack.name===searchCardName)
        dispatch( getPacksTC(name, 0, 99,
            type, pagesList, cardPages, userId))
    }

    //selector
    const onChangeOption = (e:string) => {
        if( e ==='name')setFilterSerch('name')
        if( e ==='type')setFilterSerch('type')
        if( e ==='userName')setFilterSerch('userName')
        if( e ==='cardsCount')setFilterSerch('cardsCount')
        if( e ==='UserId')setFilterSerch('UserId')
        setType('')
        setUserName('')
        setName('')
        setUserId('')
        setCardsCount('')
    }
                                                                        // super button  фальш
    return (
        <div style={{textAlign:'right'}}>

            <SuperSelectOld style={{display: 'inline', textAlign: 'right'}} onChangeOption={onChangeOption}
                            options={['name','type', 'userName',  'UserId', 'cardsCount']}/>

            <SuperInputTextOld onChangeText={onChangeHandler} />
            <span style={{display:'inline'}}>
                <SuperButtonOld onClick={onClickHandler} title={'Search'}/>
            </span>
        </div>
    )
}

