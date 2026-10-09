import { z } from 'zod'

const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
})

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  pending: z.number(),
  completed: z.number(),
  length: z.number(),
})

export interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TaskState {
  todos: Todo[]
  pending: number
  completed: number
  length: number
}

export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }

export const getTaskInitialState = (): TaskState => {
  const taskLocalStorageState = localStorage.getItem('task-state')

  if (!taskLocalStorageState) {
    return {
      todos: [],
      length: 0,
      pending: 0,
      completed: 0,
    }
  }

  /**
   * Validation Local Storage Incoming Data
   * ! Zod es una librería de validación y tipado para TypeScript y JavaScript. Se usa mucho en proyectos con React, Vite, Next.js, Express, etc., para validar datos de formularios, respuestas de APIs y variables de entorno.
   */
  const result = TaskStateSchema.safeParse(JSON.parse(taskLocalStorageState))

  if (result.error) {
    return {
      todos: [],
      length: 0,
      pending: 0,
      completed: 0,
    }
  }
  return JSON.parse(taskLocalStorageState)
}

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      }
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.todos.filter(todo => !todo.completed).length + 1,
      }
    }
    case 'TOGGLE_TODO': {
      const updatedTodos: Todo[] = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
      return {
        ...state,
        todos: updatedTodos,
        pending: updatedTodos.filter(t => !t.completed).length,
        completed: updatedTodos.filter(t => t.completed).length,
      }
    }
    case 'DELETE_TODO': {
      const updatedTodos = state.todos.filter(
        todo => todo.id !== action.payload
      )
      return {
        ...state,
        todos: updatedTodos,
        length: updatedTodos.length,
        pending: updatedTodos.filter(t => !t.completed).length,
        completed: updatedTodos.filter(t => t.completed).length,
      }
    }
    default: {
      return state
    }
  }
}
