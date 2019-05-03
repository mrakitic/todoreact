import React, { Component } from "react";

export class Details extends Component {
  state = {
    todo: undefined
  };

  componentDidMount() {
    const { todos } = this.props;

    if (todos) {
      this.setTodoItem(todos);
    }
  }

  componentWillUpdate(nextProps) {
    const { todos } = this.props;

    if (!todos && nextProps.todos) {
      this.setTodoItem(nextProps.todos);
    }
  }

  setTodoItem = todos => {
    const { match } = this.props;

    if (match.params && match.params.id) {
      const todo = todos.find(todo => todo.id == match.params.id);
      this.setState({
        todo
      });
    }
  };

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
