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
  return {
    todos: [],
    length: 0,
    pending: 0,
    completed: 0,
  }
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
        pending: state.todos.map(todo => !todo.completed).length + 1,
      }
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
      }
    }
    // case 'DELETE_TODO': {

    // }
    default: {
      return state
    }
  }
}
