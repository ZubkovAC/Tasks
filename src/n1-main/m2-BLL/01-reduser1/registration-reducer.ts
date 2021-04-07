import {AuthAPI} from "../../m3-DAL/axios";

let initialState = {
    isRegistered: false,
    error: null,
    isFetching: false
}
export type RegistrationInitialStateType = {
    isRegistered: boolean
    error: null | string
    isFetching: boolean
}

type responseType={
    response:{
        data:{
            error:string
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
            .catch((error:responseType) => {
                console.log({...error})
                dispatch(errorAC(error.response.data.error))
            })
            .then(()=> dispatch(isFetchingAC(false)))
    }
}


export const isRegisteredAC = (isRegistered: boolean) => ({type: 'CHANGE-IS-REGISTERED', isRegistered} as const)
export const errorAC = (error: any) => ({type: 'CHANGE-ERROR', error} as const)
export const isFetchingAC = (isFetching: boolean) => ({type: 'IS-FETCHING', isFetching} as const)
export type IsRegisteredAC = ReturnType<typeof isRegisteredAC>
export type errorACType = ReturnType<typeof errorAC>
export type isFetchingACType = ReturnType<typeof isFetchingAC>


type ActionTypeRegistration =
    | IsRegisteredAC
    | errorACType
    | isFetchingACType