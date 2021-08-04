import {
    LOADING, ERROR, PAGE,
    GET_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID,
    FILTER_BY_GENRE, FILTER_BY_SOURCE, FILTER_BY_PLATFORM,
    ORDER_ALPHABETICALLY_ASC, ORDER_ALPHABETICALLY_DES, ORDER_BY_RATING_ASC, ORDER_BY_RATING_DES
} from './constants'


const initialState = {
    games: [],
    game: {},
    page: 1,
    loading: false,
    error: false

}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        //------------  CONTEXT  ----------------
        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }

        case ERROR: //ver como ir manejando este error. 
            return {
                ...state,
                error: action.payload
            }

        case PAGE:
            return {
                ...state,
                page: action.payload
            }

        //------------  GET  ----------------
        case GET_GAMES:
            return {
                ...state,
                games: action.payload
            }

        case GET_GAMES_BY_NAME:
            return {
                ...state,
                games: action.payload
            }
        case GET_GAMES_BY_ID:
            return {
                ...state,
                games: action.payload
            }
        //------------  FILTERS  ----------------
        case FILTER_BY_GENRE:
            return {
                ...state,
                games: action.payload
            }

        case FILTER_BY_SOURCE:
            return {
                ...state,
                games: action.payload
            }
        case FILTER_BY_PLATFORM:
            return {
                ...state,
                games: action.payload
            }

        //------------  ORDER  ----------------
        case ORDER_ALPHABETICALLY_ASC:
          
        return {
                ...state,
                games: [...state.games.sort((a,b)=>{
                    console.log(a.name,b.name)
                    if(a.name>b.name){
                      return 1;
                    }
                     if(a.name<b.name){
                      return -1;
                    }
                    return 0})]
            }

        case ORDER_ALPHABETICALLY_DES:
            return {
                ...state,
                games: [...state.games.sort((a,b)=>{
                    console.log(a.name,b.name)
                    if(a.name<b.name){
                      return 1;
                    }
                     if(a.name>b.name){
                      return -1;
                    }
                    return 0})]
            }
        case ORDER_BY_RATING_ASC:
            return {
                ...state,
                games: [...state.games.sort((a,b)=>{
                    console.log(a.rating,b.rating)
                    if(a.rating>b.rating){
                      return 1;
                    }
                     if(a.rating<b.rating){
                      return -1;
                    }
                    return 0})]
            }
        case ORDER_BY_RATING_DES:
            return {
                ...state,
                games: [...state.games.sort((a,b)=>{
                    console.log(a.rating,b.rating)
                    if(a.rating<b.rating){
                      return 1;
                    }
                     if(a.rating>b.rating){
                      return -1;
                    }
                    return 0})]
            }

        //------------  DEFAULT  ----------------
        default: {
            return state
        }

    }


}