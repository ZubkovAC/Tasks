import {AuthAPI} from "../../m3-DAL/axios"


const reserseInitialState = {
    password: '',
    resetPasswordsToken: '',
    redirect: false
}




export const reserseReducer = (state: ReserseInitialState = reserseInitialState, action: ActionType): ReserseInitialState => {
    switch (action.type) {
        case "REVERSE/PASSWORD":
            return {...state, password: action.password}
        case "REVERSE/NEW-PASSWORD": {
            return {
                ...state, password: action.password,
                resetPasswordsToken: action.resetPasswordsToken,
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
export const resPassword = (password: string, resetPasswordsToken: string) =>
    ({type: "REVERSE/NEW-PASSWORD", password, resetPasswordsToken} as const)
export const redirectT = () => ({type: "REVERSE/REDIRECT-TRUE"} as const)
export const redirectF = () => ({type: "REVERSE/REDIRECT-FALSE"} as const)
export const passwordAC = (password: string) => ({type: "REVERSE/PASSWORD", password} as const)

//TC
export const resPasswordTC = (password: string, resetPasswordsToken: string) => (dispatch: any) => {
    return AuthAPI.newPassword(password, resetPasswordsToken)
        .then((res) => {
            dispatch(redirectF())
        })
        .then((res: any) => {
            dispatch(resPassword(password, resetPasswordsToken))
        })
        .catch((error: any) => {
            console.log(password)
            dispatch(redirectF())
            dispatch(redirectT())
            alert(error.error)
        })
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