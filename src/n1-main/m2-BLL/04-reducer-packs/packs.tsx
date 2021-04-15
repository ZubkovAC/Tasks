import { PacksAPI } from "../../m3-DAL/axios"

const initialState = {
    packName: '',
    min: 0, 
    max: 0, 
    sortPacks: '', 
    page: 0, 
    pageCount: 0, 
    userId: ''
}

export const packsReducer = (state:initialStateType = initialState, action:ActionType):initialStateType =>{
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {
                ...state
            }
        default:
            return state
    }
}

// ActionType
export const getPacksAC = (email:string, password:string, rememberMe:boolean) =>
    ({type:"PACKS/GET-PACKS", email, password, rememberMe} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)

//TC
export const getPacksACTC = (email:string, password:string, rememberMe:boolean) => (dispatch:any) => {
        return PacksAPI.getPacks()
            .then((res)=>{
                dispatch(getPacksAC(email, password, rememberMe))
            })
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
    }

//Type
export type initialStateType = typeof initialState
export type ActionType = loginType | errorType 

export type loginType = ReturnType<typeof getPacksAC>
export type errorType = ReturnType<typeof errorAC>