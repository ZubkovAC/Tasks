import React, { useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {CardArrayResponseType} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import css from './styleLearnPage.module.css'
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";


export const LearnPage = () => {
    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const getCard = (cards: CardArrayResponseType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }
    const [cardForAnswer, setCardForAnswer] = useState(cardArray[0])
    const [finishQuestion, setFinishQuestion] = useState<any>('Learn To Start')
    const [showAnswer, setShowAnswer] = useState<any>(false)
    const [answer, setAnswer] = useState<any>('')

    const [radio, setRadio] = useState<any>('')


    const onClickHandler = (e:any) => {

        const newCard = getCard(cardArray)

        setCardForAnswer(newCard)
        setFinishQuestion(Object.entries(cardForAnswer)[4][1])//для вопроса 4.1, для ответа 3,1
        setShowAnswer(false)
        e.stopPropagation()

    }
    const OnClickHandlerForShowAnswer = () => {
        setShowAnswer(true)
        setAnswer(Object.entries(cardForAnswer)[3][1])

    }
    const RadioSelect = (value:string) =>{
        setRadio(value)
    }

    return (
        <div className={css.cardBlock}>
            <h2 className={css.content_top}>Learn Page</h2>
            <div className={css.cardFrontLearn} onClick={OnClickHandlerForShowAnswer}>
                <button className={css.but} disabled={!cardForAnswer} onClick={e => onClickHandler(e)}>
                    LEARN
                </button>
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
                                options={['ответил','ответил но плохо','еще хуже','не ответил','что это такое']}
                                onChangeOption={RadioSelect}
                            />

                        </div>

                    </div>
                    : null
                }
            </div>

        </div>
    )
}