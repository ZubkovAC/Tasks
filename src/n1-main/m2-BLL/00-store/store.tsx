import {applyMiddleware,combineReducers, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";
import {reserseReducer} from "../03-reducer-newPassword/reverseRassword";
import {registrationReducer} from "../01-reduser1/registration-reducer";
import {loginReducer} from "../02-reducer-login/login";
import {packsReducer} from "../05-reducer-packs/packs";
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    start:StartReducer,
    resPassword:reserseReducer,
    registration: registrationReducer,
    login: loginReducer,
    packs: packsReducer
})

export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>
