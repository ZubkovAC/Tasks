import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
//   https://zubkovac.github.io/
//   http://localhost:7542/2.0/

export const AuthAPI = {
    createRegistration(email:string,password:string){
        return instance.post('auth/register',{email,password})
    },
    authMe(){
        return instance.post<LoginData>('auth/me',{})
    },
    login(email:string,password:string,rememberMe:boolean){
        return instance.post<LoginData>('auth/login',{email,password,rememberMe})
    },
    logout(){
        return instance.delete('auth/me',{})
    },
    newPassword(password:string,resetPasswordsToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordsToken})
    }
}


export type LoginData = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

