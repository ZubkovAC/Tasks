import {AuthAPI} from "../../m3-DAL/axios"
import {Dispatch} from "redux";


const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    isAuth: false,
    me:false,
    avatar: '',
    userName: '',
    lamp: true,
    error: null as null | string,
    isEmailValid:false,
    isPassValid:false,
    userID:'0',
    publicCardPacksCount:0
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
            return {...state, isAuth: action.isAuth,me:action.me}
        case 'LOGIN/GET-PROFILE':
            return {...state, avatar: action.avatar, userName: action.userName,userID:action.userID,
                publicCardPacksCount:action.cardPackCount}
        case "LOGIN/TEST-ERROR":
            return {...state, lamp: action.lamp}
        case "LOGIN/UPDATE":
            return {...state, userName: action.name , avatar:action.avatar}
        default:
            return state
    }
}

// ActionType
export const loginAC = (email: string, password: string, rememberMe: boolean) =>
    ({type: "LOGIN/LOGIN", email, password, rememberMe} as const)
export const errorAC = (error: string | null, isEmailValid:boolean, isPassValid:boolean) =>
    ({type: 'LOGIN/CHANGE-ERROR', error,isEmailValid,isPassValid} as const)
export const isAuthAC = (isAuth: boolean,me:boolean) => ({type: 'LOGIN/CHECK-AUTH', isAuth,me} as const)
export const getProfileAC = (avatar: string, userName: string,userID:string,cardPackCount:number) => ({
    type: 'LOGIN/GET-PROFILE', avatar, userName,userID,cardPackCount} as const)
export const lampAC = (lamp: boolean) => ({type: 'LOGIN/TEST-ERROR', lamp} as const)
export const updateAccAC = (name:string,avatar:string)=>({type:'LOGIN/UPDATE',name,avatar}as const)
//TC
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    return AuthAPI.login(email, password, rememberMe)
        .then((res) => {
            if (res) {
                dispatch(loginAC(email, password, rememberMe))
                dispatch(errorAC(null,false,false))
                dispatch(isAuthAC(true,true))
                dispatch(getProfileAC(res.data.avatar, res.data.name,res.data._id,res.data.publicCardPacksCount))
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
        .then(() => dispatch(isAuthAC(false,false)))
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
            dispatch(getProfileAC(res.data.avatar, res.data.name,res.data._id,res.data.publicCardPacksCount))
            dispatch(isAuthAC(true,true))
        })
        .catch(res => {
            dispatch(isAuthAC(false,true))
            dispatch(lampAC(false))
            setTimeout(() => dispatch(lampAC(true)), 2000)
        })
}
export const updateAccTC = (name:string,avatar:string) => (dispatch:Dispatch) => {
    return AuthAPI.updateLogin(name,avatar)
        .then((res)=>{
            dispatch(updateAccAC(res.data.updatedUser.name,res.data.updatedUser.avatar))
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
    | UpdateAccAC

export type LoginType = ReturnType<typeof loginAC>
export type ErrorType = ReturnType<typeof errorAC>
export type IsAuthType = ReturnType<typeof isAuthAC>
export type GetProfileType = ReturnType<typeof getProfileAC>
export type LampAC = ReturnType<typeof lampAC>
export type UpdateAccAC = ReturnType<typeof updateAccAC>