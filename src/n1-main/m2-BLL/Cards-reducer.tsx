import {Dispatch} from "redux";
import {CardsAPI, CardTypeResponce, CreateCardType} from "../m3-DAL/axios";
import {ActionLoginType, lampAC} from "./Login-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./00-store";

const initialState = {
    cardArray:[] as CardTypeResponce[],
    packID:'',
    card:{} as CreateCardType,
    grade:0,
    valueSelect:'',
    packUserId:''
}

export const cardsReducer = (state: IniticalStateCardType = initialState, action: ActionTypeCards): IniticalStateCardType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":{
            return {
                ...state,
                packUserId: action.packUserId,
                cardArray:action.cardArray}
        }
        case "CARDS/ID-CARDS":{
            return {
                ...state, packID:action.packID }
        }
        case "CARDS/GRADE-CARD":{
            return {
                ...state,grade:action.grade , valueSelect: action.valueSelect }
        }

        default:
            return state
    }
}

// AC
export const getCardsAC = (cardArray:CardTypeResponce[],packUserId:string) => ({ type:"CARDS/GET-CARDS",cardArray,packUserId}as const)
export const inputIdAC = (packID:string) => ({ type:"CARDS/ID-CARDS",packID}as const)
export const gradeCardAC = (grade:number,valueSelect:string) => ({ type:"CARDS/GRADE-CARD",grade,valueSelect}as const)

// TC
export const getCardsTC = (cardAnswer:string,cardQuestion:string,cardsPack_id:string,min:number,
                      max:number,sortCards:string,page:number,pageCount:number) => (dispatch: Dispatch)=>{
    return CardsAPI.getCards(cardsPack_id,cardQuestion,cardAnswer,pageCount)
        .then((res)=>dispatch(getCardsAC(res.data.cards,res.data.packUserId)))
        .catch((err)=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const createCardTC = (cardsPack_id:string,
                             question?:string,
                             answer?:string,
                             grade?:number,
                             shots?:number,
                             rating?:number,
                             answerImg?:string,
                             questionImg?:string,
                             questionVideo?: string,
                             answerVideo?:string,
                             type?:string) => (dispatch:ThunkDispatch<AppStateType, unknown, ActionTypeCards | ActionLoginType>) =>{
    return CardsAPI.createCard(cardsPack_id,question,answer,grade,shots,rating,
        answerImg,questionImg,questionVideo,answerVideo,type)
        .then((res)=>
            dispatch(getCardsTC('','',cardsPack_id,1,4,'',1,7) ))
        .catch((err)=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const updateCardTC = (_id:string,question:string,answer:string,cardsPack_id:string) => (dispatch:ThunkDispatch<AppStateType, unknown, ActionTypeCards | ActionLoginType>) =>{
    return CardsAPI.updateCard(_id,question,answer)
        .then(res=>
                dispatch(getCardsTC('','',cardsPack_id,1,4,'',1,7) ))
        .catch(err=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const deleteCardTC = (idCard:string,idPack:string) => (dispatch:ThunkDispatch<AppStateType,unknown,ActionTypeCards | ActionLoginType>) => {
    return CardsAPI.deleteCard(idCard)
        .then(res=>
            dispatch(getCardsTC('','',idPack,1,4,'',1,7)))
        .catch(err=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const cardGradeTC = (grade:number,card_id:string) => (dispatch:ThunkDispatch<AppStateType, unknown, ActionTypeCards>) =>{
    return CardsAPI.cardGrade(grade,card_id)
        .then()
        .catch()
}


//type
export type IniticalStateCardType = typeof initialState

export type ActionTypeCards =
    | GetCardsAC
    | InputIdAC
    | GradeCardAC

export type GetCardsAC = ReturnType<typeof getCardsAC>
export type InputIdAC = ReturnType<typeof inputIdAC>
export type GradeCardAC = ReturnType<typeof gradeCardAC>

