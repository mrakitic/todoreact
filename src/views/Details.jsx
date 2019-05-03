import React, { Component } from "react";

export class Details extends Component {
  state = {
    todo: undefined
  };

  componentWillUpdate(nextProps) {
    const { match, todos } = this.props;

    if (todos !== nextProps.todos) {
      if (match.params && match.params.id) {
        const todo = nextProps.todos.find(todo => todo.id == match.params.id);
        this.setState({
          todo
        });
      }
    }
  }

  render() {
    const { todo } = this.state;
    if (!todo) {
      return <div className="loader" />;
    }

    return (
      <>
        <div>Title of your task: {todo.title}</div>
        <div>Id of your task: {todo.id}</div>
        <div>
          Is task completed: {todo.completed ? "completed" : "not-completed"}
        </div>
      </>
    );
  }
}
