import React, { Component } from "react";
import { connect } from "react-redux";

export class Form extends Component {
  state = {
    name: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: [e.target.value] });

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Pokemon</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Pokemon Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            ></input>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
