import { AuthAPI } from "../../m3-DAL/axios"



const reserseInitialState ={
    password:'',
    resetPasswordsToken:'',
    redirect: false
}

export type ReserseInitialState = typeof reserseInitialState


export const reserseReducer = ( state:ReserseInitialState = reserseInitialState, action:ActionType):ReserseInitialState =>{
    switch (action.type) {
        case "PASSWORD":
            return {
                ...state,
                password:action.password
            }
        case "NEW-PASSWORD":{
            return {
                ...state,
                password:action.password,
                resetPasswordsToken:action.resetPasswordsToken,
            }
        }
        case "REDIRECT-TRUE":{
            return {
                ...state,
                redirect:true
            }
        }
        case "REDIRECT-FALSE":{
            return {
                ...state,
                redirect:false
            }
        }

        default:
            return state

    }
}

export type ActionType =
      ResPassword
    | RedirectT
    | RedirectF
    | Password

export type ResPassword = ReturnType<typeof resPassword>
export type RedirectT = ReturnType<typeof redirectT>
export type RedirectF = ReturnType<typeof redirectF>
export type Password = ReturnType<typeof passwordAC>

export const resPassword = (password:string,resetPasswordsToken:string) =>
    ({type:"NEW-PASSWORD",password,resetPasswordsToken}as const)

export const redirectT = () => ({type:"REDIRECT-TRUE"}as const)
export const redirectF = () => ({type:"REDIRECT-FALSE"}as const)

export const passwordAC = (password:string) => ({type:"PASSWORD",password}as const)



export const resPasswordTC = (password:string,resetPasswordsToken:string)=>(dispatch:any)=>{
        return AuthAPI.newPassword(password,resetPasswordsToken)
            .then((res)=>{
                dispatch(redirectF())
            })
            .then((res:any)=>{
                dispatch(resPassword(password,resetPasswordsToken))
            })
            .catch((error:any)=> {
                console.log(password)
                alert(error.error)
            })
    }
