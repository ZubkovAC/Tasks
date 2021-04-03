import {applyMiddleware, combineReducers, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";
import {registrationReducer} from "../01-reduser1/registration-reducer";
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    start:StartReducer,
    registration: registrationReducer

})

export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

