import React, {useEffect, useState} from "react";
import {CardArrayResponseType, createCardTC, getCardsTC,} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from './PackID.module.css'
import {NavLink, useParams} from "react-router-dom";
import {RoutePath} from "../../../../../App";
import {Modal} from "../../../Common/Modal/Modal";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";
import {PackIDMap} from "./PackIDMap";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import {TableContents} from "../../../Common/TableContents/TableContents";


export const PackId = () => {

    const {isAuth, userID} = useSelector((state: AppStateType) => state.login)
    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const dispatch = useDispatch()

    let {id} = useParams<{ id: string }>()

    //create modal
    const [activeCard, setActiveCard] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [type, setType] = useState<string>('')


    //pageCount - количество карт
    useEffect(() => {
        if (isAuth) dispatch(getCardsTC('', '', id, 1, 4, '', 1, 99))
    }, [isAuth])

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
    const defaultText = () => {
        debugger
        setType('')
        setAnswer('')
        setQuestion('')
    }

    const CreateCard = () => {
        defaultText()
        setActiveCard(true)
    }
    const craeteCardNo = () => {
        defaultText()
        setActiveCard(false)
    }


    const craeteCardYes = () => {
        dispatch(createCardTC(id, question, answer, 0, 0,
            0, 'string', 'string', '',
            '', type))
        defaultText()
        setActiveCard(false)
    }
    let disable = cardArray.find(t => t.user_id === userID)
    return (
        <div>
            <h2 className={css.content_top}>Pack -- Card</h2>
            <div className={css.box_button}>

                {/*create modal*/}
                <Modal active={activeCard} setActive={SetActiveCard}>
                    <TitleModal title={'Create'}/>
                    <SuperTextArea width={'350px'} heigth={'100px'} backgroundColor={'wheat'}
                                   onChangeText={questionCreateCard} valueStart={question}
                                   placeholder={'qwestion'}
                    />
                    <SuperTextArea width={'350px'} heigth={'150px'} backgroundColor={'wheat'}
                                   onChangeText={answerCreateCard} valueStart={answer} placeholder={'answer'}
                    />
                    <SuperInputTextOld placeholder={'type'} onChangeText={typeCreateCard}
                    />
                    <SuperButtonOld title={'yes'} onClick={craeteCardYes}/>
                    <SuperButtonOld title={'no'} onClick={craeteCardNo}/>
                </Modal>


                <SuperButtonOld
                    onClick={CreateCard}
                    title={'create'}
                    disabled={!disable}
                />
                <NavLink to={RoutePath.LEARN + `/${id}`}
                         style={{display: !cardArray.length ? 'none' : ""}}
                >
                    LEARN
                </NavLink>
            </div>

            <div className={css.box_card}>
                <TableContents
                    name={'question'}
                    packUserName={'answer'}
                    grade={'grade'}
                    actions={'actions'}
                />
                {cardArray.map(card => {

                    return (
                        <div className={css.cardFront} key={card._id}>

                            <PackIDMap card={card} key={card._id}/>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

