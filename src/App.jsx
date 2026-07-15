import { useState } from 'react'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import FilterButtons from './components/FilterButtons'
import Counter from './components/Counter'
import './App.css'
function App() {
  const [toDo, setTodo] = useState(() => {
    const savedToDos = localStorage.getItem("myToDos")
    return savedToDos ? JSON.parse(savedToDos) : [];
  });
  useEffect(() => {
    localStorage.setItem("myToDos" , JSON.stringify(toDo))
  }, [toDo])
  const [filter, setFilter] = useState("All")
  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  };
  const filterKeys = Object.keys(filterMap)
  const filteredTasks = toDo.filter(filterMap[filter])
  const totalCount =  toDo.length
  const activeCount = toDo.filter((task) => !task.completed).length
  const completedCount = toDo.filter((task) => task.completed).length
  const handleToDo = (toDoText) => {
    const task = {
      id: Date.now(),
      text: toDoText,
      completed: false,
    }
    setTodo((prev) => [...prev,task])
    
  };
  const handleEditToDo = (id, newText) => {
    setTodo((prev) =>
      prev.map((item) =>
      item.id === id ? { ...item, text: newText } : item)
    );
  };
  const handleCompleteToDo = (id) => {
    setTodo((prev) => prev.map((item) => item.id === id ? {...item, completed: !item.completed} : item))
  };
  const handleDeleteToDo = (id) => {
    setTodo((prev) => prev.filter((item) => item.id !== id))
  };
  return (
    <>
      <div>
        <h1>My To-Do Application</h1>
        <TodoForm onAddToDO={handleToDo}/>
        {/* <div>
          <h3>Total ToDos: {toDo.length}</h3>
          <br />
        </div> */}
      </div>
      {/* <div>
        <Counter count={toDo.length}></Counter>
      </div> */}
      <Counter total={totalCount} active={activeCount} completed={completedCount}></Counter>
      <div>
        {filterKeys.map((name) => {
          return <FilterButtons key={name} name={name} isPressed={name === filter} setFilter={setFilter}></FilterButtons>
        })}
      </div>
      <div>
        <TodoList toDo={filteredTasks} onEdit={handleEditToDo} onCompletion={handleCompleteToDo} onDeletion={handleDeleteToDo}></TodoList>
      </div>
      
    </>
  )
}
export default App