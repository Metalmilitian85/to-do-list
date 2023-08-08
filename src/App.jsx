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
      <h1 className="text-3xl font-bold text-center">Get your Todos on yo!!!</h1>
        <div className="flex flex-col border-4 border-black rounded-md px-8 m-auto mt-8 max-w-[70%] md:max-w-[40%] ">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <input 
            ref={todoNameRef} 
            type="text" 
            className="border border-black"
          />
          <button 
            onClick={handleAddTodo} 
            className="border"
            >Add Todo</button>
          <button 
            onClick={handleClearTodos} 
            className="border"
            >Clear Completed Todos</button>
          <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </div>
    </div>
  )
}

export default App
