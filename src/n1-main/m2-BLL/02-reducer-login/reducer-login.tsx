import {AuthAPI} from "../../m3-DAL/axios"
import {Dispatch} from "redux";


const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    isAuth: false,
    avatar: '',
    userName: '',
    lamp: true,
    error: null as null | string,
    isEmailValid:false,
    isPassValid:false,
}

export const reducerLogin = (state: initialStateType = initialState, action: ActionLoginType): initialStateType => {
    switch (action.type) {
        case "LOGIN/LOGIN":
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }
        case 'LOGIN/CHANGE-ERROR':
            return {...state, error: action.error ,isEmailValid:action.isEmailValid , isPassValid:action.isPassValid}
        case 'LOGIN/CHECK-AUTH':
            return {...state, isAuth: action.isAuth}
        case 'LOGIN/GET-PROFILE':
            return {...state, avatar: action.avatar, userName: action.userName}
        case "LOGIN/TEST-ERROR":
            return {...state, lamp: action.lamp}
        default:
            return state
    }
}

// ActionType
export const loginAC = (email: string, password: string, rememberMe: boolean) =>
    ({type: "LOGIN/LOGIN", email, password, rememberMe} as const)
export const errorAC = (error: string | null, isEmailValid:boolean, isPassValid:boolean) =>
    ({type: 'LOGIN/CHANGE-ERROR', error,isEmailValid,isPassValid} as const)
export const isAuthAC = (isAuth: boolean) => ({type: 'LOGIN/CHECK-AUTH', isAuth} as const)
export const getProfileAC = (avatar: string, userName: string) => ({
    type: 'LOGIN/GET-PROFILE', avatar, userName
} as const)
export const lampAC = (lamp: boolean) => ({type: 'LOGIN/TEST-ERROR', lamp} as const)

//TC
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    return AuthAPI.login(email, password, rememberMe)
        .then((res) => {
            if (res) {
                dispatch(loginAC(email, password, rememberMe))
                dispatch(errorAC(null,false,false))
                dispatch(isAuthAC(true))
                dispatch(getProfileAC(res.data.avatar, res.data.name))
            }
        })
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(() => dispatch(lampAC(true)), 2000)
            if (error.response) dispatch(errorAC(error.response.data.error,error.response.data.isEmailValid,error.response.data.isPassValid))
            else dispatch(errorAC(error.message,true,true))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    return AuthAPI.logout()
        .then(() => dispatch(isAuthAC(false)))
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(() => dispatch(lampAC(true)), 2000)
            if (error.response) dispatch(lampAC(false))
            else dispatch(errorAC(error.message,false,false))
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    return AuthAPI.authMe()
        .then((res) => {
            dispatch(getProfileAC(res.data.avatar, res.data.name))
            dispatch(isAuthAC(true))
        })
        .catch(res => {
            dispatch(lampAC(false))
            setTimeout(() => dispatch(lampAC(true)), 2000)
        })
}


//Type
export type initialStateType = typeof initialState
export type ActionLoginType =
    | LoginType
    | ErrorType
    | IsAuthType
    | GetProfileType
    | LampAC

export type LoginType = ReturnType<typeof loginAC>
export type ErrorType = ReturnType<typeof errorAC>
export type IsAuthType = ReturnType<typeof isAuthAC>
export type GetProfileType = ReturnType<typeof getProfileAC>
export type LampAC = ReturnType<typeof lampAC>