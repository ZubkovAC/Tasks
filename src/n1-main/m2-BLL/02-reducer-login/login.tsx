import { AuthAPI } from "../../m3-DAL/axios"

const initialState = {
    email:'',
    password:'',
    rememberMe: false,
    error: null,
    isAuth: false
}

export type initialStateType = typeof initialState

export const loginReducer = (state:initialStateType = initialState, action:ActionType):initialStateType =>{
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                email: action.email,
                password:action.password,
                rememberMe: action.rememberMe
            }
        case 'CHANGE-ERROR':
            return {...state, error: action.error}
        case 'CHECK-AUTH':
            return {...state, isAuth: action.isAuth}
        default:
            return state

    }
}

export type ActionType = loginType | errorType | isAuthType

export type loginType = ReturnType<typeof loginAC>
export type errorType = ReturnType<typeof errorAC>
export type isAuthType = ReturnType<typeof isAuthAC>

export const loginAC = (email:string, password:string, rememberMe:boolean) =>
    ({type:"LOGIN", email, password, rememberMe} as const)
export const errorAC = (error: any) => ({type: 'CHANGE-ERROR', error} as const)
export const isAuthAC = (isAuth: boolean) => ({type: 'CHECK-AUTH', isAuth} as const)

export const loginTC = (email:string, password:string, rememberMe:boolean) => (dispatch:any) => {
        return AuthAPI.login(email, password, rememberMe)
            .then((res)=>{
                dispatch(loginAC(email, password, rememberMe))
                dispatch(errorAC(null))
                dispatch(isAuthAC(true))
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