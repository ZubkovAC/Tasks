import React, {useState} from "react";
import './styleSearch.css'
import {useDispatch, useSelector} from "react-redux";

import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {getPacksTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import SuperSelectOld from "../../../Common/InputAndButton/c5-SuperSelectOld/SuperSelectOld";


export const Search = () => {

    const dispatch = useDispatch()

    let pagesList = useSelector<AppStateType, number>(state => state.search.pagesList)
    let cardPages = useSelector<AppStateType, number>(state => state.search.cardPages)


    const [name, setName] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    // next functional
    const [type, setType] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    //Ok
    const [cardsCountMax, setCardsCountMax] = useState<number>(99)
    const [cardsCountMin, setCardsCountMin] = useState<number>(0)
    const [filterSerch, setFilterSerch] = useState<string>('name')


    const [value, setValue] = useState<string>('')


    //search
    const onChangeHandler = (value: string) => {
        if (filterSerch === 'UserId') setUserId(value)
        if (filterSerch === 'name') setName(value)
        if (filterSerch === 'cardsCountMax') setCardsCountMax(+value)
        if (filterSerch === 'cardsCountMin') setCardsCountMin(+value)
        setValue(value)
    }


    //button
    const onClickHandler = () => {
        dispatch(getPacksTC(name, cardsCountMin, cardsCountMax,
            type, pagesList, cardPages, userId, ''))
    }


    //Select
    const onChangeOption = (e: string) => {
        if (e === 'name') setFilterSerch('name')
        if (e === 'cardsCountMax') setFilterSerch('cardsCountMax')
        if (e === 'cardsCountMin') setFilterSerch('cardsCountMin')
        if (e === 'UserId') setFilterSerch('UserId')
        setType('')
        setUserEmail('')
        setName('')
        setUserId('')
        setCardsCountMax(99)
        setCardsCountMin(0)
        setValue('')
    }

    return (
        <div style={{textAlign: 'right'}}>

            <SuperSelectOld
                style={{display: 'inline'}}
                onChangeOption={onChangeOption}
                options={['UserId', 'cardsCountMax', "cardsCountMin"]}/>
            <SuperInputTextOld
                value={value}
                onChangeText={onChangeHandler}/>
            <SuperButtonOld
                onClick={onClickHandler}
                title={'Search'}/>
        </div>
    )
}

