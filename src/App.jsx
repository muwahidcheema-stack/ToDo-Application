import { useState } from 'react'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import FilterButtons from './components/FilterButtons'
import Counter from './components/Counter'
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import { supabase } from './Auth/client'
import {signOutUser} from './Auth/auth'
import './App.css'
function App() {

  // Using USE-STATE to retreive data from local storage after everytime refreshing. 
  // const [toDo, setTodo] = useState(() => {
  //   // const savedToDos = localStorage.getItem("myToDos")
  //   // return savedToDos ? JSON.parse(savedToDos) : [];
  // });

  // Using USE-EFFECT when everytime To-Do is changed.
  // useEffect(() => {
  //   localStorage.setItem("myToDos" , JSON.stringify(toDo))
  // }, [toDo])

  const [toDo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession()
    .then(({data : {session}}) => {
      setSession(session);
    })

    const {data : {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe();
  },[])

  useEffect(() => {
    if(session?.user){
      fetchTodos()
    }
  },[session])



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
  
  const fetchTodos = async () => {
    setLoading(true)
    const {error, data} = await supabase
    .from('todos')
    .select('*')
    .order('created_at', {ascending :  false})
    if (!error) {
      setTodo(data);
      setLoading(false);
    }
  }

  const handleToDo = async (toDoText) => {
    if (!session?.user) {
      console.log("No active user session found.")
      return
    }
    const {error, data } = await supabase
    .from('todos')
    .insert([{text : toDoText, user_id : session.user.id}])
    .select()

    if(!error && data){
      setTodo((prev) => [data[0], ...prev])
    }
  };

  const handleEditToDo = async (id, newText) => {
    const {error} = await supabase
    .from('todos')
    .update({text: newText})
    .eq('id', id)

    if(!error){
      setTodo((prev) =>
        prev.map((item) =>
        item.id === id ? { ...item, text: newText } : item)
      );
    }
  };

  const handleCompleteToDo = async (id) => {
    const targetTask = toDo.find((t) => t.id === id)
    if(!targetTask) return

    const {error} = await supabase
    .from('todos')
    .update({completed : !targetTask.completed})
    .eq('id', id)

    if (!error) {
      setTodo((prev) => 
        prev.map((item) => 
        item.id === id ? {...item, completed: !item.completed} : item))
    }
  };

  const handleDeleteToDo = async (id) => {
    const {error} = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

    if (!error) {
      setTodo((prev) => 
        prev.filter((item) => 
        item.id !== id))
    }
  };

  const handleClearCompletedToDo = async () => {
    const {error} = await supabase
    .from('todos')
    .delete()
    .eq('completed', true)

    if (!error) {
      setTodo((prev) => 
        prev.filter((item) => 
        !item.completed))
    }
  }

  if (!session) {
    return (
      <Login/>
    )
  }

  return (
    <>
      <div className='min-h-screen bg-[#e0d4bb] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start'>
        <div className='max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-4 xs:p-6 md:p-8 space-y-6'>
          {/* Main Heading */}
          <div className='flex items-center justify-between border-b-slate-100 pb-3'>
            <h1 className='text-5xl text-center font-extrabold text-slate-900 tracking-tight'>My Tasks</h1>
            <button
            onClick={signOutUser}
            className='text-xs font-semibold text-slate-500 hover:text-red-500 bg-slate-100 transition-colors cursor-pointer rounded-md px-2.5 py-1'
            >
              Sign Out
            </button>
          </div>

          {/* Input Form */}
          <TodoForm onAddToDO={handleToDo}/>

          {/* Search bar */}
            <SearchBar searchText={searchTerm} setSearchText={setSearchTerm}></SearchBar>
        
          {/* Filter Buttons ALL-Complete-Active */}
          <div className='flex gap-1 text-slate-700 p-1 rounded-lg'>
            {filterKeys.map((name) => {
              return <FilterButtons 
              key={name} 
              name={name} 
              isPressed={name === filter} 
              setFilter={setFilter}
              ></FilterButtons>
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