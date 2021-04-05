import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {StartReducer} from "../01-reduser1/start";
import {reserseReducer} from "../03-reducer-newPassword/reverseRassword";

let rootReducer = combineReducers({
    start:StartReducer,
    newPassword:reserseReducer,

})


export let store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>