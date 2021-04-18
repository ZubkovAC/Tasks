import {Dispatch} from "redux";
import {CardsAPI} from "../../m3-DAL/axios";



const initialState = {
    cards:'',
    id:'',

}

export type IniticalStateCardType = typeof initialState

export const cardsReducer = (state: IniticalStateCardType = initialState, action: ActionTypeCards): IniticalStateCardType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {
                ...state,
                cards:action.cards,
            }
        case "CARDS/ID-CARDS":{
            return {
                ...state,
                id:action.id
            }
        }
        default:
            return state
    }
}

export const getCardsAC = (cards:string) => ({ type:"CARDS/GET-CARDS",cards}as const)
export const inputIdAC = (id:string) => ({ type:"CARDS/ID-CARDS",id}as const)




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
            dispatch(getCardsAC(res.data))
        })
        .catch((err)=>console.log({...err}))
}




export type ActionTypeCards =
    | GetCardsAC
    | InputIdAC
