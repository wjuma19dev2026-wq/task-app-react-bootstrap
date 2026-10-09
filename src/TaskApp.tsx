import { useEffect, useReducer, useState, type ChangeEvent } from 'react'
import './TaskApp.css'
import { getTaskInitialState, taskReducer } from './reducers/taskReducer'

export const TaskApp = () => {
  const [inputValue, setInputValue] = useState('')

  const [state, dispatch] = useReducer(taskReducer, getTaskInitialState())

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue === '') return
    dispatch({ type: 'ADD_TODO', payload: inputValue })
  }

  const handleToggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleAddTodo()
    }
  }

  useEffect(() => {
    localStorage.setItem('task-state', JSON.stringify(state, null, 2))
  }, [state])

  const todos = state.todos
  const completedTodos: number = todos.filter(t => t.completed).length
  const todosLength: number = todos.length
  const progressPercentage: number =
    todosLength === 0 ? 0 : (completedTodos / todosLength) * 100

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex flex-column align-items-center">
          <h1 className="m-0 fs-1 text-light fw-bold">Lista de tareas</h1>
          <p className="text-light">
            Manten tus tareas organizadas y consigue hacerla
          </p>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="d-flex">
                <input
                  placeholder="Añade una nueva tarea"
                  type="text"
                  className="form-control"
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
                <div onClick={handleAddTodo} className="btn btn-primary ml-2">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Progreso</h3>
              <div className="d-flex justify-content-between mt-3">
                <p className="m-0">
                  {completedTodos} de {todosLength} completadas
                </p>
                <p className="m-0 fw-bold">{progressPercentage.toFixed()}%</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="card" id="tarea-card">
            <div className="card-header">
              <h3 className="card-title">Tarea</h3>
            </div>
            <div className="card-body">
              {/* Todos */}
              {todos.length > 0 && (
                <section id="todos">
                  {todos.map(todo => (
                    <div key={todo.id} className="card mt-2">
                      <div className="card-body bg-light">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={todo.completed}
                            value="option1"
                            onChange={() => handleToggleTodo(todo.id)}
                          />
                          <label
                            className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-success' : ''}`}
                          >
                            {todo.title}
                          </label>
                          <i
                            onClick={() => handleDelete(todo.id)}
                            className="bi bi-trash float-end"
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* No hay tarea */}
              {todos.length === 0 && (
                <div id="no-hay-tarea">
                  <div className="icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h5 className="m-0">No hay tarea</h5>
                  <p className="m-0">Agrega una tarea arriba para empezar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
