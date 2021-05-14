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



export const PackId = () => {

    const isAuth = useSelector<AppStateType,boolean>(state=> state.login.isAuth)
    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const dispatch = useDispatch()

    let {id} = useParams<{id:string}>()

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
    const defaultText = () =>{
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

    return (
        <div>
            <h2 className={css.content_top}>Pack -- Card</h2>
            <div className={css.box_button}>

                {/*create modal*/}
                <Modal active={activeCard} setActive={SetActiveCard}>
                    <h2 style={{color: 'wheat'}}>Create</h2>
                    <div style={{marginBottom: '10px',marginTop:'20px'}}>
                        <SuperTextArea width={'350px'} heigth={'100px'} backgroundColor={'wheat'}
                                       onChangeText={questionCreateCard} valueStart={question} placeholder={'qwestion'}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <SuperTextArea width={'350px'} heigth={'150px'} backgroundColor={'wheat'}
                                       onChangeText={answerCreateCard} valueStart={answer} placeholder={'answer'}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <SuperInputTextOld placeholder={'type'} onChangeText={typeCreateCard}/>
                    </div>
                    <SuperButtonOld title={'yes'} onClick={craeteCardYes}/>
                    <SuperButtonOld title={'no'} onClick={craeteCardNo}/>
                </Modal>

                <div className={css.learn}>
                    <NavLink to={RoutePath.LEARN+`/${id}`}>
                        <div>
                            <button className={css.box_button}>LEARN</button>
                        </div>

                    </NavLink>
                    <SuperButtonOld onClick={CreateCard} title={'create'}/>
                </div>
            </div>

            <div className={css.box_card}>
                {cardArray.map(card => {


                    return (
                        <div className={css.cardFront} key={card._id}>
                            <PackIDMap card={card} key={card._id} />
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

