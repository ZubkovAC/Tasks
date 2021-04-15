
let initialState = {
    start:'Hello'
}
export type InitialState = typeof initialState

export const StartReducer = (state:InitialState = initialState,action:ActionType):InitialState=>{
    switch(action.type){
        case 'START':
            return state
        default:
            return state
    }
}

export const start = () => ({type:'START'}as const)
export type Start = ReturnType<typeof start>

export type ActionType = Start