import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.name) {
                alert.error(`Name: ${error.msg.name.join()}`);
            }
            if (error.msg.email) {
                alert.error(`Email: ${error.msg.email.join()}`);
            }
        }

        if (message !== prevProps.message) {
            if (message.pokemonAdded) {
                alert.success(message.pokemonAdded);
            }
            if (message.pokemonReleased) {
                alert.success(message.pokemonReleased);
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
