import React, {useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {CardArrayResponseType} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import './styleLearnPage.css'

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
    const [finishQuestion, setFinishQuestion] = useState<any>('')
    const [showAnswer, setShowAnswer] = useState<any>(false)
    const [answer, setAnswer] = useState<any>('')
    const onClickHandler = () => {
        // @ts-ignore
        const newCard = getCard(cardArray)
        // @ts-ignore
        setCardForAnswer(newCard)
        setFinishQuestion(Object.entries(cardForAnswer)[0][1])//для вопроса 4.1, для ответа 3,1
        setShowAnswer(false)
    }
    const OnClickHandlerForShowAnswer = () => {
        setShowAnswer(true)
        setAnswer(Object.entries(cardForAnswer)[3][1])

    }
    //console.log(Object.entries(cardForAnswer))

    return (
        <div className={'cardBlock'}>
            <h1>Learn Page</h1>
            <button disabled={!cardForAnswer} onClick={onClickHandler}><h2>learn</h2></button>
            {cardForAnswer
                ? <div className={'questionBlock'}>
                    <div className={'text'}>{finishQuestion}</div>
                    <button onClick={OnClickHandlerForShowAnswer}>show answer</button>
                </div>
                : <h2>Go to Packs and choose Pack for learning</h2>}
            {showAnswer
                ? <div className={'cardBlock'}>
                    <div className={'text'}>{answer}</div>
                    <div className={'btnBlock'}>
                        <button>ответил</button>
                        <button>ответил но плохо</button>
                        <button>еще хуже</button>
                        <button>не ответил</button>
                        <button>что это такое</button>
                    </div>

                </div>
                : null
            }
        </div>
    )
}