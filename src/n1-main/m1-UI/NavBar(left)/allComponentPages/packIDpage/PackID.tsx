import React, {useEffect} from "react";
import {
    CardArrayResponseType,
    createCardTC,
    deleteCardTC,
    getCardsTC,
    inputIdAC,
} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import { useParams } from "react-router-dom";


interface ParamTypes {
    id: string
}


export const PackId = () =>{

    const cardArray = useSelector<AppStateType,CardArrayResponseType[]>(state=>state.cards.cardArray)
    const dispatch = useDispatch()


    let  {id} = useParams<ParamTypes>()

    useEffect( () =>{
        dispatch(getCardsTC('','',id,1,4,'',1,7) )
    },[id])



    const createCard = () =>{
         dispatch(createCardTC(id, 'cardsTest', 'Test2',0,0,
            0, 'string', 'string',  '',
            '', 'CARD'))
    }
    const updateCard = () =>{
        // dispatch(updateCardTC(card))    // сделать
    }



    const getCard = () => {
        dispatch(getCardsTC('','',id,1,4,'',1,7) )
    }
    const inputIdCard = (value:string) =>{
        dispatch(inputIdAC(value))
    }
    return (
        <div>
            <h2>ppc</h2>
            <h3>{id}</h3>
            <SuperButtonOld title={'-Get-Card-'} onClick={getCard}/>
            <SuperButtonOld onClick={createCard} title={'create'}/>
            <SuperButtonOld onClick={updateCard} title={'update'}/>
            {cardArray.map( card=>{
                const deleteCard = () => {
                    dispatch(deleteCardTC(card._id,id))
                }
                return(
                    <div key={card._id}>
                    <ul style={{fontWeight:600,fontSize:'16px',color:'wheat'}}>
                        <li>{card.answer}</li>
                        <SuperButtonOld onClick={deleteCard} title={'x'}/>
                        <li>{card.created}</li>
                        <li>{card.question}</li>
                        <li>{card.type}</li>
                        <li>{card.updated}</li>
                        <li>{card.rating}</li>
                        <li>{card.grade}</li>
                        <li>{card._id}</li>
                        ___________________________
                    </ul>
                </div>)

            })}
        </div>
    )

}

