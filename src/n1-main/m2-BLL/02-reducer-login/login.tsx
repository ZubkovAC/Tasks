import { AuthAPI } from "../../m3-DAL/axios"

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    error: null,
    isAuth: false,
    avatar:null as null | string,
    userName: ''
}

export const loginReducer = (state:initialStateType = initialState, action:ActionType):initialStateType =>{
    switch (action.type) {
        case "LOGIN/LOGIN":
            return {
                ...state,
                email: action.email,
                password:action.password,
                rememberMe: action.rememberMe
            }
        case 'LOGIN/CHANGE-ERROR':
            return {
                ...state
                , error: action.error
            }
        case 'LOGIN/CHECK-AUTH':
            return {
                ...state, 
                isAuth: action.isAuth
            }
        case 'LOGIN/GET-PROFILE':
            return {
                ...state, 
                avatar: action.avatar, 
                userName: action.userName
            }
        default:
            return state
    }
}

// ActionType
export const loginAC = (email:string, password:string, rememberMe:boolean) =>
    ({type:"LOGIN/LOGIN", email, password, rememberMe} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)
export const isAuthAC = (isAuth: boolean) => ({type: 'LOGIN/CHECK-AUTH', isAuth} as const)
export const getProfileAC = (avatar:string, userName:string) => ({type: 'LOGIN/GET-PROFILE', avatar, userName} as const)

//TC
export const loginTC = (email:string, password:string, rememberMe:boolean) => (dispatch:any) => {
        return AuthAPI.login(email, password, rememberMe)
            .then((res)=>{
                dispatch(loginAC(email, password, rememberMe))
                dispatch(errorAC(null))
                dispatch(isAuthAC(true))
                dispatch(getProfileAC(res.data.avatar, res.data.name))
            })
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
    }

export const logoutTC = () => (dispatch:any) => {
        return AuthAPI.logout()
            .then(() => dispatch(isAuthAC(false)))
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
    }

//Type
export type initialStateType = typeof initialState
export type ActionType = loginType | errorType | isAuthType | getProfileType

export type loginType = ReturnType<typeof loginAC>
export type errorType = ReturnType<typeof errorAC>
export type isAuthType = ReturnType<typeof isAuthAC>
export type getProfileType = ReturnType<typeof getProfileAC>
