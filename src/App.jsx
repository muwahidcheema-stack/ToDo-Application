import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import './App.css'
function App() {
  const [toDo, setTodo] = useState([])
  const handleToDo = (toDoText) => {
    const task = {
      id: Date.now(),
      text: toDoText,
      completed: false,
    }
    setTodo((prev) => [...prev,task])
  }
  const handleEditToDo = (id, newText) => {
    setTodo((prev) =>
      prev.map((item) =>
      item.id === id ? { ...item, text: newText } : item)
    );
  };
  return (
    <>
      <div>
        <h1>My To-Do Application</h1>
        <TodoForm onAddToDO={handleToDo}/>
        <div>
          <h3>Total ToDos: {toDo.length}</h3>
          <br />
          {/* <ul>
            {toDo.map((toDo) => ( <li key={toDo.id}> {toDo.text} </li>))}
          </ul> */}
        </div>
      </div>
      <TodoList toDo={toDo} onEdit={handleEditToDo}></TodoList>
      {/* <TodoItem toDo={toDo} ></TodoItem> */}
    </>
  )
}

export default App
