import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const AuthAPI = {
    createRegistration(email:string,password:string){
        return instance.post('auth/register',{email,password})
    },
    authMe(){
        return instance.post('auth/me',{})
    },
    login(email:string,password:string,rememberMe:boolean){
        return instance.post('auth/login',{email,password,rememberMe})
    },
    logout(){
        return instance.delete('auth/me',{})
    },
    newPassword(password:string,resetPasswordsToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordsToken})
    }
}

export const PacksAPI = {
    getPacks( page: number = 1, pageCount: number = 5, packName?: string, min?: number, max?: number, sortPacks?: string,userId?: string){
        return instance.get(`cards/pack?page=${page}`)
    },
    deletePack(userId: string){
        return instance.delete(`cards/pack?id=${userId}`)
    }
}

export const CardsAPI = {
    getCards( page: number = 1, pageCount: number = 5, packName?: string, min?: number, max?: number, sortPacks?: string,userId?: string){
        return instance.get(`cards/pack?page=${page}`)
    },
    deleteCard(userId: string){
        return instance.delete(`cards/card?id=${userId}`)
    }
}