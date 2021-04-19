import {Dispatch} from "redux";
import {CardsAPI, CreateCardType, UpdateTypeInstase} from "../../m3-DAL/axios";
import {lampAC} from "../02-reducer-login/reducer-login";



const initialState = {
    cardArray:[] as CreateCardType[],
    packID:'',
    card:{} as CreateCardType
}

export type IniticalStateCardType = typeof initialState

export const cardsReducer = (state: IniticalStateCardType = initialState, action: ActionTypeCards): IniticalStateCardType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {
                ...state,
                cardArray:action.cardArray,
            }
        case "CARDS/ID-CARDS":{
            debugger
            return {
                ...state,
                packID:action.packID
            }
        }
        default:
            return state
    }
}

export const getCardsAC = (cardArray:CreateCardType[]) => ({ type:"CARDS/GET-CARDS",cardArray}as const)
export const inputIdAC = (packID:string) => ({ type:"CARDS/ID-CARDS",packID}as const)




export type GetCardsAC = ReturnType<typeof getCardsAC>
export type InputIdAC = ReturnType<typeof inputIdAC>

// export const getCardsTC = (cardAnswer:string,cardQuestion:string,cardsPack_id:string,min:number,
//                            max:number,sortCards:string,page:number,pageCount:number) => (dispatch: Dispatch)=>{
// (cardAnswer:any,cardQuestion:any,cardsPack_id:any,min:any,
//  max:any,sortCards:any,page:any,pageCount:any)

export const getCardsTC = (cardAnswer:string,cardQuestion:string,cardsPack_id:string,min:number,
                      max:number,sortCards:string,page:number,pageCount:number) => (dispatch: Dispatch)=>{
    return CardsAPI.getCards(cardAnswer,cardQuestion,cardsPack_id,min,max,sortCards,page,pageCount)
        .then((res)=>{
            debugger
            dispatch(getCardsAC(res.data.cards))
        })
        .catch((err)=>console.log({...err}))
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
                             type?:string) => (dispatch:Dispatch) =>{
    return CardsAPI.createCard(cardsPack_id,question,answer,grade,shots,rating,
        answerImg,questionImg,questionVideo,answerVideo,type)
        .then((res)=>{
            console.log({...res.data})
        })
        .catch((err)=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const updateCardTC = (card:UpdateTypeInstase) => (dispatch:Dispatch) =>{
    return CardsAPI.updateCard(card)
        .then(res=>console.log({...res.data}))
        .catch(err=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

export const deleteCardTC = (id:string) => (dispatch:Dispatch) => {
    return CardsAPI.deleteCard(id)
        .then(res=> console.log({...res.data}))
        .catch(err=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}






export type ActionTypeCards =
    | GetCardsAC
    | InputIdAC
