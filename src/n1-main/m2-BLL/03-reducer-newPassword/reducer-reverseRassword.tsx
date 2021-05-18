import {AuthAPI} from "../../m3-DAL/axios"
import {Dispatch} from "redux";
import {lampAC} from "../02-reducer-login/reducer-login";

const reserseInitialState = {
    email: '',
    from: '',
    message:'' ,
    password:'',
    redirect: false,
}

export const reserseReducer = (state: ReserseInitialState = reserseInitialState, action: ActionType): ReserseInitialState => {
    switch (action.type) {
        case "REVERSE/PASSWORD":
            return {...state, password: action.password}
        case "REVERSE/NEW-PASSWORD": {
            return {
                ...state,
                email: action.email,
                from: action.from,
                message:action.message
            }
        }
        case "REVERSE/REDIRECT-TRUE": {
            return {...state, redirect: false}
        }
        case "REVERSE/REDIRECT-FALSE": {
            return {...state, redirect: true}
        }
        default:
            return state

    }
}

//Action
export const resPassword = (email: string, from: string,message:string) =>
    ({type: "REVERSE/NEW-PASSWORD", email,from, message} as const)
export const redirectT = () => ({type: "REVERSE/REDIRECT-TRUE"} as const)
export const redirectF = () => ({type: "REVERSE/REDIRECT-FALSE"} as const)
export const passwordAC = (password: string) => ({type: "REVERSE/PASSWORD", password} as const)

//TC     password recover link ???
export const resPasswordTC = (email: string, from: string) => (dispatch: Dispatch) => {
    return AuthAPI.forgot(email, from)
        .then((res) => {
            if (res.data.success === true) dispatch(resPassword(email, from,'Ok go to Mail'))
        })
        .catch((error) => alert(error))
        .finally(()=>setTimeout(() => dispatch(resPassword('', '','')), 20000))
}

// Type
export type ReserseInitialState = typeof reserseInitialState
export type ActionType =
    | ResPassword
    | RedirectT
    | RedirectF
    | Password

export type ResPassword = ReturnType<typeof resPassword>
export type RedirectT = ReturnType<typeof redirectT>
export type RedirectF = ReturnType<typeof redirectF>
export type Password = ReturnType<typeof passwordAC>