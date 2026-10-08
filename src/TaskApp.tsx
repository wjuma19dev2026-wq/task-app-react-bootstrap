import { useState, type ChangeEvent, type ChangeEventHandler } from 'react'
import './TaskApp.css'

interface Todo {
  id: string
  title: string
  completed: boolean
}

export const TaskApp = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: inputValue,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }

      return todo
    })
    setTodos(updatedTodos)
  }

  const completedTodos: number = todos.filter(t => t.completed === true).length
  const todosLength: number = todos.length

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex flex-column align-items-center">
          <h1 className="m-0">Lista de tareas</h1>
          <p>Manten tus tareas organizadas y consigue hacerla</p>
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
                />
                <div onClick={handleAddTodo} className="btn btn-dark ml-2">
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
                <p className="m-0 fw-bold">
                  {Number((completedTodos / todosLength) * 100).toFixed()}%
                </p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: (completedTodos / todosLength) * 100 + '%' }}
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
                      <div className="card-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id=""
                            value="option1"
                            onChange={() => handleToggleTodo(todo.id)}
                          />
                          <label
                            className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-danger' : ''}`}
                          >
                            {todo.title}
                          </label>
                          <i className="bi bi-trash float-end"></i>
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
