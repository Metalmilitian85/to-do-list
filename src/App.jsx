import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'

const LOCAL_STORAGE_KEY =  'todoApp.todos'

function App() {

  const [ todos, setTodos ] = useState([])
  const todoNameRef = useRef()

  const num = Math.floor(Math.random() * 1000 + 1)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) 
      setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') 
      return
    setTodos(prevTodos => {
      return [...prevTodos, { id: num, name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-7">Get your Todos on yo!!!</h1>
        <div className="flex flex-col border-4 border-black rounded-md px-8 m-auto mt-8 max-w-[70%] md:max-w-[40%] ">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <input 
            ref={todoNameRef} 
            type="text" 
            placeholder="Type todo here"
            className="mt-3 border border-black"
          />
          <button 
            onClick={handleAddTodo} 
            className="m-auto my-5 border-2 rounded-lg w-24 h-12 font-bold text-black border-blue-600 bg-blue-400 hover:bg-blue-700"
            >Add Todo</button>
          <button 
            onClick={handleClearTodos} 
            className="mb-5 rounded-lg w-52 m-auto bg-red-500 font-bold border-red-600 hover:bg-red-700 border"
            >Clear Completed Todos</button>
          <div className="font-bold text-center">{todos.filter(todo => !todo.complete).length} left to do.</div>
        </div>
    </div>
  )
}

export default App
