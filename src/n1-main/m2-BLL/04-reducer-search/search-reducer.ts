import {AuthAPI} from "../../m3-DAL/axios";
import {Dispatch} from "redux";
import {isRegisteredAC} from "../01-reduser1/registration-reducer";

let initialState = {
    cardName: '',
    count:5,
    cardPageTotalCount:1058
}
export type SearchInitialStateType = {
    cardName: string
    count:number
    cardPageTotalCount:number
}


export const searchReducer =
    (state: SearchInitialStateType = initialState, action: ActionTypeSearch)
        : SearchInitialStateType => {
        debugger
        switch (action.type) {
            case 'SEARCH/CHANGE-TEXT-SEARCH':
                return {...state, cardName: action.cardName}
            case 'SEARCH/COUNT-OF-CARD':
                return {...state, count: action.count}

            default:
                return state
        }

    }
//ActionCreator
export const cardNameAC = (cardName: string) => ({type: 'SEARCH/CHANGE-TEXT-SEARCH', cardName} as const)
export const cardCountAC = (count: number) => ({type: 'SEARCH/COUNT-OF-CARD',count} as const)


// Action Type
export type cardNameACType = ReturnType<typeof cardNameAC>
export type cardCountACType = ReturnType<typeof cardCountAC>

// TC


// Type
type ActionTypeSearch =
    | cardNameACType
    | cardCountACType

