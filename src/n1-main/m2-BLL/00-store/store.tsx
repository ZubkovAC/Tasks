import {applyMiddleware,combineReducers, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";
import {reserseReducer} from "../03-reducer-newPassword/reverseRassword";
import {registrationReducer} from "../01-reduser1/registration-reducer";
import {loginReducer} from "../02-reducer-login/login";
import thunk from 'redux-thunk'
import {searchReducer} from "../04-reducer-search/search-reducer";

let rootReducer = combineReducers({
    start:StartReducer,
    newPassword:reserseReducer,
    registration: registrationReducer,
    login: loginReducer,
    search:searchReducer
})

export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>
