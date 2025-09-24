import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const addTodos = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please fill the box!");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input,
      completed:false
    }
    if (editId) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      )
      setEditId("");
    } else {
      setTodos([...todos, newTodo])
    }
    setInput("");
  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const editTodo = (todo) => {
    setEditId(todo.id);
    setInput(todo.text);
    console.log(todo.id)
  }

  const toggleCompleted = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo,completed:!todo.completed} : todo
      )
    )
  }

  return (
    <>
      <div className="container">
        <form onSubmit={addTodos}>
          <input type="text"
            placeholder='Enter todo'
            value={input}
            onChange={(e) => setInput(e.target.value)} />

          <button type='submit'>{editId ? "Update" : "Add"}</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="todo-list">
          <ul>
            {todos.length === 0 ? (
              <p>No todos</p>
            ) : (
              todos.map(todo => (
                <li key={todo.id}>
                  <h1 style={{ textDecoration: todo.completed ? "line-through" : "" }} onClick={()=>toggleCompleted(todo.id)} >{todo.text}</h1>
                  <button onClick={() => editTodo(todo)}>Edit</button>
                  <button onClick={() => removeTodo(todo.id)}>Delete</button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TodoList
