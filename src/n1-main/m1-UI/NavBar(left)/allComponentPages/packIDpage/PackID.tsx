import React, {useEffect} from "react";
import {
    CardArrayResponseType,
    createCardTC,
    deleteCardTC,
    getCardsTC,
    inputIdAC,
    updateCardTC
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

    const packID = useSelector<AppStateType,string>(state => state.cards.packID)
    const cardArray = useSelector<AppStateType,CardArrayResponseType[]>(state=>state.cards.cardArray)
    const dispatch = useDispatch()

    // let cardArr = cardArray.filter(card=>card.cardsPack_id !== packID)
    // let card = {...cardArr}


    let  {id} = useParams<ParamTypes>()

    useEffect( () =>{
        dispatch(getCardsTC('','',id,1,4,'',1,7) )
    },[id])



    const createCard = () =>{
         dispatch(createCardTC(id, 'cardsTest', 'Test2',0,0,
            0, 'string', 'string',  '',
            '', 'CARD'))
        dispatch(getCardsTC('','',id,1,4,'',1,7) )
    }
    const updateCard = () =>{
        // dispatch(updateCardTC(card))
    }



    const getCard = () => {
        dispatch(getCardsTC('','',id,1,4,'',1,7) )
    }
    const inputIdCard = (value:string) =>{
        dispatch(inputIdAC(value))
    }
    console.log(cardArray)
    return (
        <div>
            <h2>ppc</h2>
            <h3>{id}</h3>
            <SuperButtonOld title={'-Get-Card-'} onClick={getCard}/>
            <SuperInputTextOld  onChangeText={inputIdCard}  />
            <SuperButtonOld onClick={createCard} title={'create'}/>
            <SuperButtonOld onClick={updateCard} title={'update'}/>
            {cardArray.map( card=>{
                const deleteCard = () => {
                    dispatch(deleteCardTC(card._id))
                    dispatch(getCardsTC('','',id,1,4,'',1,7))
                }


                return(

                    <div>
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



// {
//     "cards": [],
//     "packUserId": "5eecf82a3ed8f700042f1186",
//     "page": 1,
//     "pageCount": 7,
//     "cardsTotalCount": 0,
//     "minGrade": 0,
//     "maxGrade": 6,
//     "token": "29cf5530-a13e-11eb-8a71-bd7ccbb4133b",
//     "tokenDeathTime": 1619462192643
// }