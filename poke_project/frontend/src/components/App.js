import React, { Component, Fragment } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./pokemons/Dashboard";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Signup from "./accounts/Signup";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { load_user } from "../actions/auth";

const alertOptions = {
    timeout: 3000,
    position: "top center",
};

class App extends Component {
    componentDidMount() {
        store.dispatch(load_user());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/login/" element={<Login />} />
                                    <Route
                                        path="/signup/"
                                        element={<Signup />}
                                    />
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

createRoot(document.getElementById("root")).render(<App />);
