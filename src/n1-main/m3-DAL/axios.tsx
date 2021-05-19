import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})



export const AuthAPI = {
    // forgot(email:string,from:string,message:string = "\n<div style=\"background-color: lime; padding: 15px\">\npassword recovery link: \n<a href='http://localhost:3000/#/newPassword/$token$'>link</a>\n</div>\n"){
        forgot(email:string,from:string,message:string = "\n<div style=\"background-color: lime; padding: 15px\">\npassword recovery link: \n<a href='https://zubkovac.github.io/Tasks/#/newPassword/$token$'>link</a>\n</div>\n"){
        return instance.post('auth/forgot',{email,from,message})
    },
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
        return instance.get<CardGetTypeResponse>(`cards/card`,{params:{cardsPack_id:cardPackId,cardQuestion,cardAnswer,pageCount}})
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

type CardGetTypeResponse = {
    cards:CardTypeResponce[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}


export type CardTypeResponce = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id:string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}



