import {
    LOADING, ERROR, PAGE, PLATFORMS, GENRE,
    GET_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID,
    RESET_FILTER, FILTER_BY_GENRE, FILTER_BY_SOURCE, FILTER_BY_PLATFORM,
    ORDER_ALPHABETICALLY_ASC, ORDER_ALPHABETICALLY_DES, ORDER_BY_RATING_ASC, ORDER_BY_RATING_DES
} from './constants'

const initialState = {
    games: [],
    gamesBackUp:[],
    game: {},
    currentPage: 1,
    loading: false,
    error: false,
    platforms: [],
    genres: [],
    platformFilter: null,
    genreFilter: null,
    sourceFilter: null,
    orderAlph: null,
    orderRating: null
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
                currentPage: action.payload
            }
        case PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case GENRE:
            return {
                ...state,
                genres: action.payload
            }

        //------------  GET  ----------------
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                gamesBackUp: action.payload
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
        case RESET_FILTER:
            return {
                ...state,
                genreFilter: null,
                sourceFilter: null,
                platformFilter: null
            }


        case FILTER_BY_GENRE:
            return {
                ...state,
                genreFilter: action.payload
            }

        case FILTER_BY_SOURCE:
            return {
                ...state,
                sourceFilter: action.payload
            }
        case FILTER_BY_PLATFORM:
            return {
                ...state,
                platformFilter: action.payload
            }

        //------------  ORDER  ----------------
        case ORDER_ALPHABETICALLY_ASC:

            return {
                ...state,
                orderAlph: "ACS",
                orderRating: null,
            }

        case ORDER_ALPHABETICALLY_DES:
            return {
                ...state,
                orderAlph: "DES",
                orderRating: null
            }
        case ORDER_BY_RATING_ASC:
            return {
                ...state,
                orderRating: "ACS",
                orderAlph: null
            }
        case ORDER_BY_RATING_DES:
            return {
                ...state,
                orderRating: "DES",
                orderAlph: null
            }

        //------------  DEFAULT  ----------------
        default: {
            return state
        }

    }


}