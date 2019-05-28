import React from "react";
import { FirebaseDatabase } from "../firebase/FirebaseService";

export class FirebaseTodos extends React.Component {
  state = {
    todos: undefined,
    newTodo: undefined,
    editId: undefined,
    editValue: undefined
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    FirebaseDatabase.collection("todos")
      .get()
      .then(snapshot =>
        snapshot.docs.map(document => ({
          id: document.id,
          ...document.data()
        }))
      )
      .then(response =>
        this.setState({
          todos: response
        })
      );
  };

  addNewItem = () => {
    const newTodo = {
      content: this.state.newTodo,
      read: false
    };

    FirebaseDatabase.collection("todos")
      .add(newTodo)
      .then(response => {
        // const doc = await response.get();
        // console.log(doc.data());

        this.getTodos();
      });
  };

  handleNewTodoInput = event => {
    this.setState({
      newTodo: event.target.value
    });
  };

  setEdit = event => {
    const item = this.state.todos.find(
      item => item.id === event.target.dataset.todoId
    );
    this.setState({ editedItem: { ...item } });
  };
  editInput = event => {
    const { editedItem } = this.state;
    editedItem.content = event.target.value;
    this.setState({ editedItem });
  };

  editButton = event => {
    const { editedItem } = this.state;
    FirebaseDatabase.collection("todos")
      .doc(editedItem.id)
      .update({ content: editedItem.content });
    this.setState({ editedItem: undefined });
    this.getTodos();
  };

  deleteTodo = event => {
    const todoId = event.target.dataset.todoId;

    FirebaseDatabase.collection("todos")
      .doc(todoId)
      .delete()
      .then(() => this.getTodos());
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="wrapper">
        {!todos && <p>niš nemamo</p>}

        <input onChange={this.updateNewItem} value={this.state.newItem} />
        <button onClick={this.addNewItem}>add new</button>

        {todos &&
          todos.map(item => (
            <div key={item.id}>
              {this.state.editedItem && item.id === this.state.editedItem.id ? (
                <>
                  <input
                    onChange={this.editInput}
                    value={this.state.editedItem.content}
                  />{" "}
                  <button onClick={this.editButton} data-todo-id={item.id}>
                    set
                  </button>
                </>
              ) : (
                <h2>{item.content}</h2>
              )}
              <button data-todo-id={item.id} onClick={this.deleteTodo}>
                Delete
              </button>
              <button data-todo-id={item.id} onClick={this.setEdit}>
                Edit
              </button>
            </div>
          ))}
      </div>
    );
  }
}
