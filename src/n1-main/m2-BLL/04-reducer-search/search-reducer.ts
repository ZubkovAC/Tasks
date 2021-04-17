
let initialState = {
    searchCardName: '',
    countSelect:10,
    cardPages:3,
    cardPageTotalCount:1557, // меньше 10 не грузится чуть больше страницы не работают -- страницы
    pagesList:1,
}



export const searchReducer =
    (state: SearchInitialStateType = initialState, action: ActionTypeSearch): SearchInitialStateType => {
        switch (action.type) {
            case 'SEARCH/CHANGE-TEXT-SEARCH':
                return {...state, searchCardName: action.searchCardName}
            case 'SEARCH/COUNT-OF-CARD':
                return {...state, cardPages: action.count}
            case "SEARCH/PAGE-COUNT":
                return {...state,pagesList:action.pagesList}
            default:
                return state
        }

    }

//ActionCreator
export const cardNameAC = (searchCardName: string) => ({type: 'SEARCH/CHANGE-TEXT-SEARCH', searchCardName} as const)
export const cardCountAC = (count: number) => ({type: 'SEARCH/COUNT-OF-CARD',count} as const)
export const pagesListAC = (pagesList: number) => ({type: 'SEARCH/PAGE-COUNT',pagesList} as const)


// Action Type
export type CardNameACType = ReturnType<typeof cardNameAC>
export type CardCountACType = ReturnType<typeof cardCountAC>
export type PagesListACACType = ReturnType<typeof pagesListAC>

// TC


// Type

export type SearchInitialStateType = typeof initialState

type ActionTypeSearch =
    | CardNameACType
    | CardCountACType
    | PagesListACACType

