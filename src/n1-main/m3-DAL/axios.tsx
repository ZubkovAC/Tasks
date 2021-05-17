import axios from "axios";


const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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
    forgot(email:string,from:string,message:string){
        return instance.post('auth/forgot',{email,from,message})
    },
    newPassword(password:string,resetPasswordToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordToken})
    },
    updateLogin (name:string,avatar:string){
        return instance.put('auth/me',{name,avatar})
    }
}


export const PacksAPI = {
    getPacks(packName?: string, min?: number  , max?: number, sortPacks?: string, page?: number, pageCount?: number, user_id?: string,user_name:string= ''){
        return instance.get<ResponceGetType>('cards/pack',{params:{packName,min,max,sortPacks,page,pageCount,user_id,user_name}})
    },
    addPack(name?: string, path?: string, grade?: number, shots?: number,
            rating?: number, deckCover?: string, privat?: boolean, type?: string){
        return instance.post(`cards/pack`, {cardsPack:{name, path, grade,
            shots, rating, deckCover, privat, type}})
    },
    updatePack(_id: string, name: string,grade:number){
        return instance.put(`cards/pack`, {cardsPack:{_id, name,grade}})
    },
    deletePack(id: string){
        return instance.delete(`cards/pack?id=${id}`)
    },
}

export const CardsAPI = {
    getCards(cardPackId:string,cardQuestion:string,cardAnswer:string,pageCount:number=11){
        return instance.get(`cards/card?pageCount=${pageCount}&cardsPack_id=${cardPackId}&cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}`)
    },
    createCard( cardsPack_id:string, question?:string, answer?:string, grade?:number, shots?:number, rating?:number, answerImg?:string,
                questionImg?:string, questionVideo?: string, answerVideo?:string, type?:string){
        return instance.post(`cards/card`,{card:{cardsPack_id,question,answer,grade,shots,rating,
                    answerImg,questionImg,questionVideo,answerVideo,type}})
    },
    updateCard (_id:string,question:string,answer:string){
        return instance.put( `cards/card`, {card:{_id,question,answer}} )
    },
    deleteCard (id:string){
        return instance.delete( `cards/card?id=${id}`)
    },
    cardGrade(grade:number,card_id:string){
        return instance.put(`cards/grade`,{grade,card_id})
    }
}

// Type

export type CreateCardType = {
    cardsPack_id:string,
    question?:string,
    answer?:string,
    grade?:number,
    shots?:number,
    rating?:number,
    answerImg?:string,
    questionImg?:string,
    questionVideo?: string,
    answerVideo?:string,
    type?:string
}
export type ResponceGetType={
    cardPacks:CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardPackType={
    cardsCount: number
    created: string
    deckCover: null
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type:string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id:string

}




