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
import {useParams} from "react-router-dom";
import css from './PackID.module.css'
import cardFront from './../../../Common/Accets/CardFront.jpg'



interface ParamTypes {
    id: string
}


export const PackId = () => {

    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const dispatch = useDispatch()


    let {id} = useParams<ParamTypes>()

    useEffect(() => {
        dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
    }, [id])


    const createCard = () => {
        dispatch(createCardTC(id, 'cardsTest', 'Test2', 0, 0,
            0, 'string', 'string', '',
            '', 'CARD'))
    }
    const updateCard = () => {
        // dispatch(updateCardTC(card))    // сделать
    }


    const getCard = () => {
        dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
    }
    const inputIdCard = (value: string) => {
        dispatch(inputIdAC(value))
    }
    return (
        <div>
            <h2>ppc</h2>
            <h3>{id}</h3>
            <SuperButtonOld title={'-Get-Card-'} onClick={getCard}/>
            <SuperButtonOld onClick={createCard} title={'create'}/>
            <SuperButtonOld onClick={updateCard} title={'update'}/>
            <div className={css.box_card} >
                {cardArray.map(card => {
                    const deleteCard = () => {
                        dispatch(deleteCardTC(card._id, id))
                    }
                    return (
                        <div className={css.cardFront} key={card._id}>
                            <div className={css.cardFront2} >
                                <div className={css.cardFront3}>
                                    <div>{card.answer}</div>
                                    <img src={card.answerImg==='' ? card.answerImg : cardFront } width='100px' alt=""/>

                                    <div>{card.created}</div>
                                    <div>{card.question}</div>
                                    <div>{card.type}</div>
                                    <div>{card.updated}</div>
                                    <div>{card.rating}</div>
                                    <div>{card.grade}</div>
                                    <div>{card._id}</div>

                                    ___________________________
                                    <div style={{margin:'20px'}}>
                                        <SuperButtonOld onClick={deleteCard} title={'x'}/>
                                    </div>

                                </div>


                            </div>
                        </div>
                        )

                })}
            </div>

        </div>
    )

}

