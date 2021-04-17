
import {PacksAPI} from "../../m3-DAL/axios"
import {PardsTypeProps} from "../../m1-UI/Common/Packs/Packs";

const initialState = {
    cardPacks:[]as Array<PardsTypeProps>,
    name: [],
    user_name: '',
    rating: 0,
    created: '',
    sortPacks: '',
    updated: '',
    cardPacksTotalCount:0,
}

export const packsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {
                ...state,
                cardPacks:action.array,
                // name: action.name,
                // user_name: action.user_name,
                // rating: action.rating,
                // created: action.created,
                // updated: action.updated,
                cardPacksTotalCount:action.cardPacksTotalCount
            }
        default:
            return state
    }
}

// ActionType
// export const getPacksAC = (name: string, user_name: string, rating: number, created: string, updated: string,cardPacksTotalCount:number) =>
export const getPacksAC = (array:Array<PardsTypeProps>,cardPacksTotalCount:number) =>
    ({type: "PACKS/GET-PACKS",array,cardPacksTotalCount} as const)
export const addPackAC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, isPrivate: boolean, typeQ: string) =>
    ({type: "PACKS/ADD-PACK", name, path, grade, shots, rating, deckCover, isPrivate, typeQ} as const)
export const updatePackAC = (_id: string, name: string) =>
    ({type: "PACKS/UPDATE-PACK", _id, name} as const)
export const deletePackAC = (id: string) =>
    ({type: "PACKS/DELETE-PACK", id} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)


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


//TC
export const getPacksTC = (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, userId: string) => (dispatch: any) => {
    return PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, userId)
        .then((res) => {
            debugger

            dispatch(getPacksAC(res.data.cardPacks,res.data.cardPacksTotalCount))
            // dispatch(getPacksAC(res.data.cardPacks.name, res.data.cardPacks.user_name, res.data.cardPacks.rating, res.data.cardPacks.created, res.data.cardPacks.updated,res.data.cardPacksTotalCount))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
        })
}

export const addPackTC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, isPrivate: boolean, typeQ: string) => (dispatch: any) => {
    return PacksAPI.addPack(name, path, grade, shots, rating, deckCover, isPrivate, typeQ)
        .then((res) => {
            dispatch(addPackAC(name, path, grade, shots, rating, deckCover, isPrivate, typeQ))
        })
        .catch((error: any) => {
            dispatch(errorAC(error.response.data.error))
        })
}

export const updatePackTC = (_id: string, name: string) => (dispatch: any) => {
    return PacksAPI.updatePack(_id, name)
        .then((res) => {
            dispatch(updatePackAC(_id, name))
        })
        .catch((error: any) => {
            dispatch(errorAC(error.response.data.error))
        })
}

export const deletePackTC = (id: string) => (dispatch: any) => {
    return PacksAPI.deletePack(id)
        .then((res) => {
            dispatch(deletePackAC(id))
        })
        .catch((error: any) => {
            dispatch(errorAC(error.response.data.error))
        })
}

//Type
export type initialStateType = typeof initialState
export type ActionType = getType | addType | updateType | deleteType | errorType

export type getType = ReturnType<typeof getPacksAC>
export type addType = ReturnType<typeof addPackAC>
export type updateType = ReturnType<typeof updatePackAC>
export type deleteType = ReturnType<typeof getPacksAC>
export type errorType = ReturnType<typeof errorAC>