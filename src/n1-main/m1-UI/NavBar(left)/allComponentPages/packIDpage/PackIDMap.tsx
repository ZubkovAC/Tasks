import React, {useState} from "react";
import {CardArrayResponseType, deleteCardTC, updateCardTC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import css from "./PackID.module.css";
import {Modal} from "../../../Common/Modal/Modal";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import cardFront from "../../../Common/Accets/CardFront.jpg";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";

type PackIDMapPropsType = {
    card: CardArrayResponseType
}

export const PackIDMap = (props: PackIDMapPropsType) => {

    const dispatch = useDispatch()
    let {id} = useParams<{ id: string }>()
    //delete modal
    const [active, setActive] = useState<boolean>(false)

    // update modal
    const [updateCard, setUpdateCard] = useState<boolean>(false)
    const [questionUpdate, setQuestionUpdate] = useState<string>(props.card.question)
    const [answerUpdate, setAnswerUpdate] = useState<string>(props.card.answer)


    const [cardID, setCardID] = useState<string>('')

    let arr = props.card.created.substring(0, 10)
    let update = props.card.updated.substring(0, 10)


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
    return (
        <div>
            {/*<PackIDMap card={props.card} />*/}
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


            <div>Type:{props.card.type}</div>
            <img src={props.card.answerImg === '' ? props.card.answerImg : cardFront} width='100px' alt=""/>

            <div> Grade:{props.card.grade}</div>
            <div style={{fontSize: '25px', color: 'orange', justifyContent: 'start', display: 'flex'}}>Вопрос:</div>

            <div>{props.card.question}</div>

            -----------------------------
            <div>
                <div>Update:{update}</div>
                <div className={css.update}><SuperButtonOld onClick={() => UpdateCard(props.card._id)}
                                                            title={'update'}/>
                </div>
            </div>
            -----------------------------
            <div>Create :{arr}</div>
            -----------------------------
            <div>
                <SuperButtonOld onClick={() => deleteCard(props.card._id)} title={'Delete Card'}/>
            </div>

        </div>
    )
}