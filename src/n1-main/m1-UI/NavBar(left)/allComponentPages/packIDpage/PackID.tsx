import React, {useEffect, useState} from "react";
import {
    CardArrayResponseType,
    createCardTC,
    deleteCardTC,
    getCardsTC,
    updateCardTC,
} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from './PackID.module.css'
import cardFront from './../../../Common/Accets/CardFront.jpg'
import {NavLink, useParams} from "react-router-dom";
import {RoutePath} from "../../../../../App";
import {Modal} from "../../../Common/Modal/Modal";


interface ParamTypes {
    id: string
}


export const PackId = () => {

    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const dispatch = useDispatch()


    let {id} = useParams<ParamTypes>()
    //delete modal
    const [active, setActive] = useState<boolean>(false)
    //create modal
    const [activeCard, setActiveCard] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    // update modal
    const [updateCard, setUpdateCard] = useState<boolean>(false)
    const [questionUpdate, setQuestionUpdate] = useState<string>('')
    const [answerUpdate, setAnswerUpdate] = useState<string>('')


    useEffect(() => {
        dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
    }, [id])


    const SetActive = () => {
        setActive(false)
    }
    const SetActiveCard = () => {
        setActiveCard(false)
    }


    const questionCreateCard = (value: string) => {
        setQuestion(value)
    }
    const answerCreateCard = (value: string) => {
        setAnswer(value)
    }
    const typeCreateCard = (value: string) => {
        setType(value)
    }
    const ratingCreateCard = (value: string) => {
        if (+value >= 0 && +value <= 5) setRating(+value)
    }

    const CreateCard = () => {
        setActiveCard(true)
    }
    const craeteCardNo = () => {
        setActiveCard(false)
    }
    const craeteCardYes = () => {
        dispatch(createCardTC(id, question, answer, 0, 0,
            rating, 'string', 'string', '',
            '', type))
        setActiveCard(false)
    }

    return (
        <div>
            <h2 className={css.content_top}>Pack -- Card</h2>
            <div className={css.box_button}>

                {/*create modal*/}
                <Modal active={activeCard} setActive={SetActiveCard}>
                    <h2 style={{color: 'wheat'}}>Create</h2>
                    <div style={{marginBottom: '10px'}}>
                        <SuperInputTextOld placeholder={'question'} onChangeText={questionCreateCard}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <SuperInputTextOld placeholder={'answer'} onChangeText={answerCreateCard}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <SuperInputTextOld placeholder={'type'} onChangeText={typeCreateCard}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <SuperInputTextOld placeholder={'rating'} onChangeText={ratingCreateCard}/>
                    </div>
                    <SuperButtonOld title={'yes'} onClick={craeteCardYes}/>
                    <SuperButtonOld title={'no'} onClick={craeteCardNo}/>
                </Modal>

                <div className={css.learn}>
                    <NavLink to={RoutePath.LEARN}>
                        <div>
                            <button className={css.box_button}>LEARN</button>
                        </div>

                    </NavLink>
                    <SuperButtonOld onClick={CreateCard} title={'create'}/>
                </div>
            </div>

            <div className={css.box_card}>
                {cardArray.map(card => {

                    let arr = card.created.substring(0, 10)
                    let update = card.updated.substring(0, 10)

                    const deleteCardYes = () => {
                        dispatch(deleteCardTC(card._id, id))
                        setActive(false)
                    }
                    const deleteCardNo = () => {
                        setActive(false)
                    }
                    const deleteCard = () => {
                        setActive(true)
                    }


                    const SetUpdateCard = () => {
                        setUpdateCard(false)
                    }
                    const UpdateCard = () => {
                        setUpdateCard(true)
                    }
                    const questionUpadateCard = (value: string) => {
                        setQuestionUpdate(value)
                    }
                    const answerUpdateCard = (value: string) => {
                        setAnswerUpdate(value)
                    }
                    const craeteUpdateNo = () => {
                        setUpdateCard(false)
                    }
                    const craeteUpdateYes = () => {
                        setAnswerUpdate('')
                        setQuestionUpdate('')
                        dispatch(updateCardTC(card._id, questionUpdate, answerUpdate, id))
                        setUpdateCard(false)
                    }

                    return (
                        <div className={css.cardFront} key={card._id}>

                            {/*update modal*/}
                            <div style={{opacity:'0.5'}}>
                                <Modal active={updateCard} setActive={SetUpdateCard}>
                                    <h2 style={{color: 'wheat'}}>Update</h2>
                                    <div style={{marginBottom: '10px'}}>
                                        <SuperInputTextOld placeholder={'question'} onChangeText={questionUpadateCard}/>
                                    </div>
                                    <div style={{marginBottom: '10px'}}>
                                        <SuperInputTextOld placeholder={'answer'} onChangeText={answerUpdateCard}/>
                                    </div>

                                    <SuperButtonOld title={'yes'} onClick={craeteUpdateYes}/>
                                    <SuperButtonOld title={'no'} onClick={craeteUpdateNo}/>
                                </Modal>
                            </div>


                            {/*delete modal*/}
                            <div style={{opacity:'0.5'}}>
                                <Modal active={active} setActive={SetActive}>
                                    <h2 style={{color: 'wheat'}}>Are you sure you want to delete it?</h2>
                                    <div>
                                        <SuperButtonOld title={'yes'} onClick={deleteCardYes}/>
                                        <SuperButtonOld title={'no'} onClick={deleteCardNo}/>
                                    </div>
                                </Modal>
                            </div>


                            <div>{card.question}</div>
                            <img src={card.answerImg === '' ? card.answerImg : cardFront} width='100px' alt=""/>
                            {/*<div>{card.answer}</div>*/}
                            <div>Update:{update}</div>
                            <div> Rating:<span
                                style={{color: 'white', textShadow: '0 0 10px white'}}>{card.rating}</span></div>
                            <div> Grade:{card.grade}</div>
                            <div>Type: {card.type}</div>
                            -----------------------------
                            <div>
                                <div className={css.update}><SuperButtonOld onClick={UpdateCard} title={'update'}/>
                                </div>
                            </div>
                            -----------------------------
                            <div>Create :{arr}</div>
                            -----------------------------
                            <div>
                                <SuperButtonOld onClick={deleteCard} title={'Delete Card'}/>
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )

}

