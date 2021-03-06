import React, {useEffect, useState} from "react";
import {createCardTC, getCardsTC,} from "../../../../m2-BLL/Cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store";
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
    const {cardArray, packUserId} = useSelector((state: AppStateType) => state.cards)
    const dispatch = useDispatch()

    let {id} = useParams<{ id: string }>()


    //create modal
    const [activeCard, setActiveCard] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [type, setType] = useState<string>('')

    //pageCount - количество карт
    useEffect(() => {
        if (isAuth) dispatch(getCardsTC('', '', id, 1, 4, '', 1, 999))
    }, [isAuth, dispatch, id])


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


    return (
        <div>
            <h2 className={css.content_top}>Pack -- Card</h2>
            <div className={css.box_button}>

                {/*create modal*/}
                <Modal active={activeCard} setActive={() => setActiveCard(false)}>
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
                    disabled={packUserId !== userID}
                />
                {cardArray.length ?
                    <NavLink to={RoutePath.LEARN + `/${id}`}>
                        LEARN
                    </NavLink>
                    :
                    <TitleModal title={'no card'}/>
                }
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

