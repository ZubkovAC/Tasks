import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";
import {reserseReducer} from "../03-reducer-newPassword/reverseRassword";
import {registrationReducer} from "../01-reduser1/registration-reducer";
import {loginReducer} from "../02-reducer-login/login";
import {packsReducer} from "../05-reducer-packs/packs";
import thunk from 'redux-thunk'
import {searchReducer} from "../04-reducer-search/search-reducer";




let rootReducer = combineReducers({
    start:StartReducer,
    resPassword:reserseReducer,
    registration: registrationReducer,
    login: loginReducer,
    search:searchReducer,
    packs: packsReducer
})


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>
