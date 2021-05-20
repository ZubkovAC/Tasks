import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {
    cardGradeTC,
    getCardsTC,
    gradeCardAC
} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import css from './styleLearnPage.module.css'
import {Redirect, useParams} from "react-router-dom";
import {Flippys} from "../../../Common/Flippy/Flippy";
import {CardTypeResponce} from "../../../../m3-DAL/axios";


export const LearnPage = () => {

    const dispatch = useDispatch()

    let {me,isAuth} = useSelector((state:AppStateType) => state.login)
    let {grade,cardArray} = useSelector((state:AppStateType) => state.cards)


    const getCard = (cards: CardTypeResponce[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;

        const res = cards.reduce((acc: { sum: number, id: number }, card, i) =>
            {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
                                                                        }
            , {sum: 0, id: -1});
        return cards[res.id + 1];
    }

    const [cardForAnswer, setCardForAnswer] = useState(cardArray[0])
    const [finishQuestion, setFinishQuestion] = useState<any>('Для получения ответа нажмите на Карточку')
    const [showAnswer, setShowAnswer] = useState<string>('Для ознакомления функционала нажмите на кнопку LEARN')
    const [answer, setAnswer] = useState<any>('')                    // доп стейт для хранения старых данных
    const [answerP, setAnswerP] = useState<any>('')             // доп стейт для хранения новых данных
    const [onButton, offButton] = useState<boolean>(true)


    let {id} = useParams<{id:string}>()
    useEffect(() => {
        if (me) {
            dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
            offButton(true)
        }
    }, [me,dispatch,id])
    useEffect(()=>{
        if (me){
            OnClickHandlerForShowAnswer()
            offButton(false)
        }
    },[me]) //eslint-disable-line


    const onClickHandler = () => {
        if ( me && cardForAnswer !== undefined ){

            setCardForAnswer(getCard(cardArray))
            setFinishQuestion(Object.entries(cardForAnswer)[4][1])//для вопроса 4.1, для ответа 3,1    old setCardForAnswer
            offButton( onButton?false : true)
            setAnswer(answerP)
            setAnswerP(Object.entries(cardForAnswer)[3][1])
            OnClickHandlerForShowAnswer()
            setShowAnswer('12')
            if(grade!==0){
                dispatch(cardGradeTC(grade,cardForAnswer._id))
            }
        } else{
            offButton(true)
            setCardForAnswer(getCard(cardArray))
        }
    }

    const OnClickHandlerForShowAnswer =() => {
        if (onButton && me && cardArray.length !== 0 ){
            setAnswer(answerP)                                  //3.1                        // старое значение новое значение
            setAnswerP(Object.entries(cardForAnswer)[3][1])                 // использую новое значение   old setCardForAnswer
            offButton(false  )
            if (showAnswer!=='12') setShowAnswer('Для ознакомления функционала нажмите на кнопку LEARN'? 'Здесь будет написан Ответ(После нажатия на карточку). Для начала нажмите кнопку LEARN': '')
        }
        dispatch(gradeCardAC(0,''))
    }

    if (!isAuth && me) return <Redirect to={'/login'}/>;

    return (
        <div className={css.cardBlock}>

            <h2 className={css.content_top}>Learn Page</h2>


            <div onClick={OnClickHandlerForShowAnswer}>
                <Flippys
                    finishQuestion={finishQuestion}
                    showAnswer={showAnswer}
                    answer={answer}
                    button={onButton}
                />
            </div>
            <div style={{opacity:onButton ? 0.7:1}}>
                <button disabled={onButton} className={css.but}  onClick={onClickHandler}>
                    LEARN
                </button>
            </div>

        </div>
    )
}
