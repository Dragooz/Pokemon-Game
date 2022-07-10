import {
    GET_POKEMONS,
    GET_UNOWNED_POKEMONS,
    RELEASE_POKEMON,
    ADD_POKEMON,
} from "../actions/types.js";

const initialState = {
    pokemons: [],
    unowned_pokemons: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            };

        case RELEASE_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                unowned_pokemons: state.unowned_pokemons.filter(
                    (pokemon) => pokemon.id !== action.payload
                ),
            };

        case ADD_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                unowned_pokemons: state.unowned_pokemons.filter(
                    (pokemon) => pokemon.id !== action.payload
                ),
            };

        case GET_UNOWNED_POKEMONS:
            return {
                ...state,
                unowned_pokemons: action.payload,
                pokemons: state.pokemons.filter(
                    (pokemon) => pokemon.id !== action.payload
                ),
            };

        default:
            return state;
    }
}
