import { CardsAPI } from "../../m3-DAL/axios"

const initialState = {
    packName: '',
    min: 0, 
    max: 0, 
    sortPacks: '', 
    page: 0, 
    pageCount: 0, 
    userId: ''
}

export const cardsReducer = (state:initialStateType = initialState, action:ActionType):initialStateType =>{
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {
                ...state,
            }
        default:
            return state
    }
}

// ActionType
export const getCardsAC = (email:string, password:string, rememberMe:boolean) =>
    ({type:"CARDS/GET-CARDS", email, password, rememberMe} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)

//TC
export const cardsTC = (email:string, password:string, rememberMe:boolean) => (dispatch:any) => {
        return CardsAPI.getCards()
            .then((res)=>{
                dispatch(getCardsAC(email, password, rememberMe))
            })
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
    }

//Type
export type initialStateType = typeof initialState
export type ActionType = loginType | errorType 

export type loginType = ReturnType<typeof getCardsAC>
export type errorType = ReturnType<typeof errorAC>