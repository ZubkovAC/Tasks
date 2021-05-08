import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {CardArrayResponseType, cardGradeTC, getCardsTC} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import css from './styleLearnPage.module.css'
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import { Flippys } from "../../06-TestComponent/TestComponent";
import {Redirect, useParams} from "react-router-dom";


export const LearnPage = () => {

    const dispatch = useDispatch()

    let isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)

    const getCard = (cards: CardArrayResponseType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;

        const res = cards.reduce((acc: { sum: number, id: number }, card, i) =>
            {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
                                                                        }
            , {sum: 0, id: -1});
        console.log('test: ', sum,rand,res,cardArray)
        return cards[res.id + 1];
    }

    const [cardForAnswer, setCardForAnswer] = useState(cardArray[0])
    const [finishQuestion, setFinishQuestion] = useState<any>('Learn To Start')
    const [showAnswer, setShowAnswer] = useState<any>(false)
    const [answer, setAnswer] = useState<any>('')                    // доп стейт для хранения старых данных
    const [answerP, setAnswerP] = useState<any>('')             // доп стейт для хранения новых данных

    const [radio, setRadio] = useState<any>('')
    const [onButton, offButton] = useState<boolean>(false)


    let {id} = useParams<{id:string}>()
    useEffect(() => {
        dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
    }, [])
    useEffect(()=>{
        OnClickHandlerForShowAnswer()
    },[])



    const onClickHandler = (e:any) => {

        setCardForAnswer(getCard(cardArray))
        setFinishQuestion(Object.entries(cardForAnswer)[4][1])//для вопроса 4.1, для ответа 3,1
        setShowAnswer(false)
        setRadio('')
        offButton(true)
        e.stopPropagation()
    }



    const OnClickHandlerForShowAnswer = () => {
        if (onButton){
            setShowAnswer(true)
            setAnswer(answerP)                  //3.1                        // старое значение новое значение
            setAnswerP(Object.entries(cardForAnswer)[3][1])                 // использую новое значение
            offButton(false)
        }
    }

    const RadioSelect = (value:string) =>{
        setRadio(value)
        let arr = [`кажется я обкакался =(`,`Я учился?`,`не уверенно, фильшиво, слабо`,`ну почти`,`это было слишком легко`]
        let grade = arr.indexOf(value)
        dispatch(cardGradeTC((grade+1),cardForAnswer._id))
    }


    if(!isAuth) return <Redirect to={'/login'}/>;
    return (
        <div className={css.cardBlock}>

            <h2 className={css.content_top}>Learn Page</h2>
            <button className={css.but} disabled={!cardForAnswer} onClick={e => onClickHandler(e)}>
                LEARN
            </button>
            <div className={css.cardFrontLearn}  onClick={OnClickHandlerForShowAnswer}>


                {/*<Flippys  />*/}

                    {cardForAnswer
                        ? <div className={css.cardForAnswer}>
                            <div>{finishQuestion}</div>
                        </div>
                        : <h2>Go to Packs and choose Pack for learning</h2>
                    }
                    {showAnswer
                        ? <div className={css.cardBlock}>
                            <div className={css.text}>{answer}</div>
                            <div className={css.btnBlock}>
                                <SuperRadio
                                    value={radio}
                                    name={"radio"}
                                    options={[`это было слишком легко`,`ну почти`,`не уверенно, фильшиво, слабо`,`Я учился?`,`кажется я обкакался =(`]}
                                    onChangeOption={RadioSelect}
                                />
                            </div>
                        </div>
                        : <h5>Answer to click</h5>
                    }
            </div>
        </div>
    )
}