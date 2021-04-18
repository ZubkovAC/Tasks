import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {StartReducer} from "../01-reduser1/start";
import {reserseReducer} from "../03-reducer-newPassword/reducer-reverseRassword";
import {registrationReducer} from "../01-reduser1/registration-reducer";
import {reducerLogin} from "../02-reducer-login/reducer-login";
import {reducerPacks} from "../05-reducer-packs/reducer-packs";
import thunk from 'redux-thunk'
import {reducerSearch} from "../04-reducer-search/reducer-search";
import {cardsReducer} from "../06-reducer-cards/reducer-cards";




let rootReducer = combineReducers({
    start:StartReducer,
    resPassword:reserseReducer,
    registration: registrationReducer,
    login: reducerLogin,
    search:reducerSearch,
    packs: reducerPacks,
    cards:cardsReducer
})


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>
