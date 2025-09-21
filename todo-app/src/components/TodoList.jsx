import React,{useState} from 'react';

const TodoList = () => {
const [input, setInput] = useState("");
const [todos, setTodos] = useState([]);
const [error, setError] = useState(null);

const addTodos = (e) => {
 e.preventDefault();
 if(!input.trim()){
    setError("Please fill the box!");
    return;
 }
 const newTodo  = {
    id:Date.now(),
    text:input
 }
 setTodos([...todos,newTodo]);
 setInput("");
}

const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
}

  return (
    <> 
       <div className="container">
          <form onSubmit={addTodos}>
            <input type="text" 
            placeholder='Enter todo'
            value={input}
            onChange={(e)=>setInput(e.target.value)}/>

            <button type='submit'>Add</button>
          </form>
              <div className="todo-list">
                 <ul>
                    {todos > 0 ? (
                        <p>No todos</p>
                    ) : (
                        todos.map(todo => (
                            <li key={todo.id}>
                                <h1>{todo.text}</h1>
                                <button onClick={()=>removeTodo(todo.id)}>Delete</button>
                            </li>
                        ))
                    ) }
                 </ul>
              </div>
       </div>
    </>
  )
}

export default TodoList
