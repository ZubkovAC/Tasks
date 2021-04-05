import {AuthAPI} from "../../m3-DAL/axios";

let initialState = {
    isRegistered: false
}
export type RegistrationInitialStateType = typeof initialState

export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: ActionType): RegistrationInitialStateType => {
    switch (action.type) {
        case 'CHANGE-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}



export const registrationTC = (userName:string,email:string,password:string)=>{
return (dispatch:any)=>{
    return AuthAPI.createRegistration(userName,email,password)
        .then((res:any)=>{
            debugger
            dispatch(isRegisteredAC(true))
        })
        .catch((error:any)=>console.log(error))
}
}

export const isRegisteredAC = (isRegistered: boolean) => ({type: 'CHANGE-IS-REGISTERED', isRegistered} as const)
export type IsRegisteredAC = ReturnType<typeof isRegisteredAC>

export type ActionType =
    | IsRegisteredAC