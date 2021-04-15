import {AuthAPI} from "../../m3-DAL/axios";
import {Dispatch} from "redux";

let initialState = {
    isRegistered: false,
    error: null,
    isFetching: false,
    validationEmail: false,
    validationPassword: false
}
export type RegistrationInitialStateType = {
    isRegistered: boolean
    error: null | string
    isFetching: boolean
    validationEmail: boolean
    validationPassword: boolean
}


export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: ActionTypeRegistration): RegistrationInitialStateType => {
    switch (action.type) {
        case 'REGISTERED/CHANGE-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case 'REGISTERED/CHANGE-ERROR':
            return {...state, error: action.error}
        case 'REGISTERED/IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'REGISTERED/VAL-EMAIL':
            return {...state, validationEmail: action.validationEmail}
        case 'REGISTERED/VAL-PASSWORD':
            return {...state, validationPassword: action.validationPassword}
        default:
            return state
    }
}

// Action Type
export const isRegisteredAC = (isRegistered: boolean) => ({type: 'REGISTERED/CHANGE-IS-REGISTERED', isRegistered} as const)
export const errorAC = (error: any) => ({type: 'REGISTERED/CHANGE-ERROR', error} as const)
export const isFetchingAC = (isFetching: boolean) => ({type: 'REGISTERED/IS-FETCHING', isFetching} as const)
export const validationEmailAC = (validationEmail: boolean) => ({type: 'REGISTERED/VAL-EMAIL', validationEmail} as const)
export const validationPasswordAC = (validationPassword: boolean) => ({
    type: 'REGISTERED/VAL-PASSWORD',
    validationPassword
} as const)

// TC
export const registrationTC = (email: string, password: string) =>  (dispatch: Dispatch) => {
        dispatch(isFetchingAC(true))

        return AuthAPI.createRegistration(email, password)
            .then((res) => {
                dispatch(isRegisteredAC(true));
            })
            .catch((error) => {
                if(error){
                    dispatch(errorAC(error.response.data.error))
                }
                else {
                    dispatch(errorAC(error.message))
                }
            })
            .finally(() => dispatch(isFetchingAC(false)))
}

// Type
export type IsRegisteredAC = ReturnType<typeof isRegisteredAC>
export type errorACType = ReturnType<typeof errorAC>
export type isFetchingACType = ReturnType<typeof isFetchingAC>
export type validationEmailType = ReturnType<typeof validationEmailAC>
export type validationPasswordType = ReturnType<typeof validationPasswordAC>


type ActionTypeRegistration =
    | IsRegisteredAC
    | errorACType
    | isFetchingACType
    | validationEmailType
    | validationPasswordType