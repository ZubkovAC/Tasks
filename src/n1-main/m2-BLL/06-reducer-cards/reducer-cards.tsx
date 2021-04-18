import {Dispatch} from "redux";
import {CardsAPI} from "../../m3-DAL/axios";


const initialState = {
    cards:''

}

export type IniticalStateCardType = typeof initialState

export const packsReducer = (state: IniticalStateCardType = initialState, action: ActionTypeCards): IniticalStateCardType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {
                ...state,
                cards:action.cards,
            }
        default:
            return state
    }
}

export const getCardsAC = (cards:any) => ({ type:"CARDS/GET-CARDS",cards}as const)



export type GetCardsAC = ReturnType<typeof getCardsAC>

export const getCardsTC = (cardAnswer:string,cardQuestion:string,cardsPack_id:string,min:number,
                           max:number,sortCards:string,page:number,pageCount:number) => (dispatch: Dispatch)=>{
    return CardsAPI.getCards(cardAnswer,cardQuestion,cardsPack_id,min,max,sortCards,page,pageCount)
        .then((res)=>{
            debugger
            dispatch(getCardsAC(res.data))
        })
}




export type ActionTypeCards =
    | GetCardsAC

