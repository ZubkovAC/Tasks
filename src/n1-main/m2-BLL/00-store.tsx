import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {StartReducer} from "./start";
import {reserseReducer} from "./ReverseRassword-reducer";
import {registrationReducer} from "./Registration-reducer";
import {loginReducer} from "./Login-reducer";
import {packsReducer} from "./Packs-reducer";
import thunk from 'redux-thunk'
import {reducerSearch} from "./Reducer-search";
import {cardsReducer} from "./Cards-reducer";


let rootReducer = combineReducers({
    start:StartReducer,
    resPassword:reserseReducer,
    registration: registrationReducer,
    login: loginReducer,
    search:reducerSearch,
    packs: packsReducer,
    cards:cardsReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// export let store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>
