import { PacksAPI } from "../../m3-DAL/axios"

const initialState = {
    packName: '',
    min: 0, 
    max: 0, 
    sortPacks: '', 
    page: 0, 
    pageCount: 0, 
    userId: ''
}

export const packsReducer = (state:initialStateType = initialState, action:ActionType):initialStateType =>{
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {
                ...state,
                packName: action.packName,
                min: action.min, 
                max: action.max, 
                sortPacks: action.sortPacks, 
                page: action.page, 
                pageCount: action.pageCount, 
                userId: action.userId
            }
        default:
            return state
    }
}

// ActionType
export const getPacksAC = (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, userId: string) =>
    ({type:"PACKS/GET-PACKS", packName, min, max, sortPacks, page, pageCount, userId} as const)
export const addPackAC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, isPrivate: boolean, typeQ: string) =>
    ({type:"PACKS/ADD-PACK", name, path, grade, shots, rating, deckCover, isPrivate, typeQ} as const)
export const updatePackAC = (_id: string, name: string) =>
    ({type:"PACKS/UPDATE-PACK", _id, name} as const)
export const deletePackAC = (id: string) =>
    ({type:"PACKS/DELETE-PACK", id} as const)
export const errorAC = (error: any) => ({type: 'LOGIN/CHANGE-ERROR', error} as const)

//TC
export const getPacksTC = (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, userId: string) => (dispatch:any) => {
    return PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, userId)
        .then((res)=>{
            dispatch(getPacksAC(packName, min, max, sortPacks, page, pageCount, userId))
        })
        .catch((error: any) => {
            dispatch(errorAC(error.response.data.error))
        })
}
export const addPackTC = (name: string, path: string, grade: number, shots: number, rating: number, deckCover: string, isPrivate: boolean, typeQ: string) => (dispatch:any) => {
        return PacksAPI.addPack(name, path, grade, shots, rating, deckCover, isPrivate, typeQ)
            .then((res)=>{
                dispatch(addPackAC(name, path, grade, shots, rating, deckCover, isPrivate, typeQ))
            })
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
}
export const updatePackTC = (_id: string, name: string) => (dispatch:any) => {
        return PacksAPI.updatePack(_id, name)
            .then((res)=>{
                dispatch(updatePackAC(_id, name))
            })
            .catch((error: any) => {
                dispatch(errorAC(error.response.data.error))
            })
}
export const deletePackTC = (id: string) => (dispatch:any) => {
        return PacksAPI.deletePack(id)
            .then((res)=>{
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