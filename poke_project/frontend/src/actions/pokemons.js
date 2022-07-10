import axios from "axios";
import { createMessage, returnErrors } from "./messages";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import {
    GET_POKEMONS,
    RELEASE_POKEMON,
    GET_UNOWNED_POKEMONS,
    ADD_POKEMON,
    GET_ERRORS,
} from "./types";

const REACT_APP_API_URL = "http://127.0.0.1:8000";

// GET POKEMONS
export const getPokemons = (user_id) => (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        axios
            .get(`${REACT_APP_API_URL}/pokemon/mypokemon/${user_id}/`, config)
            .then((res) => {
                dispatch({
                    type: GET_POKEMONS,
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err));
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

export const getUnownedPokemons = (user_id) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            Accept: "application/json",
        },
    };

    axios
        .get(`/pokemon/unownedpokemon/${user_id}/`, config)
        .then((res) => {
            dispatch({
                type: GET_UNOWNED_POKEMONS,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addPokemon =
    (
        user_id,
        pokemon_id,
        pokemon_name,
        pokemon_hp,
        pokemon_attack,
        pokemon_defense
    ) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        axios
            .put(
                `/pokemon/addpokemon/${user_id}/`,
                {
                    pokemon: [
                        {
                            id: `${pokemon_id}`,
                            name: `${pokemon_name}`,
                            hp: `${pokemon_hp}`,
                            attack: `${pokemon_attack}`,
                            defense: `${pokemon_defense}`,
                        },
                    ],
                },
                config
            )
            .then((res) => {
                dispatch(createMessage({ pokemonAdded: "Pokemon Added" }));
                dispatch({
                    type: ADD_POKEMON,
                    payload: res.data.pokemon,
                });
            })
            .catch((err) => {
                const errors = {
                    msg: err.response.data,
                    status: err.response.status,
                };
                dispatch({
                    type: GET_ERRORS,
                    payload: errors,
                });
            });
    };

export const releasePokemon =
    (
        user_id,
        pokemon_id,
        pokemon_name,
        pokemon_hp,
        pokemon_attack,
        pokemon_defense
    ) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        axios
            .put(
                `/pokemon/releasepokemon/${user_id}/`,
                {
                    pokemon: [
                        {
                            id: `${pokemon_id}`,
                            name: `${pokemon_name}`,
                            hp: `${pokemon_hp}`,
                            attack: `${pokemon_attack}`,
                            defense: `${pokemon_defense}`,
                        },
                    ],
                },
                config
            )
            .then((res) => {
                dispatch(
                    createMessage({ pokemonReleased: "Pokemon Released" })
                );
                dispatch({
                    type: RELEASE_POKEMON,
                    payload: res.data.pokemon,
                });
            })
            .catch((err) => {
                const errors = {
                    msg: err.response.data,
                    status: err.response.status,
                };
                dispatch({
                    type: GET_ERRORS,
                    payload: errors,
                });
            });
    };
