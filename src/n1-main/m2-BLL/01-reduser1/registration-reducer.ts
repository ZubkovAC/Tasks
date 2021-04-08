import {AuthAPI} from "../../m3-DAL/axios";

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

type responseType = {
    response: {
        data: {
            error: string
        }
    }
}

export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: ActionTypeRegistration): RegistrationInitialStateType => {
    switch (action.type) {
        case 'CHANGE-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case 'CHANGE-ERROR':
            return {...state, error: action.error}
        case 'IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'VAL-EMAIL':
            return {...state, validationEmail: action.validationEmail}
        case 'VAL-PASSWORD':
            return {...state, validationPassword: action.validationPassword}
        default:
            return state
    }
}


export const registrationTC = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(isFetchingAC(true))

        return AuthAPI.createRegistration(email, password)
            .then((res: any) => {
                dispatch(isRegisteredAC(true));
            })
            .catch((error: responseType) => {
                console.log({...error})
                dispatch(errorAC(error.response.data.error))
            })
            .then(() => dispatch(isFetchingAC(false)))
    }
}


export const isRegisteredAC = (isRegistered: boolean) => ({type: 'CHANGE-IS-REGISTERED', isRegistered} as const)
export const errorAC = (error: any) => ({type: 'CHANGE-ERROR', error} as const)
export const isFetchingAC = (isFetching: boolean) => ({type: 'IS-FETCHING', isFetching} as const)
export const validationEmailAC = (validationEmail: boolean) => ({type: 'VAL-EMAIL', validationEmail} as const)
export const validationPasswordAC = (validationPassword: boolean) => ({
    type: 'VAL-PASSWORD',
    validationPassword
} as const)

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