import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

export class ToDo extends Component {
  state = {
    text: "",
    titleError: "Title nesmije biti prazan",
    maxLength: 75
  };

  deleteCompleted = () => {
    let newTodos = this.props.todos.filter(todos => {
      return !todos.completed;
    });

    this.props.updateTodos(newTodos);
  };

  modifyByCompleted = () => {
    const { todos } = this.props;
    const orderByCompl = todos.sort(function(a, b) {
      return b.completed - a.completed;
    });

    this.props.updateTodos(orderByCompl);
  };

  toggleFinished = event => {
    const { todos } = this.props;
    const { clickedId } = event.currentTarget.dataset;

    const clickedIndex = todos.findIndex(
      item => item.id === parseInt(clickedId)
    );

    todos[clickedIndex].completed = !todos[clickedIndex].completed;

    this.setState({
      todos: todos
    });
  };

  handleSubmit = () => {
    const { todos } = this.props;
    const { titleError } = this.state;
    if (!this.state.text) {
      this.setState({
        titleError: titleError
      });
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 1000) + 200,
        completed: false,
        title: this.state.text
      };
      this.props.updateTodos([...this.props.todos, newTodo]);
      console.log(todos);
    }
  };

  handleChange = event => {
    let text = event.target.value;
    this.setState({
      text: text
    });
  };

  deleteAll = () => {
    this.props.updateTodos([]);
  };

  render() {
    const { todos } = this.props;
    const { titleError } = this.state;
    const { maxLength } = this.state;
    return (      
        <main className="main wrapper">
          <header className="header">
            <h1>My To-Do List</h1>
            <button className="btn" onClick={this.deleteAll}>
              Clear all
            </button>
          </header>
          <div className="new">
            <input
              onChange={this.handleChange}
              value={this.state.text}
              className="input"
              type="text"
              placeholder="Title"
              maxLength={maxLength}
            />
            <button onClick={this.handleSubmit} className="add btn">
              Add
            </button>
            {this.state.text ? (
              <div>
                ({maxLength - this.state.text.length}/{maxLength})
              </div>
            ) : null}
          </div>
          {this.state.text === "" ? (
            <div style={{ color: "red" }}>
              <b>{titleError}</b>
            </div>
          ) : (
            ""
          )}
          <nav>
            <ul className="filter-list">
              <li>
                <button>Upcoming</button>
              </li>
              <li>
                <button>All</button>
              </li>
              <li>
                <button>Past</button>
              </li>
              <li>
                <button>Completed</button>
              </li>
              <li>
                <button>Pending</button>
              </li>
              <li>
                <button onClick={this.deleteCompleted}>Delete Completed</button>
              </li>
              <li>
                <button onClick={this.modifyByCompleted}>
                  Order by completed
                </button>
              </li>
            </ul>
          </nav>
          <div className="list">
            {todos
              ? todos.map(item => (
                  <div
                    onClick={this.toggleFinished}
                    data-clicked-id={item.id}
                    key={item.id}
                    className={`${
                      item.completed ? "item item-finished" : "item"
                    } `}
                  >
                    <Link to={`/details/${item.id}`}>
                      <h2 className="item-title">{item.title}</h2>
                    </Link>
                    <p className="item-date">{item.id}</p>
                  </div>
                ))
              : "No todos right now, check back later."}
          </div>
        </main>
      
    );
  }
}
