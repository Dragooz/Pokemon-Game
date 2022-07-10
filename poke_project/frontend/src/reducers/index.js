import { combineReducers } from "redux";
import pokemons from "./pokemons";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    pokemons,
    errors,
    messages,
    auth,
});
