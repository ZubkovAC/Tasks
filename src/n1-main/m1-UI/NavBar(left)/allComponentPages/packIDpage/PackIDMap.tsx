import React, {useState} from "react";
import {CardArrayResponseType, deleteCardTC, updateCardTC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import css from "./PackID.module.css";
import {Modal} from "../../../Common/Modal/Modal";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import {Grade} from "../../04-Packs/Block/Grade";
import {AppStateType} from "../../../../m2-BLL/00-store/store";

type PackIDMapPropsType = {
    card: CardArrayResponseType
}

export const PackIDMap = (props: PackIDMapPropsType) => {

    const dispatch = useDispatch()
    let {id} = useParams<{ id: string }>()
    let userID = useSelector<AppStateType, string>(state => state.login.userID)
    //delete modal
    const [active, setActive] = useState<boolean>(false)

    // update modal
    const [updateCard, setUpdateCard] = useState<boolean>(false)
    const [questionUpdate, setQuestionUpdate] = useState<string>(props.card.question)
    const [answerUpdate, setAnswerUpdate] = useState<string>(props.card.answer)

    const [cardID, setCardID] = useState<string>('')

    const SetActive = () => {
        setActive(false)
    }


    const deleteCardYes = (cardID: string) => {

        dispatch(deleteCardTC(cardID, id))
        setActive(false)
    }
    const deleteCardNo = () => {
        setActive(false)
    }
    const deleteCard = (cardId: string) => {
        setCardID(cardId)
        setActive(true)

    }


    const SetUpdateCard = () => {
        setUpdateCard(false)
    }
    const UpdateCard = (cardId: string) => {
        debugger
        setCardID(cardId)
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
    const craeteUpdateYes = (cardID: string) => {
        setAnswerUpdate('')
        setQuestionUpdate('')
        dispatch(updateCardTC(cardID, questionUpdate, answerUpdate, id))
        setUpdateCard(false)
    }
    let answer = props.card.answer.substr(0, 20)
    let question = props.card.question.substr(0, 20)
    return (
        <div>
            {/*update modal*/}
            <div>
                <Modal active={updateCard} setActive={SetUpdateCard}>
                    <TitleModal title={'Update'}/>
                    <SuperTextArea width={'350px'} heigth={'100px'} backgroundColor={'wheat'}
                                   onChangeText={questionUpadateCard}
                                   valueStart={questionUpdate}
                                   placeholder={'qwestion'}
                    />
                    <SuperTextArea width={'350px'} heigth={'150px'} backgroundColor={'wheat'}
                                   onChangeText={answerUpdateCard}
                                   valueStart={answerUpdate}
                                   placeholder={'answer'}
                    />
                    <SuperButtonOld
                        title={'yes'}
                        onClick={() => craeteUpdateYes(cardID)}/>
                    <SuperButtonOld
                        title={'no'}
                        onClick={craeteUpdateNo}/>
                </Modal>
            </div>


            {/*delete modal*/}
            <div>
                <Modal active={active} setActive={SetActive}>
                    <TitleModal title={'Are you sure you want to delete it?'}/>
                    <SuperButtonOld
                        title={'yes'}
                        onClick={() => deleteCardYes(cardID)}/>
                    <SuperButtonOld
                        title={'no'}
                        onClick={deleteCardNo}/>
                </Modal>
            </div>

            <div className={css.Table}>
                <p className={css.question}><h3>{question}</h3></p>
                <p className={css.answer}>  {answer}</p>
                <p className={css.grade}><Grade grade={props.card.grade}/></p>
                <p className={css.buttons}>
                    <SuperButtonOld title={'Delete'}
                                    disabled={props.card.user_id !== userID}
                                    onClick={() => deleteCard(props.card._id)}/>
                    <SuperButtonOld title={'Update'}
                                    disabled={props.card.user_id !== userID}
                                    onClick={() => UpdateCard(props.card._id)}/>
                </p>
            </div>


        </div>
    )
}