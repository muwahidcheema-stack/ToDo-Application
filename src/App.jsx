import { useState } from 'react'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import FilterButtons from './components/FilterButtons'
import Counter from './components/Counter'
import SearchBar from './components/SearchBar'
import './App.css'
function App() {

  // Using USE-STATE to retreive data from local storage after everytime refreshing. 
  const [toDo, setTodo] = useState(() => {
    const savedToDos = localStorage.getItem("myToDos")
    return savedToDos ? JSON.parse(savedToDos) : [];
  });

  // Using USE-EFFECT when everytime To-Do is changed.
  useEffect(() => {
    localStorage.setItem("myToDos" , JSON.stringify(toDo))
  }, [toDo])

  // Filter Buttons All-Completed-Active 
  const [filter, setFilter] = useState("All")
  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  };
  const filterKeys = Object.keys(filterMap)
  const filteredTasks = toDo.filter(filterMap[filter])

  // Search Tasks Logic
  const [searchTerm, setSearchTerm] = useState("")
  const searchedTasks = toDo.filter((task) => {
    const matchedResults = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedFilter = filterMap[filter](task)
    return matchedResults && matchedFilter;
  })

  // Counter of All Tasks Dynamically Updated
  const totalCount =  toDo.length
  const activeCount = toDo.filter((task) => !task.completed).length
  const completedCount = toDo.filter((task) => task.completed).length

  // All Important Functions like adding tasks, deleting tasks, completing tasks and clearing Completed Tasks 
  const handleToDo = (toDoText) => {
    const task = {
      id: Date.now(),
      text: toDoText,
      time: Date.toString(),
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
    setTodo((prev) => 
      prev.map((item) => 
      item.id === id ? {...item, completed: !item.completed} : item))
  };
  const handleDeleteToDo = (id) => {
    setTodo((prev) => 
      prev.filter((item) => 
      item.id !== id))
  };
  const handleClearCompletedToDo = () => {
    setTodo((prev) => 
      prev.filter((item) => 
      !item.completed))
  }
  return (
    <>
      <div className='min-h-screen bg-[#e0d4bb] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start'>
        <div className='max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-4 xs:p-6 md:p-8 space-y-6'>
          {/* Main Heading */}
          <h1 className='text-5xl text-center font-extrabold text-slate-900 tracking-tight'>My Tasks</h1>

          {/* Input Form */}
          <TodoForm onAddToDO={handleToDo}/>

          {/* Search bar */}
            <SearchBar searchText={searchTerm} setSearchText={setSearchTerm}></SearchBar>
        
          {/* Filter Buttons ALL-Complete-Active */}
          <div className='flex gap-1 text-slate-700 p-1 rounded-lg'>
            {filterKeys.map((name) => {
              return <FilterButtons key={name} name={name} isPressed={name === filter} setFilter={setFilter}></FilterButtons>
            })}
          </div>

          {/* Counter of All Tasks */}
          <Counter total={totalCount} active={activeCount} completed={completedCount} OnHandleClearCompleted={handleClearCompletedToDo}></Counter>

          {/* List of Tasks handling Edit & Deletion */}
          <TodoList toDo={searchedTasks} onEdit={handleEditToDo} onCompletion={handleCompleteToDo} onDeletion={handleDeleteToDo}></TodoList>
        </div>
      </div>
    </>
  )
}
export default App