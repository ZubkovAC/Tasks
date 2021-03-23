import {combineReducers, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";

let rootReducer = combineReducers({
    start:StartReducer
})


export let store = createStore(rootReducer)

export type AppStoreType = typeof store

