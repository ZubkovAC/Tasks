import {AuthAPI} from "../../m3-DAL/axios";
import {Dispatch} from "redux";
import {isRegisteredAC} from "../01-reduser1/registration-reducer";

let initialState = {
    cardName: ''
}
export type SearchInitialStateType = {
    cardName: string
}


export const searchReducer =
    (state: SearchInitialStateType = initialState, action: ActionTypeRegistration)
        : SearchInitialStateType => {
    debugger
        switch (action.type) {
            case 'SEARCH/CHANGE-TEXT-SEARCH':
                return {...state, cardName: action.cardName}

            default:
                return state
        }
    }
//ActionCreator
export const cardNameAC = (cardName: string) => ({type: 'SEARCH/CHANGE-TEXT-SEARCH', cardName} as const)


// Action Type
export type cardNameACType = ReturnType<typeof cardNameAC>

// TC


// Type
type ActionTypeRegistration =
    |cardNameACType

