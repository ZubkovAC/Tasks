import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

//   https://neko-back.herokuapp.com/2.0
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
    forgot(email:string,from:string,message:string){
        return instance.post('auth/forgot',{email,from,message})
    },
    newPassword(password:string,resetPasswordToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordToken})
    }
}

export const PacksAPI = {
    getPacks(packName?: string, min?: number  , max?: number, sortPacks?: string, page?: number, pageCount?: number, userId?: string){
        return instance.get(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&userId=${userId}`)
    },
    addPack(name?: string, path?: string, grade?: number, shots?: number,
            rating?: number, deckCover?: string, privat?: boolean, type?: string){
        return instance.post(`cards/pack`, {cardsPack:{name, path, grade,
            shots, rating, deckCover, privat, type}})
    },
    updatePack(_id: string,rating:number, name: string){
        return instance.put(`cards/pack`, {cardsPack:{_id,rating, name}})
    },
    deletePack(id: string){
        return instance.delete(`cards/pack?id=${id}`)
    },
}

export const CardsAPI = {
    getCards(cardPackId:string,cardQuestion:string,cardAnswer:string){
        return instance.get(`cards/card?pageCount=10&cardsPack_id=${cardPackId}&cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}`)
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
export type UpdateTypeInstase={
    _id:string
    question:string
    answer:string
}

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


