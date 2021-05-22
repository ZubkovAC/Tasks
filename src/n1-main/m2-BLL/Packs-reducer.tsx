import {CardPackType, PacksAPI} from "../m3-DAL/axios"
import {Dispatch} from "redux";
import {ActionLoginType, lampAC} from "./Login-reducer";
import {AppStateType} from "./00-store";
import {ThunkDispatch} from "redux-thunk";

const initialState = {
    cardPacks:[]as Array<CardPackType>,
    cardPacksTotalCount:9999, // меньше 10 не грузится чуть больше страницы не работают -- страницы
    name:'',
    type:'TestPack',
    preloader:false,
    maxCard:999,
    RealCardPacksCount:0
}

export const packsReducer = (state: initialStateType = initialState, action: ActionPackType): initialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {
                ...state,
                cardPacks:action.array,
                cardPacksTotalCount:action.cardPacksTotalCount,
                RealCardPacksCount:action.cardPacksTotalCount
            }
        case "PACKS/CREATE-NAME-PACK":{
            return {...state,name:action.name }
        }
        case "LOGIN/PRELOADER-ON":{
            return {...state,preloader:action.preloader}
        }
        case "LOGIN/PRELOADER-OFF":{
            return {...state,preloader:action.preloader}
        }
        default:
            return state
    }
}

// ActionType
export const getPacksAC = (array:Array<CardPackType>,cardPacksTotalCount:number) =>
    ({type: "PACKS/GET-PACKS",array,cardPacksTotalCount} as const)
export const  textCreateNamePackAC = (name: string) => ({type: "PACKS/CREATE-NAME-PACK", name} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)     // выводиться куда? не используется в коде
export const preloaderOnAC = (preloader: boolean) => ({type: 'LOGIN/PRELOADER-ON', preloader} as const)     // выводиться куда? не используется в коде
export const preloaderOffAC = (preloader: boolean) => ({type: 'LOGIN/PRELOADER-OFF', preloader} as const)     // выводиться куда? не используется в коде

//TC
export const getPacksTC = (packName: string, min: number , max: number, sortPacks: any, page: number, pageCount: number, userId: string,name:string='') => (dispatch: Dispatch) => {
    return PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, userId,name)
        .then((res) => {
            if ( (+res.data.cardPacksTotalCount) <15)dispatch(getPacksAC(res.data.cardPacks,  res.data.cardPacksTotalCount ))
            else dispatch(getPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount ))
        })
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            if(error.response)   dispatch(errorAC(error.response.data.error))
            else  dispatch(errorAC(error.message))
        })
        .finally(()=> dispatch(preloaderOnAC(false)))
}


export const addPackTC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, privat: boolean, type: string,searchCardName:string,pagesList:number,cardPages:number,userId:string) => (dispatch: ThunkDispatch<AppStateType, unknown,ActionPackType | ActionLoginType >) => {
    return PacksAPI.addPack(name, path, grade, shots, rating, deckCover, privat, type)
        .then((res) =>{
            dispatch( getPacksTC(searchCardName, 0, 999,'0updated', pagesList, cardPages,userId ))})
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            if(error.response) dispatch(errorAC(error.response.data.error))
            else dispatch(errorAC(error.message))
        })
}

export const updatePackTC = (_id: string,grade:number, name: string,searchCardName:string,pagesList:number,cardPages:number,userId:string) => (dispatch: ThunkDispatch<AppStateType, unknown, ActionPackType | ActionLoginType >) => {
    return PacksAPI.updatePack(_id, name,grade)
        .then((res) => dispatch( getPacksTC(searchCardName, 0, 999,'0updated', pagesList, cardPages, userId)))
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            dispatch(errorAC(error.response.data.error))
        })
        .finally(()=> dispatch(preloaderOnAC(false)))
}

export const deletePackTC = (id: string,searchCardName:string,pagesList:number,cardPages:number,userId:string) => (dispatch: ThunkDispatch<AppStateType, unknown, ActionPackType | ActionLoginType >) => {
    return PacksAPI.deletePack(id)
        .then((res) =>
            dispatch( getPacksTC(searchCardName, 0, 999,'0updated', pagesList, cardPages, userId)))
        .catch((err)=>{
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
        })
}

//Type
export type initialStateType = typeof initialState

export type ActionPackType =
    | GetPacksAC
    | TextCreateNamePackAC
    | ErrorType
    | PreloaderOnAC
    | PreloaderOffAC

export type GetPacksAC = ReturnType<typeof getPacksAC>
export type TextCreateNamePackAC = ReturnType<typeof textCreateNamePackAC>
export type ErrorType = ReturnType<typeof errorAC>
export type PreloaderOnAC = ReturnType<typeof preloaderOnAC>
export type PreloaderOffAC = ReturnType<typeof preloaderOffAC>

