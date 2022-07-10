import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    getPokemons,
    releasePokemon,
    getUnownedPokemons,
    addPokemon,
} from "../../actions/pokemons";

import { load_user } from "../../actions/auth";

function refreshPokemon(props) {
    props.getPokemons(props.user.id); //put user id here
    props.getUnownedPokemons(props.user.id);
    props.getPokemons(props.user.id); //put user id here
    props.getUnownedPokemons(props.user.id);
}

export class Pokemons extends Component {
    static propTypes = {
        pokemons: PropTypes.array.isRequired,
        getPokemons: PropTypes.func.isRequired,
        releasePokemon: PropTypes.func.isRequired,
        getUnownedPokemons: PropTypes.func.isRequired,
        unowned_pokemons: PropTypes.array.isRequired,
        addPokemon: PropTypes.func.isRequired,
        load_user: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.load_user();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.getPokemons(this.props.user.id); //put user id here
            this.props.getUnownedPokemons(this.props.user.id);
        }
    }

    render() {
        if (this.props.user == null) {
            return (
                <Fragment>
                    <h1> PLEASE LOG IN FIRST </h1>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div>
                        <button
                            onClick={() => {
                                this.props.getPokemons(this.props.user.id); //put user id here
                                this.props.getUnownedPokemons(
                                    this.props.user.id
                                );
                            }}
                            className="btn btn-danger btn-lg mt-3"
                        >
                            Reveal my pokemons!
                        </button>
                    </div>

                    <h2>Owned Pokemons</h2>
                    <table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Name </th>
                                <th> HP </th>
                                <th> Attack </th>
                                <th> Defense </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pokemons.map((pokemon) => (
                                <tr key={pokemon.id}>
                                    <td>{pokemon.id}</td>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.hp}</td>
                                    <td>{pokemon.attack}</td>
                                    <td>{pokemon.defense}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                {
                                                    this.props.releasePokemon(
                                                        this.props.user.id,
                                                        pokemon.id,
                                                        pokemon.name,
                                                        pokemon.hp,
                                                        pokemon.attack,
                                                        pokemon.defense
                                                    );
                                                }
                                                refreshPokemon(this.props);
                                            }}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Release
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>Unowned Pokemons</h2>
                    <table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Name </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.unowned_pokemons.map((pokemon) => (
                                <tr key={pokemon.id}>
                                    <td>{pokemon.id}</td>
                                    <td>{pokemon.name}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                {
                                                    this.props.addPokemon(
                                                        this.props.user.id,
                                                        pokemon.id,
                                                        pokemon.name,
                                                        pokemon.hp,
                                                        pokemon.attack,
                                                        pokemon.defense
                                                    );
                                                }
                                                refreshPokemon(this.props);
                                            }}
                                            className="btn btn-success btn-sm"
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    pokemons: state.pokemons.pokemons,
    unowned_pokemons: state.pokemons.unowned_pokemons,
    user: state.auth.user,
});

export default connect(mapStateToProps, {
    getPokemons,
    releasePokemon,
    getUnownedPokemons,
    addPokemon,
    load_user,
})(Pokemons);
