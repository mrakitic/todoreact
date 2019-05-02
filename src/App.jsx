import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Details, ToDo } from "./views";

export class App extends Component {
  state = {
    todos: undefined
  };

  updateTodos = todos => this.setState({ todos });

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(json =>
        this.setState({
          todos: json
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <ToDo {...props} {...this.state} updateTodos={this.updateTodos} />
            )}
          />
          <Route
            path="/details/:id"
            render={props => <Details {...props} {...this.state} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
