
import {PacksAPI} from "../../m3-DAL/axios"
import {PardsTypeProps} from "../../m1-UI/NavBar(left)/04-Packs/Packs";
import {Dispatch} from "redux";
import {ActionLoginType, lampAC} from "../02-reducer-login/reducer-login";
import {useSelector} from "react-redux";
import {AppStateType} from "../00-store/store";
import {ThunkDispatch} from "redux-thunk";


const initialState = {
    cardPacks:[]as Array<PardsTypeProps>,
    cardPacksTotalCount:0,
    name:'',
    type:'TestPack'
}

export const reducerPacks = (state: initialStateType = initialState, action: ActionPackType): initialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {
                ...state,
                cardPacks:action.array,
                cardPacksTotalCount:action.cardPacksTotalCount
            }
        case "PACKS/CREATE-NAME-PACK":{
            return {...state,name:action.name }
        }
        default:
            return state
    }
}

// ActionType
export const getPacksAC = (array:Array<PardsTypeProps>,cardPacksTotalCount:number) =>
    ({type: "PACKS/GET-PACKS",array,cardPacksTotalCount} as const)
export const  textCreateNamePackAC = (name: string) => ({type: "PACKS/CREATE-NAME-PACK", name} as const)


export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)     // выводиться куда? не используется в коде





//TC
export const getPacksTC = (packName: string, min: number , max: number, sortPacks: string, page: number, pageCount: number, userId: string) => (dispatch: Dispatch) => {
    return PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, userId)
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks,res.data.cardPacksTotalCount))
        })
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            if(error.response){
                dispatch(errorAC(error.response.data.error))
            }
            else{
                dispatch(errorAC(error.message))
            }
        })
}



export const addPackTC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, privat: boolean, type: string,searchCardName:string,pagesList:number,cardPages:number) => (dispatch: ThunkDispatch<AppStateType, unknown,ActionPackType | ActionLoginType >) => {
    return PacksAPI.addPack(name, path, grade, shots, rating, deckCover, privat, type)
        .then((res) => {
            dispatch( getPacksTC(searchCardName, 0, 99,'0updated', pagesList, cardPages, 'user_id=5eb543f6bea3ad21480f1ee7'))
            console.log('ok',{...res.data})
        })
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            if(error.response){
                dispatch(errorAC(error.response.data.error))
            }
            else{
                dispatch(errorAC(error.message))
            }
        })
}

export const updatePackTC = (_id: string, name: string) => (dispatch: Dispatch) => {
    return PacksAPI.updatePack(_id, name)
        .then((res) => {
            console.log({...res.data})
        })
        .catch((error) => {
            dispatch(lampAC(false))
            setTimeout(()=>dispatch(lampAC(true)),2000)
            dispatch(errorAC(error.response.data.error))
        })
}

export const deletePackTC = (id: string) => (dispatch: Dispatch) => {
    return PacksAPI.deletePack(id)
        .then((res) => {
            console.log({...res.data})
        })
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

export type GetPacksAC = ReturnType<typeof getPacksAC>
export type TextCreateNamePackAC = ReturnType<typeof textCreateNamePackAC>



export type ErrorType = ReturnType<typeof errorAC>





//
// name: "english"
// user_name: "student@test.com"
// rating: 0
// created: "2021-03-10T13:36:43.232Z"
// updated: "2021-03-26T13:57:17.575Z"

// user_id: "600dba247776b00004e02307"


// cardsCount: 7
// deckCover: null
// grade: 0
// more_id: "600dba247776b00004e02307"
// path: "/def"
// private: false

// shots: 0
// type: "pack"


// __v: 0
// _id: "6048cb6b25d4bb00042a4667"