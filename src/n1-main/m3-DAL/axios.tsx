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
    getPacks(packName?: string, min?: number, max?: number, sortPacks?: string, page?: number, pageCount?: number, userId?: string){
        return instance.get(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&userId=${userId}`)
    },
    addPack(name?: string, path?: string, grade?: number, shots?: number, rating?: number, deckCover?: string, isPrivate?: boolean, typeQ?: string){
        return instance.post(`cards/pack`, {name, path, grade, shots, rating, deckCover, isPrivate, typeQ})
    },
    updatePack(_id: string, name?: string){
        return instance.put(`cards/pack`, {_id, name})
    },
    deletePack(id: string){
        return instance.delete(`cards/pack?id=${id}`)
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

